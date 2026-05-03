import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@/lib/test-utils";
import { AIMessage } from "./AIMessage";
import type { AIMessage as AIMessageType } from "@/lib/types";

const userMessage: AIMessageType = {
  id: "msg-1",
  role: "user",
  content: "What should I see first in Paris?",
  timestamp: new Date().toISOString(),
};

const assistantMessage: AIMessageType = {
  id: "msg-2",
  role: "assistant",
  content: "I recommend starting with the Eiffel Tower!",
  timestamp: new Date().toISOString(),
  suggestions: ["Tell me more", "Book tickets"],
};

describe("AIMessage", () => {
  it("renders user message content", () => {
    render(<AIMessage message={userMessage} />);
    expect(screen.getByText("What should I see first in Paris?")).toBeInTheDocument();
  });

  it("renders assistant message content", () => {
    render(<AIMessage message={assistantMessage} />);
    expect(screen.getByText("I recommend starting with the Eiffel Tower!")).toBeInTheDocument();
  });

  it("user message is right-aligned (flex-row-reverse)", () => {
    const { container } = render(<AIMessage message={userMessage} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("flex-row-reverse");
  });

  it("assistant message is left-aligned (flex-row)", () => {
    const { container } = render(<AIMessage message={assistantMessage} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("flex-row");
    expect(wrapper.className).not.toContain("flex-row-reverse");
  });

  it("renders suggestion chips for assistant messages", () => {
    render(<AIMessage message={assistantMessage} />);
    expect(screen.getByText("Tell me more")).toBeInTheDocument();
    expect(screen.getByText("Book tickets")).toBeInTheDocument();
  });

  it("calls onSuggestionClick when a suggestion chip is clicked", () => {
    const onSuggestionClick = vi.fn();
    render(<AIMessage message={assistantMessage} onSuggestionClick={onSuggestionClick} />);
    fireEvent.click(screen.getByText("Tell me more"));
    expect(onSuggestionClick).toHaveBeenCalledWith("Tell me more");
  });

  it("does not render suggestion chips for user messages", () => {
    const userWithSuggestions: AIMessageType = {
      ...userMessage,
      suggestions: ["ignored"],
    };
    render(<AIMessage message={userWithSuggestions} />);
    // user messages never render the suggestions block
    expect(screen.queryByText("ignored")).not.toBeInTheDocument();
  });
});
