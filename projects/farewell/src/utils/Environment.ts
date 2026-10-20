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

// The test site has no password: a role is the account name picked from the account menu.
// 'wave-employee' → WAVE_EMPLOYEE_ACCOUNT  (read from projects/farewell/.env)
export function accountName(role: Role): string {
  return required(`${role.toUpperCase().replaceAll('-', '_')}_ACCOUNT`);
}

// projects/farewell/playwright/.auth/<role>.json (this file is projects/farewell/src/utils/Environment.ts)
export function authFile(role: Role): string {
  return path.join(__dirname, '..', '..', 'playwright', '.auth', `${role}.json`);
}
