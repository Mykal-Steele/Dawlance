type CircuitState = "closed" | "open" | "half-open";

export class CircuitBreaker {
  private state: CircuitState = "closed";
  private failureCount = 0;
  private openedAt: number | null = null;
  private readonly failureThreshold: number;
  private readonly recoveryMs: number;

  constructor(failureThreshold = 3, recoveryMs = 60_000) {
    this.failureThreshold = failureThreshold;
    this.recoveryMs = recoveryMs;
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "open") {
      if (Date.now() - (this.openedAt ?? Date.now()) > this.recoveryMs) {
        this.state = "half-open";
      } else {
        throw new Error("Circuit breaker is open");
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failureCount = 0;
    this.state = "closed";
  }

  private onFailure(): void {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold || this.state === "half-open") {
      this.state = "open";
      this.openedAt = Date.now();
    }
  }

  get isOpen(): boolean {
    return this.state === "open";
  }
}

// Opens after 3 consecutive failures, recovers after 1 minute
export const geminiCircuitBreaker = new CircuitBreaker();
