class Item<T> {
  #value: T;
  #next: Item<T> | undefined;
  #previous: Item<T> | undefined;

  constructor(value: T, next?: Item<T>, previous?: Item<T>) {
    this.#value = value;
    this.#next = next;
    this.#previous = previous;
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

  public get previous(): Item<T> | undefined {
    return this.#previous;
  }

  public set previous(item: Item<T> | undefined) {
    this.#previous = item;
  }

  /**
   * cleanup
   */
  public cleanup() {
    this.#next = undefined;
    this.#previous = undefined;
  }
}

class List<T> {
  #items: Item<T> | undefined;
  #size: number;
  #last: Item<T> | undefined;

  constructor(items: readonly T[]) {
    this.#items = undefined;
    this.#size = 0;
    this.#last = undefined;

    if (!items.length) {
      return;
    }

    let index = items.length - 1;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let value: T = items[index]!;
    let recent: Item<T> | undefined = new Item(value);
    this.#last = recent;
    this.#size = 1;

    index = index - 1;
    while (index >= 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value = items[index]!;

      const newItem: Item<T> = new Item<T>(value, recent);
      recent.previous = newItem;
      recent = newItem;

      this.#size = this.#size + 1;

      index = index - 1;
    }

    this.#items = recent;
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

  /**
   * Add a new value to the list
   *
   * @param value a value
   * @returns the current instance
   */
  public append(value: T): this {
    const newLast = new Item(value);
    const previousLast = this.#last;

    if (previousLast) {
      previousLast.next = newLast;
      newLast.previous = previousLast;

      this.#last = newLast;
      this.#size = this.#size + 1;
    } else {
      this.#items = newLast;
      this.#size = 1;
      this.#last = newLast;
    }

    return this;
  }

  /**
   * Remove the last item in the list and return it
   *
   * @remarks
   * Returns `undefined` if the list is empty
   */
  public pop(): T | undefined {
    const previousLast = this.#last;
    if (!previousLast) {
      return undefined;
    }

    const value = previousLast.value;

    const newLast = previousLast.previous;
    if (newLast) {
      newLast.next = undefined;

      this.#size = this.#size - 1;
      this.#last = newLast;
    } else {
      this.#size = 0;
      this.#last = undefined;
      this.#items = undefined;
    }

    previousLast.cleanup();

    return value;
  }

  /**
   * Return the first value in the list
   *
   * @remark
   * Returns `undefined` if the list is empty
   */
  public get first(): T | undefined {
    return this.#items?.value;
  }

  /**
   * Return the last value in the list
   *
   * @remark
   * Returns `undefined` if the list is empty
   */
  public get last(): T | undefined {
    return this.#last?.value;
  }

  /**
   * Checks for value equality
   *
   * @param other another list
   * @returns `true` if the lists are value equal
   */
  public equals(other: List<T>): boolean {
    if (this.#size !== other.#size) {
      return false;
    }

    let lhs = this.#last;
    let rhs = other.#last;

    while (lhs !== undefined && rhs !== undefined) {
      if (lhs.value !== rhs.value) {
        return false;
      }

      lhs = lhs.previous;
      rhs = rhs.previous;
    }

    return true;
  }
}

export { Item, List };
