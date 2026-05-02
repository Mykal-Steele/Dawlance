import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@/lib/test-utils";
import { Input } from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input id="test" placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("calls onChange when value changes", () => {
    const handler = vi.fn();
    render(<Input id="test" onChange={handler} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });
    expect(handler).toHaveBeenCalledOnce();
  });

  it("shows error message and sets aria-invalid", () => {
    render(<Input id="test-input" error="Required field" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required field");
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not show error message when error is not set", () => {
    render(<Input id="test" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input id="test" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
