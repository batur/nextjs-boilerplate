import { test, expect } from '@playwright/test';

test('has button', async ({ page }) => {
  await page.goto('http:localhost:3000');

  const consoleMessages: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'log') {
      consoleMessages.push(msg.text());
    }
  });

  await page.getByRole('button', { name: 'Click Me' }).click();

  expect(consoleMessages).toContain('Clicked');
});
