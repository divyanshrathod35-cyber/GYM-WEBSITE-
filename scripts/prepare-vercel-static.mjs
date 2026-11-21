#!/usr/bin/env node
/**
 * Package an already-successful Vite dist/ build as Vercel Build Output API v3.
 * This deliberately avoids "vercel build", whose Windows builder may require
 * OS symlink privileges for its private package cache.
 *
 * Only the generated .vercel/output directory is replaced.
 * No network access, credentials, or framework dependencies are required.
 */
import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const output = join(root, '.vercel', 'output');
const staticRoot = join(output, 'static');

function walk(folder) {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name);
    const kind = lstatSync(path);
    if (kind.isSymbolicLink()) throw new Error('Refusing symlink inside generated dist: ' + path);
    if (kind.isDirectory()) return walk(path);
    if (!kind.isFile()) throw new Error('Unsupported generated file type: ' + path);
    return [path];
  });
}

if (!existsSync(join(dist, 'index.html'))) {
  throw new Error('Missing dist/index.html: run npm run build first.');
}
const files = walk(dist);
if (files.length < 4) throw new Error('Too few Vite output assets; refusing partial deployment.');
const mustExist = ['index.html', 'favicon.svg', 'media/hero-strength.webp'];
for (const rel of mustExist) {
  if (!existsSync(join(dist, rel))) throw new Error('Missing required Vite asset: ' + rel);
}
const html = readFileSync(join(dist, 'index.html'), 'utf8');
if (!/Body Tech|BODY TECH|BODYTECH/i.test(html)) {
  throw new Error('Dist HTML does not contain the Body Tech Gym brand.');
}
const linkedAssets = [...html.matchAll(/(?:src|href)=["'](\/assets\/[^"']+)["']/g)].map((m) => m[1]);
if (linkedAssets.length < 2) throw new Error('Vite index is missing CSS/JS asset links.');
for (const url of linkedAssets) {
  const rel = url.slice(1);
  if (rel.includes('..') || !existsSync(join(dist, rel))) {
    throw new Error('Missing referenced asset in dist: ' + url);
  }
}
if (existsSync(output)) {
  if (lstatSync(output).isSymbolicLink()) {
    throw new Error('Refusing to replace symlinked .vercel/output');
  }
  // output is generated, disposable Vercel packaging only.
  rmSync(output, { recursive: true, force: true });
}
mkdirSync(staticRoot, { recursive: true });
let total = 0;
for (const file of files) {
  const dest = join(staticRoot, relative(dist, file));
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(file, dest);
  total++;
}

// Vercel Build Output API v3 uses static/ for CDN assets and config.json
// for headers, filesystem-first matching, and SPA navigation fallback.
const config = {
  version: 3,
  routes: [
    {
      src: '/(.*)',
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'X-Frame-Options': 'DENY',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
      continue: true,
    },
    { handle: 'filesystem' },
    { src: '/(.*)', dest: '/index.html' },
  ],
};
writeFileSync(join(output, 'config.json'), JSON.stringify(config, null, 2) + '\n', 'utf8');
const roundTrip = JSON.parse(readFileSync(join(output, 'config.json'), 'utf8'));
if (roundTrip.version !== 3 || !existsSync(join(staticRoot, 'index.html'))) {
  throw new Error('Vercel static output verification failed.');
}
console.log('PASS: Vercel Build Output API v3 package created without symlinks');
console.log('PASS: ' + total + ' static files, index, CSS/JS links and hero artwork verified');
console.log('OUTPUT: .vercel/output (production pitch demo, noindex)');
