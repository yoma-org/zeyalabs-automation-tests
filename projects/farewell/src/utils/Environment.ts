// src/utils/Environment.ts
import path from 'node:path';

// The roles the suite signs in as (PROJECT.md "Roles and Authentication").
export const roles = ['platform-admin', 'wave-admin', 'bank-admin', 'employee', 'wave-employee', 'live-leaver'] as const;
export type Role = (typeof roles)[number];

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var ${name} (see projects/farewell/.env.example)`);
  return value;
}

export const env = {
  get baseUrl() { return required('BASE_URL'); }
};

// 'wave-employee' → WAVE_EMPLOYEE_<suffix>
function roleVar(role: Role, suffix: string): string {
  return `${role.toUpperCase().replaceAll('-', '_')}_${suffix}`;
}

/**
 * How a role signs in (read from projects/farewell/.env):
 * - UAT (Microsoft Entra SSO): <ROLE>_EMAIL + <ROLE>_PASSWORD. Leave the password empty to type it
 *   (and answer MFA) yourself in a headed browser: `npx playwright test --project=setup --headed`
 * - dev test site (no password): <ROLE>_ACCOUNT, the name picked from the account menu
 * - neither set: the role is not available on this environment (its setup is skipped).
 */
export type SignIn =
  | { kind: 'sso'; email: string; password?: string }
  | { kind: 'account-menu'; accountName: string }
  | { kind: 'none' };

export function signIn(role: Role): SignIn {
  const email = process.env[roleVar(role, 'EMAIL')];
  if (email) return { kind: 'sso', email, password: process.env[roleVar(role, 'PASSWORD')] || undefined };
  const accountName = process.env[roleVar(role, 'ACCOUNT')];
  if (accountName) return { kind: 'account-menu', accountName };
  return { kind: 'none' };
}

/** Account-menu name of a role (dev test site only). */
export function accountName(role: Role): string {
  return required(roleVar(role, 'ACCOUNT'));
}

// projects/farewell/playwright/.auth/<role>.json (this file is projects/farewell/src/utils/Environment.ts)
export function authFile(role: Role): string {
  return path.join(__dirname, '..', '..', 'playwright', '.auth', `${role}.json`);
}
