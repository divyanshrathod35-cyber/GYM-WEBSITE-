import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const projectRoot = path.resolve(import.meta.dirname, '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bodytech-qa-'));

try {
  for (const [source, target] of [
    ['src/config/gymConfig.ts', 'config/gymConfig.cjs'],
    ['src/lib/core.ts', 'lib/core.cjs'],
  ]) {
    const code = fs.readFileSync(path.join(projectRoot, source), 'utf8');
    const emitted = ts.transpileModule(code, {
      fileName: source,
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
      reportDiagnostics: true,
    });
    assert.equal(emitted.diagnostics?.length ?? 0, 0, `TypeScript syntax errors in ${source}`);
    const result = emitted.outputText.replace('require("../config/gymConfig")', 'require("../config/gymConfig.cjs")');
    const out = path.join(tmp, target);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, result);
  }

  const core = require(path.join(tmp, 'lib/core.cjs'));
  const { gymConfig } = require(path.join(tmp, 'config/gymConfig.cjs'));
  assert.equal(core.validFullName('Raj K'), true);
  assert.equal(core.validFullName('A 4'), false);
  assert.equal(core.validFullName('   '), false);
  assert.equal(core.validFullName('A B'), true);
  assert.equal(core.validIndianMobile('8349344321'), true);
  assert.equal(core.validIndianMobile('1349344321'), false);
  assert.equal(core.validIndianMobile('83493 44321'), false);
  assert.equal(core.safeText(' <script> A&B  C </script> '), 'script A&B C /script');
  assert.equal(core.planQuote('individual', 6, false).total, gymConfig.pricing.individual[6]);
  assert.equal(core.planQuote('individual', 6, false).savings, gymConfig.pricing.individual[1] * 6 - gymConfig.pricing.individual[6]);
  assert.equal(core.planQuote('couple', 12, true).total, gymConfig.pricing.couple[12] + gymConfig.pricing.trainerMonthlyAddOn * 12);
  const snapshot = core.fitnessBlueprint({ height: 170, weight: 70, age: 27, sex: 'male', activity: 'moderate', goal: 'Muscle & Strength' });
  assert.equal(snapshot.bmi.toFixed(1), '24.2');
  assert.equal(snapshot.protein, 112);
  assert(snapshot.calorieTarget > snapshot.maintenance);
  assert.equal(core.fitnessBlueprint({ height: 100, weight: 70, age: 27, sex: 'male', activity: 'light', goal: 'Fat Loss' }), null);
  assert.equal(core.fitnessBlueprint({ height: 180, weight: 52, age: 27, sex: 'male', activity: 'moderate', goal: 'Fat Loss' }).calorieTarget, null);
  assert.match(core.uniquePassCode(), /^BTG-RJN-[A-HJ-NP-Z2-9]{5}$/);
  assert(core.waLink('Hi & नमस्ते').includes('%26'));
  assert(core.directionsUrl('srishti').includes('Kamala%20College%20Road'));
  assert.equal(core.xmlEscape('<>&"\''), '&lt;&gt;&amp;&quot;&apos;');
  for (const file of ['index.html', 'public/favicon.svg', 'src/index.css', 'src/App.tsx', ...Object.values(gymConfig.media).map(src => `public${src}`)]) {
    assert(fs.existsSync(path.join(projectRoot, file)), `Missing: ${file}`);
  }
  const ui = fs.readFileSync(path.join(projectRoot, 'src/App.tsx'), 'utf8');
  const jsx = ts.transpileModule(ui, { fileName: 'src/App.tsx', reportDiagnostics: true, compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } });
  assert.equal(jsx.diagnostics?.length ?? 0, 0, 'App.tsx must parse');
  assert(ui.includes('prefers-reduced-motion') && ui.includes('aria-expanded') && ui.includes('aria-invalid'), 'Expected accessible interaction states');
  // V6 regression gates: one active stylesheet; no superimposed animated copy.
  const main = fs.readFileSync(path.join(projectRoot, 'src/main.tsx'), 'utf8');
  const style = fs.readFileSync(path.join(projectRoot, 'src/editorial-v6.css'), 'utf8');
  const head = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
  assert(main.includes("'./editorial-v6.css'"), 'V6 design stylesheet must be active');
  assert(!main.includes("'./index.css'") && !main.includes("'./flagship.css'"), 'Legacy conflicting styles must not load');
  assert(ui.includes('bt-hero-copy') && ui.includes('bt-hero-photo'), 'Hero copy and photography must be in separate containers');
  assert(ui.includes('bt-programme-tabs') && ui.includes('aria-selected'), 'Accessible programme explorer is required');
  assert(!ui.includes('bt-cinema-headline') && !ui.includes('bt-cinema-giant'), 'Overlapping animation cannot return');
  assert(style.includes('.bt-hero {display:grid') && style.includes('.bt-hero-photo {'), 'Responsive asymmetric hero grid is required');
  assert(style.includes('@media(max-width:600px)') && style.includes('@media(prefers-reduced-motion:reduce)'), 'Mobile and motion safety queries are required');
  assert(head.includes('rel="canonical"') && head.includes('HealthClub'), 'SEO metadata and structured data are required');
  assert(head.includes('noindex,follow'), 'Concept may not be indexed before owner approval');
  console.log('PASS: input validation, pricing maths, calorie safeguards, share links, SVG escaping, media assets and JSX syntax, V6 layout and SEO regression gates');
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}