"use strict";
exports.__esModule = true;
var perf_hooks_1 = require("perf_hooks");
var hashTable_1 = require("./hashTable");
var helpers_1 = require("../helpers");
var constants_1 = require("../constants");
function hashTableReport(size, loadFactor) {
  if (!size || !loadFactor) throw new Error();
  var hashTableWithLinearProbing = new hashTable_1["default"](size),
    queryTime = [];
  //* insert
  var randomLetters = helpers_1.generateRandomWords(size * loadFactor);
  randomLetters.forEach(function (letter, index) {
    hashTableWithLinearProbing.insert(index.toString(), letter);
  });
  //* lookup
  for (var i = 0; i < size * loadFactor; i++) {
    var start = +perf_hooks_1.performance.now().toFixed(16);
    hashTableWithLinearProbing.get(i.toString());
    var end = +perf_hooks_1.performance.now().toFixed(16);
    queryTime.push(end - start);
  }
  console.log(
    "Min query time with " + loadFactor + " load factor:",
    helpers_1.getMin(queryTime)
  );
  console.log(
    "Max query time with " + loadFactor + " load factor:",
    helpers_1.getMax(queryTime)
  );
  console.log(
    "Average query time with " + loadFactor + " load factor:",
    helpers_1.calculateAverage(queryTime)
  );
  console.log(
    "----------------------------------------------------------------"
  );
}
//! 2^10 Hash Table size
console.log("\n", "2^10 Hash Table size");
hashTableReport(constants_1.SIZES.POW_10, constants_1.LOAD_FACTORS[0.5]);
hashTableReport(constants_1.SIZES.POW_10, constants_1.LOAD_FACTORS[0.75]);
hashTableReport(constants_1.SIZES.POW_10, constants_1.LOAD_FACTORS[0.95]);
////
//! 2^14 Hash Table size
console.log("\n", "2^14 Hash Table size");
hashTableReport(constants_1.SIZES.POW_14, constants_1.LOAD_FACTORS[0.5]);
hashTableReport(constants_1.SIZES.POW_14, constants_1.LOAD_FACTORS[0.75]);
hashTableReport(constants_1.SIZES.POW_14, constants_1.LOAD_FACTORS[0.95]);
////
//! 2^18 Hash Table size
console.log("\n", "2^18 Hash Table size");
hashTableReport(constants_1.SIZES.POW_18, constants_1.LOAD_FACTORS[0.5]);
hashTableReport(constants_1.SIZES.POW_18, constants_1.LOAD_FACTORS[0.75]);
hashTableReport(constants_1.SIZES.POW_18, constants_1.LOAD_FACTORS[0.95]);
////
