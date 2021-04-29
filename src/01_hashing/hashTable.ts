export default class HashTableWithLP<T> {
  private readonly keys: string[];
  private readonly values: T[] = [];

  constructor(size: number) {
    this.keys = new Array(size);
  }

  insert(key: string, data: T) {
    let pos = this.hash(key);

    if (!this.keys[pos]) {
      this.keys[pos] = key;
      this.values[pos] = data;
    } else {
      while (this.keys[pos]) {
        pos++;
      }

      this.keys[pos] = key;
      this.values[pos] = data;
    }
  }

  get(key: string) {
    const hash = this.hash(key);

    if (hash > -1) {
      for (let i = hash; this.keys[i] !== undefined; i++) {
        if (this.keys[i] === key) return this.values[i];
      }
    }

    return undefined;
  }

  private hash(key: string) {
    const H = 37;
    let total = 0;

    for (var i = 0; i < key.length; i++) {
      total += H * total + key.charCodeAt(i);
    }

    total %= this.keys.length;
    if (total < 1) this.keys.length - 1;

    return total;
  }
}
