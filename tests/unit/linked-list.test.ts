import { it, expect, describe } from "vitest";
import { List } from "../../src/linked-list.ts";

describe("linked-list", () => {
  it("should handle empty list", () => {
    const input: number[] = [];
    const actual = new List(input);

    expect(actual.size).toBe(0);
    expect(actual.items).toBeUndefined();
  });

  it("should handle one-item list", () => {
    const input: number[] = [1000];
    const actual = new List(input);

    expect(actual.size).toBe(1);
    expect(actual.items?.value).toBe(1000);
    expect(actual.items?.next).toBeUndefined();
  });

  it("should handle two-item list", () => {
    const input: number[] = [1000, 2000];
    const actual = new List(input);

    expect(actual.size).toBe(2);
    expect(actual.items?.value).toBe(1000);
    expect(actual.items?.next?.value).toBe(2000);
    expect(actual.items?.next?.next).toBeUndefined();
  });
});
