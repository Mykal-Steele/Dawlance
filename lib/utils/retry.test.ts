import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { retryWithBackoff } from "./retry";

describe("retryWithBackoff", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the result on first successful call", async () => {
    const fn = vi.fn().mockResolvedValue("success");
    const result = await retryWithBackoff(fn, 3, 0);
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries on failure and succeeds on second attempt", async () => {
    const fn = vi.fn().mockRejectedValueOnce(new Error("fail")).mockResolvedValue("ok");

    const promise = retryWithBackoff(fn, 3, 0);
    // Advance timers so the delay resolves
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("retries up to maxRetries times then throws", async () => {
    const err = new Error("always fails");
    const fn = vi.fn().mockRejectedValue(err);

    let caught: unknown;
    // Attach catch before advancing timers to avoid unhandled rejection
    const promise = retryWithBackoff(fn, 3, 0).catch((e) => {
      caught = e;
    });
    await vi.runAllTimersAsync();
    await promise;

    expect((caught as Error).message).toBe("always fails");
    // 1 initial attempt + 3 retries = 4 total
    expect(fn).toHaveBeenCalledTimes(4);
  });

  it("throws immediately with zero retries", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("no retry"));
    await expect(retryWithBackoff(fn, 0, 0)).rejects.toThrow("no retry");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("preserves the original error on final throw", async () => {
    const original = new Error("original error");
    const fn = vi.fn().mockRejectedValue(original);

    let caught: unknown;
    // Attach catch before advancing timers to avoid unhandled rejection
    const promise = retryWithBackoff(fn, 1, 0).catch((e) => {
      caught = e;
    });
    await vi.runAllTimersAsync();
    await promise;

    expect(caught).toBe(original);
  });
});
