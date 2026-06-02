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

  public set next(item: Item<T> | undefined) {
    this.#next = item;
  }
}

class List<T> {
  #items: Item<T> | undefined;
  #size: number;
  #last: Item<T> | undefined;

  constructor(items: readonly T[]) {
    this.#size = 0;
    this.#last = undefined;

    if (!items.length) {
      return;
    }

    let index = items.length - 1;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let value: T = items[index]!;
    let current: Item<T> | undefined = new Item(value);
    this.#last = current;
    this.#size = this.#size + 1;

    index = index - 1;
    while (index >= 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value = items[index]!;

      current = new Item(value, current);
      this.#size = this.#size + 1;

      index = index - 1;
    }

    this.#items = current;
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

  public append(value: T): this {
    const newLast = new Item(value);
    if (this.#last) {
      this.#last.next = newLast;
    } else {
      this.#items = newLast;
    }
    this.#last = newLast;
    this.#size = this.#size + 1;

    return this;
  }
}

export { Item, List };
