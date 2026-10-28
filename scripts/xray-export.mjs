#!/usr/bin/env node
// Export an app's canonical test cases (projects/<app>/docs/test-cases/features/*.md and
// suites/e2e-critical-flows.md) to Excel workbooks laid out for the Xray Test Case Importer.
// CSV is written to a temp folder and converted by scripts/xray-xlsx.py (python3 + openpyxl).
//
// Output: projects/<app>/docs/test-cases/xray/
//   <app>-all.xlsx            every module in one import
//   modules/<nn>-<slug>.xlsx  one import per module (same columns)
//
// One Test = one group of rows sharing "Test ID"; the first row carries the fields, every row
// carries one step (Action / Data / Expected Result). "Repository Path" puts each test in the
// Xray Test Repository folder <App>/<nn Module>/<Sub-feature>. Obsolete cases are skipped.
//
// Test Type: "Automated" for Auto-* cases, "Manual" for manual-only cases. Both are step-based; the
// "Automated" type must exist in Xray (Settings → Test Types, kind Steps) and be enabled for the project.
//
// Usage: node scripts/xray-export.mjs --app farewell
//        node scripts/xray-export.mjs --app farewell --only ACC-001,WALL-016   trial import → xray/<app>-trial.{csv,xlsx}
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const argv = process.argv.slice(2);
const APP = argv.includes('--app') ? argv[argv.indexOf('--app') + 1] : process.env.APP;
const ROOT = join('projects', APP ?? '', 'docs/test-cases');
if (!APP || !existsSync(ROOT)) { console.error('Pass --app <name>'); process.exit(1); }
const OUT = join(ROOT, 'xray');
const ONLY = argv.includes('--only') ? argv[argv.indexOf('--only') + 1].split(',').map(s => s.trim()) : null;
const TMP = mkdtempSync(join(tmpdir(), 'xray-'));
const APP_NAME = APP.charAt(0).toUpperCase() + APP.slice(1);
const PRIORITY = { P1: 'High', P2: 'Medium', P3: 'Low' };
const testType = automation => (automation === 'Manual' ? 'Manual' : 'Automated');

