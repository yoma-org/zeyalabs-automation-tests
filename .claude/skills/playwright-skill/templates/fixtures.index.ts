// src/fixtures/index.ts
import { mergeTests } from '@playwright/test';
import { test as baseTest } from './base.fixture';
import { test as roleTest } from './role.fixture';

export const test = mergeTests(baseTest, roleTest);
export { expect } from '@playwright/test';
