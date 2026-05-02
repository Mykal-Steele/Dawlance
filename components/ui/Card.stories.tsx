import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Eiffel Tower</CardTitle>
        <CardDescription>Iconic landmark in the heart of Paris</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-light">
          A wrought-iron lattice tower on the Champ de Mars. Built in 1889,
          it stands 330 metres tall.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Badge>Attraction</Badge>
        <Button size="sm">Add to plan</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-72 p-5">
      <p className="text-sm text-[#3D4852]">Simple card with direct content and no subcomponents.</p>
    </Card>
  ),
};

export const RecommendationCard: Story = {
  render: () => (
    <Card className="w-72 overflow-hidden">
      <div className="h-40 bg-gradient-to-br from-[#2A7BFF]/20 to-[#6DD3B0]/20 flex items-center justify-center">
        <span className="text-4xl">🗼</span>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">Eiffel Tower</CardTitle>
          <Badge variant="default">$$</Badge>
        </div>
        <CardDescription>2 hrs · Attraction</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-text-light">
          Iconic iron lattice tower with panoramic views.
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm">Select for trip</Button>
      </CardFooter>
    </Card>
  ),
};
