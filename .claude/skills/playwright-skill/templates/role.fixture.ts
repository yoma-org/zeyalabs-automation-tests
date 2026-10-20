// src/fixtures/role.fixture.ts
import { test as base, request, type APIRequestContext, type BrowserContext, type Page } from '@playwright/test';
import { AuthApi } from '@api/clients/AuthApi';
import { authFile, credentials, env, type Role } from '@utils/Environment';

type RoleFixtures = {
  /** New browser page logged in as `role` (separate context per call). */
  asRole: (role: Role) => Promise<Page>;
  /** Back-office API context authenticated as `role`. */
  apiAs: (role: Role) => Promise<APIRequestContext>;
};

type RoleWorkerFixtures = {
  /** Bearer token per role, fetched once per worker. */
  tokenFor: (role: Role) => Promise<string>;
};

function apiContext(headers: Record<string, string> = {}): Promise<APIRequestContext> {
  return request.newContext({
    baseURL: env.apiBaseUrl,
    extraHTTPHeaders: { Accept: 'application/json', ...headers }
  });
}

export const test = base.extend<RoleFixtures, RoleWorkerFixtures>({
  tokenFor: [
    async ({}, use) => {
      const tokens = new Map<Role, Promise<string>>();
      await use(role => {
        if (!tokens.has(role)) {
          const token = (async () => {
            const anonymous = await apiContext();
            try {
              const { email, password } = credentials(role);
              return await new AuthApi(anonymous).login(email, password);
            } finally {
              await anonymous.dispose();
            }
          })();
          // Do not cache a failed login: the next test in this worker retries it.
          token.catch(() => tokens.delete(role));
          tokens.set(role, token);
        }
        return tokens.get(role)!;
      });
    },
    { scope: 'worker' }
  ],

  asRole: async ({ browser }, use) => {
    const contexts: BrowserContext[] = [];
    await use(async role => {
      const context = await browser.newContext({ storageState: authFile(role) });
      contexts.push(context);
      return context.newPage();
    });
    await Promise.all(contexts.map(c => c.close()));
  },

  apiAs: async ({ tokenFor }, use) => {
    const contexts: APIRequestContext[] = [];
    await use(async role => {
      const context = await apiContext({ Authorization: `Bearer ${await tokenFor(role)}` });
      contexts.push(context);
      return context;
    });
    await Promise.all(contexts.map(c => c.dispose()));
  }
});
