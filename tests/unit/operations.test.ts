import { describe, expect, it } from "vitest";

function add(a: number, b: number): number {
  return a + b;
}

describe("operations", () => {
  it("add", () => {
    const actual = add(1, 2);

    expect(actual).toBe(3);
  });
});