const splitRow = l => l.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map(c => c.trim().replace(/\\\|/g, '|'));
const isSep = l => /^\|\s*:?-+/.test(l);
// Markdown → Jira wiki markup (bold, code, links); "|" would break wiki tables.
const wiki = s => (s ?? '')
  .replace(/\*\*(.+?)\*\*/g, '*$1*')
  .replace(/`([^`]+)`/g, '{{$1}}')
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .replace(/<br\s*\/?>/gi, '\n');
const wcell = s => wiki(s).replace(/\|/g, '/').replace(/\n/g, ' ') || ' ';
const folder = s => s.replace(/\//g, '-').replace(/\s+/g, ' ').trim();
const label = s => s.replace(/[^A-Za-z0-9+_-]+/g, '-').replace(/^-|-$/g, '');

function table(lines, i) { // rows of the markdown table whose header is at lines[i]
  const rows = [];
  let j = i + 1;
  for (; j < lines.length && lines[j].startsWith('|'); j++) if (!isSep(lines[j])) rows.push(splitRow(lines[j]));
  return { rows, end: j };
}

function parseFeature(file) {
  const lines = readFileSync(file, 'utf8').split('\n');
  const [, no, slug] = basename(file).match(/^(\d+)-(.+)\.md$/);
  const name = lines[0].replace(/^# \d+ · /, '').trim();
  const feature = { no, slug, file: basename(file, '.md'), name, cases: [] };
  let i = lines.findIndex(l => l.trim() === '## Test cases');
  let sub = '', c = null, section = null;
  for (i++; i < lines.length; i++) {
    const line = lines[i];
    let h;
    if ((h = line.match(/^### (.+)$/))) { sub = h[1].trim(); c = null; continue; }
    if ((h = line.match(/^#### (★ )?(\S+) · (.+)$/))) {
      const [pri, tags, auto, status, source] = splitRow(lines[i + 4]);
      const [automation, manualReason = ''] = auto.split(/ — (.*)/s);
      const [st, statusNote = ''] = status.split(/ — (.*)/s);
      c = { id: h[2], title: h[3].trim(), critical: !!h[1], sub, priority: pri, tags: tags.split(/\s+/).filter(t => t.startsWith('@')),
        automation, manualReason, status: st, statusNote, source, role: '', pre: [], steps: [], variants: [], notes: [] };
      feature.cases.push(c);
      i += 4; section = null; continue;
    }
    if (!c) continue;
    if ((h = line.match(/^\*\*Role:\*\*\s*(.*)$/))) { c.role = h[1]; continue; }
    if (/^\*\*Preconditions:\*\*/.test(line)) { section = 'pre'; continue; }
    if (/^\*\*Steps:\*\*/.test(line)) { section = 'steps'; continue; }
    if (/^\*\*Data variants/.test(line)) { section = 'variants'; continue; }
    if (/^---\s*$/.test(line)) { section = null; continue; }
    if (line.startsWith('| # |')) {
      const { rows, end } = table(lines, i);
      if (section === 'steps') c.steps = rows.map(([n, action, data, expected]) => ({ n, action, data, expected }));
      if (section === 'variants') c.variants = rows.map(([n, variant, source, note = '']) => ({ n, variant, source, note }));
      i = end - 1; continue;
    }
    if (section === 'pre' && (h = line.match(/^\s*\d+\.\s+(.*)$/))) { c.pre.push(h[1]); continue; }
    if (line.trim()) c.notes.push(line.trim());
  }
  return feature;
}

function parseE2E(file) {
  if (!existsSync(file)) return null;
  const lines = readFileSync(file, 'utf8').split('\n');
  const flows = [];
  let f = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let h;
    if ((h = line.match(/^## (E2E-\d+) · (.+)$/))) { f = { id: h[1], title: h[2].trim(), why: '', setup: '', steps: [] }; flows.push(f); continue; }
    if (!f) continue;
    if ((h = line.match(/^\*\*Why critical:\*\*\s*(.*)$/))) f.why = h[1];
    if ((h = line.match(/^\*\*Setup:\*\*\s*(.*)$/))) f.setup = h[1];
    if (line.startsWith('| # | Step')) {
      const { rows, end } = table(lines, i);
      f.steps = rows.map(([n, step, verify, refs]) => ({ n, action: step, data: wiki(refs), expected: verify }));
      i = end - 1; f = null;
    }
  }
  return flows;
}

// Only what has no field of its own: case ID is in Summary, automation in Test Type + labels,
// priority in Priority. Status shows only when it is Review (the open question).
function description(c) {
  const blocks = [];
  if (c.role) blocks.push(`*Role:* ${wiki(c.role)}`);
  if (c.pre.length) blocks.push(['*Preconditions:*', ...c.pre.map(p => `# ${wiki(p)}`)].join('\n'));
  if (c.variants.length) {
    const withNote = c.variants.some(v => v.note);
    blocks.push([`*Data variants* — run the steps once per variant:`,
      withNote ? '||#||Variant||Expected||' : '||#||Variant||',
      ...c.variants.map(v => `|${v.n}|${wcell(v.variant)}|${withNote ? `${wcell(v.note)}|` : ''}`)].join('\n'));
  }
  if (c.status === 'Review' && c.statusNote) blocks.push(`(!) *Open question:* ${wiki(c.statusNote)}`);
  if (c.manualReason) blocks.push(`*Why manual:* ${wiki(c.manualReason)}`);
  if (c.notes.length) blocks.push(c.notes.map(wiki).join('\n'));
  if (c.source) blocks.push(`_Source: ${wiki(c.source)}_`);
  return blocks.join('\n\n');
}

// No app or P1/P2/P3 label: the Jira project is per app and priority is in the Priority field.
function labels(c) {
  return [c.prefix, c.critical && 'critical', ...c.tags.map(t => t.slice(1)),
    label(c.automation), c.status === 'Review' && 'review', c.variants.length && 'data-driven'].filter(Boolean);
}

