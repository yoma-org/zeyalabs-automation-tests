#!/usr/bin/env node
// Upload test results to Xray Cloud as a new Test Execution in the app's Jira project.
//
// Credentials: XRAY_CLIENT_ID / XRAY_CLIENT_SECRET from the environment (CI secrets) or, if unset,
// from the repo-root .env (shared by every app). Jira project: projects/<app>/xray.json → projectKey.
//
// Usage:
//   node scripts/xray-upload.mjs --app farewell --trial FW-7            mark one test PASSED (trial)
//   node scripts/xray-upload.mjs --app farewell --trial FW-7 --dry-run  print the payload, send nothing
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseEnv } from 'node:util';

const XRAY = 'https://xray.cloud.getxray.app/api/v2';
const argv = process.argv.slice(2);
const arg = name => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : undefined);
const APP = arg('--app');
const TRIAL = arg('--trial');
const DRY = argv.includes('--dry-run');

const fail = msg => { console.error(`xray-upload: ${msg}`); process.exit(1); };
if (!APP) fail('pass --app <name>');
if (!TRIAL) fail('pass --trial <JIRA-KEY> (only trial uploads are supported for now)');

const configFile = join('projects', APP, 'xray.json');
if (!existsSync(configFile)) fail(`${configFile} not found (it holds { "projectKey": "..." })`);
const { projectKey } = JSON.parse(readFileSync(configFile, 'utf8'));
if (!projectKey) fail(`${configFile} has no projectKey`);
if (!TRIAL.startsWith(`${projectKey}-`)) fail(`${TRIAL} is not in project ${projectKey}`);

// Environment wins over .env so CI secrets work without a file.
if (existsSync('.env')) {
  for (const [k, v] of Object.entries(parseEnv(readFileSync('.env', 'utf8')))) process.env[k] ??= v;
}

const payload = {
  info: {
    project: projectKey,
    summary: `Trial upload · ${APP} · ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`,
    description: 'Trial result sent by scripts/xray-upload.mjs to check that results attach to the imported test.',
  },
  tests: [{ testKey: TRIAL, status: 'PASSED', comment: 'Trial upload, not a real test run.' }],
};

if (DRY) { console.log(JSON.stringify(payload, null, 2)); process.exit(0); }

const { XRAY_CLIENT_ID: client_id, XRAY_CLIENT_SECRET: client_secret } = process.env;
if (!client_id || !client_secret) fail('XRAY_CLIENT_ID / XRAY_CLIENT_SECRET missing (set them in the repo-root .env, see .env.example)');

async function post(path, body, token) {
  const res = await fetch(`${XRAY}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) fail(`${path} → HTTP ${res.status}: ${text}`);
  return JSON.parse(text);
}

const token = await post('/authenticate', { client_id, client_secret });
const execution = await post('/import/execution', payload, token);
console.log(`xray-upload: ${TRIAL} PASSED → Test Execution ${execution.key}`);
