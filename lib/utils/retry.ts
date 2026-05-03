export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000,
  shouldRetry?: (error: unknown) => boolean
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      // If caller says this error is not retryable, bail immediately
      if (shouldRetry && !shouldRetry(error)) break;
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, baseDelay * 2 ** attempt));
      }
    }
  }
  throw lastError;
}