const HEADER_BASE = ['Test ID', 'Summary', 'Test Type', 'Priority'];
const HEADER_TAIL = ['Repository Path', 'Description', 'Preconditions', 'Action', 'Data', 'Expected Result'];
const csv = v => { const s = String(v ?? ''); return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };

function toCsv(tests) {
  // One Labels column, ";"-separated (the importer's default "List value delimiter"): it maps each Jira field only once.
  const header = [...HEADER_BASE, 'Labels', ...HEADER_TAIL];
  const out = [header];
  for (const t of tests) {
    const steps = t.steps.length ? t.steps : [{ action: '', data: '', expected: '' }];
    steps.forEach((s, k) => {
      const first = k === 0;
      out.push([
        t.key, first ? t.summary : '', first ? t.type : '', first ? t.priority : '',
        first ? t.labels.join(';') : '',
        first ? t.path : '', first ? t.description : '', first ? t.preconditions : '',
        wiki(s.action), wiki(s.data), wiki(s.expected),
      ]);
    });
  }
  return '﻿' + out.map(r => r.map(csv).join(',')).join('\r\n') + '\r\n';
}

const features = readdirSync(join(ROOT, 'features')).filter(f => /^\d+-.+\.md$/.test(f)).sort()
  .map(f => parseFeature(join(ROOT, 'features', f)));

let key = 0;
const modules = [];
const skipped = [];
for (const f of features) {
  const tests = [];
  for (const c of f.cases) {
    c.prefix = c.id.replace(/-\d+$/, '');
    if (c.status === 'Obsolete') { skipped.push(`${c.id} · ${c.title}`); continue; }
    tests.push({
      key: ++key, id: c.id, summary: `${c.id} · ${c.title}`, type: testType(c.automation), priority: PRIORITY[c.priority] ?? c.priority,
      labels: labels(c), path: `${APP_NAME}/${f.no} ${folder(f.name)}/${folder(c.sub)}`,
      description: description(c), preconditions: c.pre.map((p, k) => `${k + 1}. ${wiki(p)}`).join('\n'), steps: c.steps,
    });
  }
  modules.push({ file: f.file, name: `${f.no} · ${f.name}`, tests });
}

const flows = parseE2E(join(ROOT, 'suites/e2e-critical-flows.md'));
if (flows?.length) {
  const no = String(features.length + 1).padStart(2, '0');
  modules.push({
    file: `${no}-e2e-critical-flows`, name: `${no} · E2E Critical Flows`,
    tests: flows.map(fl => ({
      key: ++key, id: fl.id, summary: `${fl.id} · ${fl.title}`, type: testType('Auto-UI+API'), priority: 'High',
      labels: ['E2E', 'critical', 'e2e', 'Auto-UI+API'],
      path: `${APP_NAME}/${no} E2E Critical Flows`,
      description: [`*Flow ID:* ${fl.id}  (★ critical business flow)`, `*Why critical:* ${wiki(fl.why)}`, `*Setup:* ${wiki(fl.setup)}`,
        '', 'Each step reuses the catalogued case(s) in the Data column.'].join('\n'),
      preconditions: wiki(fl.setup), steps: fl.steps,
    })),
  });
}

if (ONLY) {
  const trial = modules.flatMap(m => m.tests).filter(t => ONLY.includes(t.id));
  const missing = ONLY.filter(id => !trial.some(t => t.id === id));
  if (missing.length) { console.error(`--only: not found (or Obsolete): ${missing.join(', ')}`); process.exit(1); }
  const csvText = toCsv(trial);
  writeFileSync(join(TMP, `${APP}-trial.csv`), csvText);
  execFileSync('python3', ['scripts/xray-xlsx.py', TMP, OUT], { stdio: 'inherit' });
  writeFileSync(join(OUT, `${APP}-trial.csv`), csvText);
  console.log(`xray trial: ${trial.map(t => `${t.id} (${t.type})`).join(', ')} → ${join(OUT, `${APP}-trial.csv`)}`);
  process.exit(0);
}

