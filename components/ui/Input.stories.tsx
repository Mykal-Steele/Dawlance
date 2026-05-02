import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const SearchIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const LocationIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { id: "default", placeholder: "Enter destination..." },
};

export const WithIcon: Story = {
  args: {
    id: "search",
    placeholder: "Search places...",
    icon: <SearchIcon />,
  },
};

export const WithLocationIcon: Story = {
  args: {
    id: "destination",
    placeholder: "Where are you going?",
    icon: <LocationIcon />,
  },
};

export const WithError: Story = {
  args: {
    id: "error-input",
    placeholder: "Enter destination...",
    value: "P",
    error: "Destination must be at least 2 characters",
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled",
    placeholder: "Not available",
    disabled: true,
  },
};
