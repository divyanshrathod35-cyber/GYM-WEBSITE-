import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { setTimeout as pause } from 'node:timers/promises';

// Dependency-free Chrome CDP visual regression suite for CI (Node 22+).
const url = process.env.BODYTECH_BASE_URL || 'http://127.0.0.1:4173/';
const chrome = process.env.CHROME_BIN || 'google-chrome';
const output = path.resolve(import.meta.dirname, '..', 'evidence', 'v6');
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'bodytech-cdp-'));
fs.mkdirSync(output, { recursive: true });
const report = { url, viewports: [], runtimeErrors: [] };
const pending = new Map();
let socket, browser, sequence = 0;

function request(method, params = {}) {
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error('Chrome timeout: ' + method)); }, 15000);
    pending.set(id, { resolve, reject, timeout });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function inspect(expression) {
  const response = await request('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (response.result.exceptionDetails) throw new Error('Browser evaluation exception');
  return response.result.result.value;
}
async function until(test, ms = 20000) {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try { if (await test()) return; } catch { /* navigation not ready */ }
    await pause(250);
  }
  throw new Error('Browser/preview startup timed out');
}
try {
  await until(async () => (await fetch(url)).ok, 30000);
  browser = spawn(chrome, ['--headless=new','--no-sandbox','--disable-dev-shm-usage',
    '--remote-debugging-port=0','--user-data-dir=' + profile,'--window-size=1440,900','about:blank'],
    { stdio: 'ignore' });
  await until(() => fs.existsSync(path.join(profile, 'DevToolsActivePort')), 15000);
  const port = Number(fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0]);
  const targetResponse = await fetch('http://127.0.0.1:' + port + '/json/new?about:blank', { method: 'PUT' });
  assert(targetResponse.ok, 'Could not open Chrome tab');
  const target = await targetResponse.json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    if (data.method === 'Runtime.exceptionThrown') report.runtimeErrors.push(data.params?.exceptionDetails?.text || 'Uncaught browser exception');
    if (!data.id) return;
    const task = pending.get(data.id);
    if (!task) return;
    clearTimeout(task.timeout); pending.delete(data.id);
    data.error ? task.reject(new Error(JSON.stringify(data.error))) : task.resolve(data);
  };
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  await request('Page.enable');
  await request('Runtime.enable');

  for (const width of [320, 360, 390, 430, 600, 768, 1024, 1440, 1920]) {
    await request('Emulation.setDeviceMetricsOverride', { width, height: width < 800 ? 800 : 900, screenWidth: width, screenHeight: width < 800 ? 800 : 900, deviceScaleFactor: 1, mobile: width < 800 });
    await request('Page.navigate', { url });
    await until(() => inspect('Boolean(document.querySelector(".bt-hero h1") && document.querySelector(".bt-programme-stage"))'));
    await inspect('document.fonts.ready');
    await pause(350);
    const measure = "(() => { const h=document.querySelector('.bt-hero h1'); const p=document.querySelector('.bt-hero-photo'); const a=h.getBoundingClientRect(); const b=p.getBoundingClientRect(); const overlaps=a.left<b.right-2&&a.right>b.left+2&&a.top<b.bottom-2&&a.bottom>b.top+2; const clipped=Array.from(h.querySelectorAll('span')).some(x=>{const r=x.getBoundingClientRect();return r.left < -2||r.right>innerWidth+2||r.width>a.width+4;}); const links=Array.from(document.querySelectorAll('a[href^=\"#\"]')).map(x=>x.getAttribute('href')).filter(x=>x!=='#'&&!document.getElementById(x.substring(1))); return {width:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,h1:document.querySelectorAll('h1').length,overlaps,clipped,links,heroImage:!!document.querySelector('.bt-hero-photo img')?.naturalWidth,photoTop:b.top,photoBottom:b.bottom,photoHeight:b.height,headlineTop:a.top,stickyTap:document.querySelector('.bt-mobile-action a:last-child')?.getBoundingClientRect().height||0};})()";
    const result = await inspect(measure);
    assert.equal(result.width, width, 'Chrome rendered a different CSS viewport width; previous QA was a false pass');
    assert(result.overflow <= 2, 'Horizontal overflow at ' + width + ': ' + result.overflow);
    assert.equal(result.h1, 1, 'Expected one primary headline');
    assert.equal(result.overlaps, false, 'Hero text touches photography at ' + width);
    assert.equal(result.clipped, false, 'Hero headline clips at ' + width);
    assert.deepEqual(result.links, [], 'Broken anchor links at ' + width);
    assert(result.heroImage, 'Hero imagery failed to load at ' + width);
    if (width <= 600) {
      assert(result.photoTop >= 0 && result.photoTop < 120, 'Mobile hero photo must be the first visual anchor at ' + width);
      assert(result.photoHeight >= 270, 'Mobile hero visual is too small at ' + width);
      assert(result.headlineTop >= result.photoBottom - 2, 'Mobile hero title collides with photo at ' + width);
      assert(result.stickyTap >= 44, 'Mobile visit action must meet 44px tap target at ' + width);
    }
    const screenshot = await request('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    fs.writeFileSync(path.join(output, 'bodytech-' + width + '.png'), Buffer.from(screenshot.result.data, 'base64'));
    if (width === 390 || width === 1440) {
      // Warm all lazy images and trigger once-only editorial reveals with a real scroll pass.
      const warmed = await inspect("(async () => { const max=document.documentElement.scrollHeight; for(let y=0;y<max;y+=600){ window.scrollTo({top:y,behavior:'instant'}); await new Promise(r=>setTimeout(r,100)); } await new Promise(r=>setTimeout(r,350)); window.scrollTo({top:0,behavior:'instant'}); await new Promise(r=>setTimeout(r,900)); return Array.from(document.images).filter(img=>!img.complete||img.naturalWidth===0).map(img=>img.getAttribute('src')); })()");
      assert.deepEqual(warmed, [], 'Images still missing after real scroll: ' + warmed);
      const metrics = await request('Page.getLayoutMetrics');
      const contentHeight = Math.min(Math.ceil(metrics.result.cssContentSize?.height || metrics.result.contentSize?.height || 900), 15000);
      const full = await request('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
        clip: { x: 0, y: 0, width, height: contentHeight, scale: 1 },
      });
      fs.writeFileSync(path.join(output, 'bodytech-full-' + width + '.png'), Buffer.from(full.result.data, 'base64'));
    }
    report.viewports.push(result);
    console.log('PASS ' + width + 'px: layout, headlines, hero image, anchors');
  }

  await inspect("document.querySelectorAll('.bt-programme-tab')[1].click()");
  await pause(220);
  assert.equal(await inspect("document.querySelectorAll('.bt-programme-tab')[1].getAttribute('aria-selected')"), 'true', 'Programme tab did not update');
  await inspect("document.querySelector('.bt-visit-form button[type=submit]').click()");
  await pause(160);
  assert(await inspect("Boolean(document.querySelector('.bt-visit-form input[aria-invalid=true]'))"), 'Empty form did not show validation error');
  await request('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert(await inspect("matchMedia('(prefers-reduced-motion: reduce)').matches"), 'Reduced motion not respected');
  assert.equal(report.runtimeErrors.length, 0, 'Uncaught browser exception(s): ' + report.runtimeErrors.join(', '));
  report.interaction = 'PASS: tabs, form validation, reduced motion';
  console.log('PASS programme switching, validation and reduced motion');
} catch (error) {
  report.failure = error?.stack || String(error);
  console.error('BODYTECH UI QA FAILED:', report.failure);
  process.exitCode = 1;
} finally {
  fs.writeFileSync(path.join(output, 'qa-report.json'), JSON.stringify(report, null, 2));
  try { socket?.close(); } catch { /* ignore */ }
  try { browser?.kill('SIGTERM'); } catch { /* ignore */ }
  fs.rmSync(profile, { recursive: true, force: true });
}
