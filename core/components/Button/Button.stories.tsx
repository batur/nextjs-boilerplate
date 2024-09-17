import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonProps } from './Button';

const TestButton = (
  props: ButtonProps & {
    label: string;
  }
) => <Button {...props}>{props.label}</Button>;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: TestButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      control: { type: 'radio' },
      defaultValue: 'default'
    },
    size: {
      options: ['default', 'icon', 'lg', 'sm'],
      control: { type: 'radio' },
      defaultValue: 'default'
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() }
} satisfies Meta<
  ButtonProps & {
    label: string;
  }
>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Story: Story = {
  args: {
    label: 'Button',
    variant: 'default',
    size: 'default'
  }
};
