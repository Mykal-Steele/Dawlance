import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
} from "./Select";

const meta: Meta = {
  title: "UI/Select",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-72 p-4"><Story /></div>],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select budget..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="budget">$ Budget</SelectItem>
        <SelectItem value="moderate">$$ Moderate</SelectItem>
        <SelectItem value="luxury">$$$ Luxury</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select category..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Places</SelectLabel>
          <SelectItem value="attraction">Attraction</SelectItem>
          <SelectItem value="hotel">Hotel</SelectItem>
          <SelectItem value="restaurant">Restaurant</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Activities</SelectLabel>
          <SelectItem value="tour">Tour</SelectItem>
          <SelectItem value="experience">Experience</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithError: Story = {
  render: () => (
    <Select>
      <SelectTrigger error="Please select a budget">
        <SelectValue placeholder="Select budget..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="budget">$ Budget</SelectItem>
        <SelectItem value="moderate">$$ Moderate</SelectItem>
      </SelectContent>
    </Select>
  ),
};
