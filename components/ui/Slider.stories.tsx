import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-80 p-4"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: [50], min: 0, max: 100 },
};

export const WithLabel: Story = {
  args: {
    label: "Travel Pace",
    defaultValue: [50],
    min: 0,
    max: 100,
    showValue: true,
  },
};

const PACE_LABELS = ["Quick Bites", "Balanced", "Long Dinners"];

function getPaceLabel(v: number): string {
  if (v < 33) return PACE_LABELS[0];
  if (v < 66) return PACE_LABELS[1];
  return PACE_LABELS[2];
}

function PaceSliderDemo(): React.JSX.Element {
  const [value, setValue] = React.useState([50]);
  return (
    <div className="w-80 space-y-4 p-4">
      <Slider
        label="Meal Pace"
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        showValue={true}
        formatValue={(v) => getPaceLabel(v)}
      />
      <div className="flex justify-between text-xs text-text-light">
        <span>Quick Bites</span>
        <span>Balanced</span>
        <span>Long Dinners</span>
      </div>
    </div>
  );
}

function BudgetRangeDemo(): React.JSX.Element {
  const [value, setValue] = React.useState([30, 70]);
  return (
    <div className="w-80 p-4">
      <Slider
        label="Budget Range"
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        showValue={true}
        formatValue={() => `$${value[0]} - $${value[1]}`}
      />
    </div>
  );
}

export const PaceSlider: Story = {
  render: () => <PaceSliderDemo />,
};

export const BudgetRange: Story = {
  render: () => <BudgetRangeDemo />,
};
