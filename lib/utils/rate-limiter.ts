export class RateLimiter {
  private readonly queue: Array<() => void> = [];
  private lastRequestTime = 0;
  private readonly minIntervalMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.minIntervalMs = windowMs / maxRequests;
  }

  throttle(): Promise<void> {
    return new Promise((resolve) => {
      this.queue.push(resolve);
      this.processQueue();
    });
  }

  private processQueue(): void {
    if (this.queue.length === 0) return;
    const now = Date.now();
    const delay = Math.max(0, this.minIntervalMs - (now - this.lastRequestTime));
    setTimeout(() => {
      const resolve = this.queue.shift();
      if (resolve) {
        this.lastRequestTime = Date.now();
        resolve();
        this.processQueue();
      }
    }, delay);
  }
}

// 5 AI requests per minute (12s minimum interval between requests)
export const aiRateLimiter = new RateLimiter(5, 60_000);
