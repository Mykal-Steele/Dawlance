import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
import { Card, CardContent } from "./Card";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-96">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="attractions">Attractions</TabsTrigger>
        <TabsTrigger value="hotels">Hotels</TabsTrigger>
        <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <p className="text-sm text-text-light p-2">Showing all 32 recommendations</p>
      </TabsContent>
      <TabsContent value="attractions">
        <p className="text-sm text-text-light p-2">Showing 15 attractions</p>
      </TabsContent>
      <TabsContent value="hotels">
        <p className="text-sm text-text-light p-2">Showing 7 hotels</p>
      </TabsContent>
      <TabsContent value="restaurants">
        <p className="text-sm text-text-light p-2">Showing 10 restaurants</p>
      </TabsContent>
    </Tabs>
  ),
};

export const ItineraryDayTabs: Story = {
  render: () => (
    <Tabs defaultValue="day1" className="w-96">
      <TabsList>
        <TabsTrigger value="all">All Days</TabsTrigger>
        <TabsTrigger value="day1">Day 1</TabsTrigger>
        <TabsTrigger value="day2">Day 2</TabsTrigger>
        <TabsTrigger value="day3">Day 3</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <Card><CardContent className="pt-4"><p className="text-sm">Full itinerary view</p></CardContent></Card>
      </TabsContent>
      <TabsContent value="day1">
        <Card><CardContent className="pt-4"><p className="text-sm">Jun 1 activities</p></CardContent></Card>
      </TabsContent>
      <TabsContent value="day2">
        <Card><CardContent className="pt-4"><p className="text-sm">Jun 2 activities</p></CardContent></Card>
      </TabsContent>
      <TabsContent value="day3">
        <Card><CardContent className="pt-4"><p className="text-sm">Jun 3 activities</p></CardContent></Card>
      </TabsContent>
    </Tabs>
  ),
};
