// eslint.config.mjs
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  { ignores: ['playwright-report/', 'test-results/', 'node_modules/', 'tests/_drafts/'] },
  ...tseslint.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.ts']
  },
  {
    files: ['tests/**/*.ts'],
    rules: {
      // Specs go through @fixtures; only the auth setup may import Playwright directly.
      'no-restricted-imports': ['error', { paths: [{ name: '@playwright/test', message: "Import { test, expect } from '@fixtures'." }] }]
    }
  },
  {
    files: ['tests/auth.setup.ts'],
    rules: { 'no-restricted-imports': 'off' }
  },
  {
    files: ['src/fixtures/**/*.ts'],
    rules: { 'no-empty-pattern': 'off' } // Playwright fixtures use `async ({}, use) =>`
  }
);
