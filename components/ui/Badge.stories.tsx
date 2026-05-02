import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "tertiary", "success", "warning", "destructive", "outline", "neutral"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Attraction", variant: "default" },
};

export const Secondary: Story = {
  args: { children: "Available", variant: "secondary" },
};

export const Tertiary: Story = {
  args: { children: "Popular", variant: "tertiary" },
};

export const Success: Story = {
  args: { children: "Confirmed", variant: "success" },
};

export const Warning: Story = {
  args: { children: "Limited spots", variant: "warning" },
};

export const Destructive: Story = {
  args: { children: "Closed", variant: "destructive" },
};

export const Outline: Story = {
  args: { children: "2 hrs", variant: "outline" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Badge variant="default">Attraction</Badge>
      <Badge variant="secondary">Available</Badge>
      <Badge variant="tertiary">Popular</Badge>
      <Badge variant="success">Confirmed</Badge>
      <Badge variant="warning">Limited</Badge>
      <Badge variant="destructive">Closed</Badge>
      <Badge variant="outline">2 hrs</Badge>
      <Badge variant="neutral">Optional</Badge>
    </div>
  ),
};
