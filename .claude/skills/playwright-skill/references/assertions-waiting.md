# Assertions and Waiting

Use Playwright web-first assertions:

```ts
await expect(locator).toBeVisible();
await expect(locator).toHaveText('Approved');
await expect(page).toHaveURL(/dashboard/);
```

Avoid:

```ts
expect(await locator.isVisible()).toBeTruthy();
await page.waitForTimeout(3000);
```

For network-dependent behavior:

```ts
const responsePromise = page.waitForResponse(
  response => response.url().includes('/invoices') && response.request().method() === 'POST'
);

await page.getByRole('button', { name: 'Submit' }).click();
await responsePromise;
```

Wait for observable state, not arbitrary time.

Money values:

```ts
await expect(invoicePage.grandTotal).toHaveText('150,000.00');      // exact formatted text
expect(parseAmount(await invoicePage.grandTotal.innerText())).toBe(parseAmount(String(apiBody.grand_total)));
```

Use `src/helpers/money.ts` for parsing so UI, API and PDF values compare the same way.
