import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@/lib/test-utils";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders label text", () => {
    render(<Chip>Museums</Chip>);
    expect(screen.getByText("Museums")).toBeInTheDocument();
  });

  it("reflects unselected state via aria-checked", () => {
    render(<Chip selected={false}>Museums</Chip>);
    expect(screen.getByRole("checkbox", { name: /museums/i })).toHaveAttribute(
      "aria-checked",
      "false"
    );
  });

  it("reflects selected state via aria-checked", () => {
    render(<Chip selected>Museums</Chip>);
    expect(screen.getByRole("checkbox", { name: /museums/i })).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("calls onClick when clicked", () => {
    const handler = vi.fn();
    render(<Chip onClick={handler}>Museums</Chip>);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handler).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Chip disabled>Museums</Chip>);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });
});
