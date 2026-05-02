import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "UI/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: { onClick: fn() },
  argTypes: {
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Unselected: Story = {
  args: { children: "Museums", selected: false },
};

export const Selected: Story = {
  args: { children: "Museums", selected: true },
};

export const WithIcon: Story = {
  args: {
    children: "Nature",
    selected: false,
    icon: <span>🌿</span>,
  },
};

export const Disabled: Story = {
  args: { children: "Museums", disabled: true },
};

const TRAVEL_STYLE_OPTIONS = ["Museums", "Nature", "Culinary", "History", "Nightlife", "Shopping", "Relaxation"];

function TravelStyleGroupDemo(): React.JSX.Element {
  const [selected, setSelected] = React.useState<string[]>(["Museums"]);
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {TRAVEL_STYLE_OPTIONS.map((opt) => (
        <Chip
          key={opt}
          selected={selected.includes(opt)}
          onClick={() =>
            setSelected((prev) =>
              prev.includes(opt) ? prev.filter((s) => s !== opt) : [...prev, opt]
            )
          }
        >
          {opt}
        </Chip>
      ))}
    </div>
  );
}

export const TravelStyleGroup: Story = {
  render: () => <TravelStyleGroupDemo />,
};
