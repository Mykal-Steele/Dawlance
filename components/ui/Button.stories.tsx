import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: { onClick: fn() },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "Visual style of the button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Size of the button",
    },
    disabled: { control: "boolean" },
    asChild: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Plan My Trip" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Save Draft" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "View Details" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Remove" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Cancel" },
};

export const Link: Story = {
  args: { variant: "link", children: "Learn more" },
};

export const Small: Story = {
  args: { size: "sm", children: "Filter" },
};

export const Large: Story = {
  args: { size: "lg", children: "Start Planning" },
};

export const Disabled: Story = {
  args: { children: "Unavailable", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
