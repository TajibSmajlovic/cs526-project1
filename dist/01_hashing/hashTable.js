"use strict";
exports.__esModule = true;
var HashTableWithLP = /** @class */ (function () {
  function HashTableWithLP(size) {
    this.values = [];
    this.keys = new Array(size);
  }
  HashTableWithLP.prototype.insert = function (key, data) {
    var pos = this.hash(key);
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
  };
  HashTableWithLP.prototype.get = function (key) {
    var hash = this.hash(key);
    if (hash > -1) {
      for (var i = hash; this.keys[i] !== undefined; i++) {
        if (this.keys[i] === key) return this.values[i];
      }
    }
    return undefined;
  };
  HashTableWithLP.prototype.hash = function (key) {
    var H = 37;
    var total = 0;
    for (var i = 0; i < key.length; i++) {
      total += H * total + key.charCodeAt(i);
    }
    total %= this.keys.length;
    if (total < 1) this.keys.length - 1;
    return total;
  };
  return HashTableWithLP;
})();
exports["default"] = HashTableWithLP;
