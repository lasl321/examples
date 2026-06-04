import { it, expect, describe } from "vitest";
import LinkedList from "../../src/LinkedList.ts";

describe("linked-list", () => {
  describe("constructor", () => {
    it("should handle empty list", () => {
      const actual = new LinkedList([]);

      expect(actual.size).toBe(0);
      expect(actual.items).toBeUndefined();
      expect(actual.first).toBeUndefined();
      expect(actual.last).toBeUndefined();
    });

    it("should handle one-item list", () => {
      const actual = new LinkedList([1000]);

      expect(actual.size).toBe(1);
      expect(actual.items?.value).toBe(1000);
      expect(actual.items?.next).toBeUndefined();
      expect(actual.first).toBe(1000);
      expect(actual.last).toBe(1000);
    });

    it("should handle two-item list", () => {
      const actual = new LinkedList([1000, 2000]);

      expect(actual.size).toBe(2);
      expect(actual.items?.value).toBe(1000);
      expect(actual.items?.next).not.toBeUndefined();
      expect(actual.items?.next?.value).toBe(2000);
      expect(actual.first).toBe(1000);
      expect(actual.last).toBe(2000);
    });
  });

  describe("iterator", () => {
    it("should convert empty list to iterable", () => {
      const input: number[] = [];

      const actual = Array.from(new LinkedList(input));

      expect(actual).toEqual([]);
    });

    it("should convert one item list to iterable", () => {
      const input: number[] = [1000];

      const actual = Array.from(new LinkedList(input));

      expect(actual).toEqual([1000]);
    });

    it("should convert two item list to iterable", () => {
      const input: number[] = [1000, 2000];

      const actual = Array.from(new LinkedList(input));

      expect(actual).toEqual([1000, 2000]);
    });
  });

  describe("append", () => {
    it("should append item into empty list", () => {
      const list = new LinkedList<number>([]);
      const actual = list.append(1000);

      expect(actual).toBe(list);
      expect(list.size).toBe(1);
      expect(list.first).toBe(1000);
      expect(list.last).toBe(1000);
    });

    it("should append item into list", () => {
      const list = new LinkedList<number>([1000]);
      const actual = list.append(2000);

      expect(actual).toBe(list);
      expect(list.size).toBe(2);
      expect(list.first).toBe(1000);
      expect(list.last).toBe(2000);
    });
  });

  describe("pop", () => {
    it("should allow pop on empty list", () => {
      const list = new LinkedList<number>([]);
      const actual = list.pop();

      expect(actual).toBeUndefined();
      expect(list.size).toBe(0);
      expect(list.first).toBeUndefined();
      expect(list.last).toBeUndefined();
    });

    it("should pop last item when resulting list is empty", () => {
      const list = new LinkedList<number>([1000]);
      const actual = list.pop();

      expect(actual).toBe(1000);
      expect(list.size).toBe(0);
      expect(list.first).toBeUndefined();
      expect(list.last).toBeUndefined();
    });

    it("should pop last item when resulting list has one item", () => {
      const list = new LinkedList<number>([1000, 2000]);
      const actual = list.pop();

      expect(actual).toBe(2000);
      expect(list.size).toBe(1);
      expect(list.first).toBe(1000);
      expect(list.last).toBe(1000);
    });

    it("should pop last item when resulting list has two items", () => {
      const list = new LinkedList<number>([1000, 2000, 3000]);
      const actual = list.pop();

      expect(actual).toBe(3000);
      expect(list.size).toBe(2);
      expect(list.first).toBe(1000);
      expect(list.last).toBe(2000);
    });

    // TODO handle multiple pop executions by moving last pointer; need doubly-linked list
    it("should allow multiple pop executions", () => {
      const list = new LinkedList<number>([1000, 2000, 3000]);

      const actual1 = list.pop();
      const actual2 = list.pop();

      expect(actual1).toBe(3000);
      expect(actual2).toBe(2000);
      expect(list.size).toBe(1);
      expect(list.first).toBe(1000);
      expect(list.last).toBe(1000);
    });
  });

  describe("equals", () => {
    it("should handle empty lists", () => {
      const list1 = new LinkedList([]);
      const list2 = new LinkedList([]);

      expect(list1.equals(list2)).toBeTruthy();
    });

    it("should detect one list is empty", () => {
      const empty: number[] = [];
      const list1 = new LinkedList(empty);
      const list2 = new LinkedList([1000]);

      expect(list1.equals(list2)).toBeFalsy();
    });

    it("should handle lists of the same size", () => {
      const list1 = new LinkedList([1000, 2000]);
      const list2 = new LinkedList([1000, 2000]);

      expect(list1.equals(list2)).toBeTruthy();
    });

    it("should detect lists of different sizes", () => {
      const list1 = new LinkedList([1000, 2000, 3000]);
      const list2 = new LinkedList([1000, 2000]);

      expect(list1.equals(list2)).toBeFalsy();
    });

    it("should detect lists with different contents", () => {
      const list1 = new LinkedList([1000, 2000, 3000]);
      const list2 = new LinkedList([1000, 2000, 4000]);

      expect(list1.equals(list2)).toBeFalsy();
    });
  });
});
