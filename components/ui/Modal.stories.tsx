import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
} from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";

const meta: Meta = {
  title: "UI/Modal",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Edit Activity</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Edit Activity</ModalTitle>
          <ModalDescription>Adjust the details for this activity in your itinerary.</ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <Input id="activity-name" placeholder="Activity name" />
          <Input id="activity-time" type="time" />
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="ghost">Cancel</Button>
          </ModalClose>
          <Button>Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const ConfirmDialog: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">Remove Activity</Button>
      </ModalTrigger>
      <ModalContent className="max-w-sm">
        <ModalHeader>
          <ModalTitle>Remove Activity</ModalTitle>
          <ModalDescription>
            Remove Eiffel Tower from your itinerary? The remaining activities will be rescheduled.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="ghost">Keep it</Button>
          </ModalClose>
          <Button variant="destructive">Remove</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
