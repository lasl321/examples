class Item<T> {
  #value: T;
  #next: Item<T> | undefined;

  constructor(value: T, next?: Item<T>) {
    this.#value = value;
    this.#next = next;
  }

  public get value(): T {
    return this.#value;
  }

  public get next(): Item<T> | undefined {
    return this.#next;
  }
}

class List<T> {
  #items: Item<T> | undefined;
  #size: number;

  constructor(items: readonly T[]) {
    this.#size = 0;

    if (!items.length) {
      return;
    }

    let index = items.length - 1;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let value: T = items[index]!;
    let last: Item<T> | undefined = new Item(value);
    this.#size = this.#size + 1;

    index = index - 1;
    while (index >= 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value = items[index]!;

      last = new Item(value, last);
      this.#size = this.#size + 1;

      index = index - 1;
    }

    this.#items = last;
  }

  public get items(): Item<T> | undefined {
    return this.#items;
  }

  public get size(): number {
    return this.#size;
  }

  *[Symbol.iterator]() {
    let item: Item<T> | undefined = this.#items;
    while (item) {
      yield item.value;
      item = item.next;
    }
  }
}

export { Item, List };
