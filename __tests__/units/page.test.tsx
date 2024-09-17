import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Page from '@app/page';

test('Page', () => {
  render(<Page />);
  expect(screen.getByRole('heading', { level: 1, name: 'Hello World' })).toBeDefined();
  expect(screen.getByRole('button', { name: '1' })).toBeDefined();
});
