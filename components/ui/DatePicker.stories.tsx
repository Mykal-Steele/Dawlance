import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "UI/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-72 p-4"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: { id: "start-date" },
};

export const WithLabel: Story = {
  args: {
    id: "start-date",
    label: "Start Date",
  },
};

export const WithValue: Story = {
  args: {
    id: "start-date",
    label: "Start Date",
    defaultValue: "2026-06-01",
  },
};

export const WithError: Story = {
  args: {
    id: "end-date",
    label: "End Date",
    error: "End date must be after start date",
  },
};

export const TripDates: Story = {
  render: () => (
    <div className="w-72 space-y-4 p-4">
      <DatePicker id="trip-start" label="Start Date" min="2026-01-01" />
      <DatePicker id="trip-end" label="End Date" min="2026-01-02" />
    </div>
  ),
};
