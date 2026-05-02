import type { Meta, StoryObj } from "@storybook/react";
import { LoadingSpinner } from "./LoadingSpinner";

const meta: Meta<typeof LoadingSpinner> = {
  title: "UI/LoadingSpinner",
  component: LoadingSpinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl"],
    },
    spinnerColor: {
      control: "select",
      options: ["primary", "secondary", "white", "muted"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
  args: { size: "default", spinnerColor: "primary" },
};

export const Small: Story = {
  args: { size: "sm", spinnerColor: "primary" },
};

export const Large: Story = {
  args: { size: "lg", spinnerColor: "primary" },
};

export const Secondary: Story = {
  args: { size: "default", spinnerColor: "secondary" },
};

export const OnDark: Story = {
  args: { size: "lg", spinnerColor: "white" },
  parameters: { backgrounds: { default: "dark" } },
};

export const GeneratingItinerary: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3 p-6">
      <LoadingSpinner size="xl" spinnerColor="primary" />
      <p className="text-sm font-medium text-[#3D4852]">Generating your itinerary...</p>
    </div>
  ),
};
