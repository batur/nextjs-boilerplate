import React from 'react';

import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Button } from './Button';

test('Button Component', () => {
  render(<Button variant={'default'}>Click Me</Button>);
  expect(screen.getByRole('button', { name: 'Click Me' })).toBeDefined();
});
