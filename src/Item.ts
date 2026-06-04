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

export default Item;
