import { test, expect } from '@playwright/test';

test('has button', async ({ page }) => {
  await page.goto('http:localhost:3000');

  const oldButtonContent = await page.getByRole('button').textContent();
  await page.getByRole('button').click();
  const newButtonContent = await page.getByRole('button').textContent();

  expect(oldButtonContent).not.toBe(newButtonContent);
  expect(newButtonContent).toBe('2');
});
