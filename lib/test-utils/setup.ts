import "@testing-library/jest-dom";
import { afterEach, beforeAll, afterAll, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "@/lib/mocks/server";

// Zustand persist middleware (v5) calls window.localStorage which happy-dom
// doesn't expose as a fully functional Storage object in the vitest environment.
const buildLocalStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = String(value); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] ?? null,
  };
};

const localStorageMock = buildLocalStorageMock();
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
});

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
beforeEach(() => {
  localStorageMock.clear();
});
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
