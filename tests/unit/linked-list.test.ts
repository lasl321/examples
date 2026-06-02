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

  it("should convert empty list to iterable", () => {
    const input: number[] = [];

    const actual = Array.from(new List(input));

    expect(actual).toEqual([]);
  });

  it("should convert one item list to iterable", () => {
    const input: number[] = [1000];

    const actual = Array.from(new List(input));

    expect(actual).toEqual([1000]);
  });

  it("should convert two item list to iterable", () => {
    const input: number[] = [1000, 2000];

    const actual = Array.from(new List(input));

    expect(actual).toEqual([1000, 2000]);
  });

  it("should add append item", () => {
    const actual = new List<number>([]);
    actual.append(1000);

    expect(actual.size).toBe(1);
    expect(actual.items?.value).toBe(1000);
  });

  it("should pop last item when resulting list is empty", () => {
    const actual = new List<number>([1000]);
    const value = actual.pop();

    expect(actual.size).toBe(0);
    expect(actual.items).toBeUndefined();
    expect(value).toBe(1000);
  });

  it("should pop last item when resulting list has one item", () => {
    const actual = new List<number>([1000, 2000]);
    const value = actual.pop();

    expect(actual.size).toBe(1);
    expect(actual.items?.value).toBe(1000);
    expect(value).toBe(2000);
  });

  it("should pop last item when resulting list has two items", () => {
    const actual = new List<number>([1000, 2000, 3000]);
    const value = actual.pop();

    expect(actual.size).toBe(2);
    expect(actual.items?.value).toBe(1000);
    expect(actual.items?.next?.value).toBe(2000);
    expect(value).toBe(3000);
  });

  // TODO handle multiple pop executions by moving last pointer; need doubly-linked list
  it.skip("should allow multiple pop executions", () => {
    const actual = new List<number>([1000, 2000, 3000]);
    actual.pop();
    const value = actual.pop();

    expect(actual.size).toBe(1);
    expect(actual.items?.value).toBe(1000);
    expect(actual.items?.next).toBeUndefined();
    expect(value).toBe(2000);
  });
});