mkdirSync(join(TMP, 'modules'), { recursive: true });
for (const m of modules) writeFileSync(join(TMP, 'modules', `${m.file}.csv`), toCsv(m.tests));
const all = modules.flatMap(m => m.tests);
writeFileSync(join(TMP, `${APP}-all.csv`), toCsv(all));
execFileSync('python3', ['scripts/xray-xlsx.py', TMP, OUT], { stdio: 'inherit' });

const rows = modules.map(m => `| ${m.name} | [modules/${m.file}.xlsx](modules/${m.file}.xlsx) | ${m.tests.length} | ${m.tests.reduce((n, t) => n + Math.max(1, t.steps.length), 0)} |`);
writeFileSync(join(OUT, 'README.md'), `# ${APP_NAME} — Xray import

Generated by \`node scripts/xray-export.mjs --app ${APP}\` from [features/](../features/) and
[suites/e2e-critical-flows.md](../suites/e2e-critical-flows.md). Do not edit the Excel files by hand:
change the feature files and run the script again.

| | |
|---|---|
| Tests | **${all.length}** (${skipped.length} Obsolete skipped) |
| Steps | ${all.reduce((n, t) => n + Math.max(1, t.steps.length), 0)} |
| Import all at once | [${APP}-all.xlsx](${APP}-all.xlsx) |

## Files per module

| Module | File | Tests | Steps |
|---|---|---|---|
${rows.join('\n')}

## Import into Xray

Each workbook has one import sheet, **Tests**: one row per step; the rows of one test share *Test ID* and are
banded in the same colour. \`${APP}-all.xlsx\` also has a **Modules** sheet with counts (not imported).

The Xray Test Case Importer reads CSV, so export the sheet first:

1. Open the workbook (one module, or \`${APP}-all.xlsx\`) → **File → Save As → CSV UTF-8 (Comma delimited)**.
   Excel saves only the active sheet, so keep **Tests** selected.
2. Jira → **Xray → Import Tests → Test Case Importer → CSV**. Delimiter **,**, encoding **UTF-8**.
   Tick *Import values with line breaks*. On **Setup**: keep *List value delimiter* \`;\` and turn on
   *Create Test Repository folders if needed*.
3. Pick the Jira project and map *Repository Path* (Test Repository path) so the tests land in
   \`${APP_NAME}/<nn Module>/<Sub-feature>\`, the same structure as the feature files.
4. Map the columns:

| Column | Xray / Jira field |
|---|---|
| Test ID | *Test ID* (groups the step rows of one test) |
| Summary | Summary |
| Test Type | Test Type: \`Automated\` (Auto-UI / Auto-UI+API / Auto-API cases) or \`Manual\` (manual-only cases). Both are step-based; create the \`Automated\` type (kind Steps) in Xray and enable it for the project before importing |
| Priority | Priority (\`High\` = P1, \`Medium\` = P2, \`Low\` = P3) |
| Labels | Labels (one column, separated by \`;\` = Setup → List value delimiter) |
| Repository Path | Test Repository Path |
| Description | Description |
| Preconditions | optional: a custom field, or leave unmapped (it is also in Description) |
| Action / Data / Expected Result | Manual Test Step: Action / Data / Expected Result |

5. Save the mapping as a configuration so the next module imports in one click.

## What is where

- **Summary** starts with the canonical case ID (\`ACC-001 · …\`) so tests stay traceable to the repo and to
  Playwright specs (the specs' titles use the same ID).
- **Labels:** module prefix (\`ACC\`, \`WALL\`, …), \`critical\` (★), \`smoke\`,
  \`e2e\`, automation (\`Auto-UI\`, \`Auto-UI+API\`, \`Auto-API\`, \`Manual\`), \`review\` (Status Review — open
  question in Description), \`data-driven\` (has a Data variants table).
- **Data variants** are a table in the Description: run the steps once per variant (or turn the table into an
  Xray dataset after import).
- **Re-importing** creates new tests. To update tests that are already in Xray, import only the new cases, or edit in Jira.

## Skipped (Obsolete)

${skipped.map(s => `- ${s}`).join('\n') || '- none'}
`);

console.log(`xray: ${all.length} tests in ${modules.length} module workbooks → ${OUT}`);
