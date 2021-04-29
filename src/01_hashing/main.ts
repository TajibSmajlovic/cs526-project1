import { performance } from "perf_hooks";

import HashTableWithLP from "./hashTable";
import { getMax, getAverage, generateRandomWords, getMin } from "../helpers";
import { LOAD_FACTORS, SIZES } from "../constants";

function hashTableReport(size: number, loadFactor: number) {
  if (!size || !loadFactor) throw new Error();

  const hashTableWithLinearProbing = new HashTableWithLP<string>(size),
    queryTime: number[] = [];

  //* insert
  const randomLetters = generateRandomWords(size * loadFactor);

  randomLetters.forEach((letter, index) => {
    hashTableWithLinearProbing.insert(index.toString(), letter);
  });

  //* lookup
  for (let i = 0; i < size * loadFactor; i++) {
    const start = +performance.now().toFixed(16);

    hashTableWithLinearProbing.get(i.toString());

    const end = +performance.now().toFixed(16);

    queryTime.push(end - start);
  }

  console.log(
    `Min query time with ${loadFactor} load factor:`,
    getMin(queryTime)
  );
  console.log(
    `Max query time with ${loadFactor} load factor:`,
    getMax(queryTime)
  );
  console.log(
    `Average query time with ${loadFactor} load factor:`,
    getAverage(queryTime)
  );
  console.log(
    "----------------------------------------------------------------"
  );
}

//! 2^10 Hash Table size
console.log("\n", "2^10 Hash Table size");
hashTableReport(SIZES.POW_10, LOAD_FACTORS[0.5]);
hashTableReport(SIZES.POW_10, LOAD_FACTORS[0.75]);
hashTableReport(SIZES.POW_10, LOAD_FACTORS[0.95]);
////

//! 2^14 Hash Table size
console.log("\n", "2^14 Hash Table size");
hashTableReport(SIZES.POW_14, LOAD_FACTORS[0.5]);
hashTableReport(SIZES.POW_14, LOAD_FACTORS[0.75]);
hashTableReport(SIZES.POW_14, LOAD_FACTORS[0.95]);
////

//! 2^18 Hash Table size
console.log("\n", "2^18 Hash Table size");
hashTableReport(SIZES.POW_18, LOAD_FACTORS[0.5]);
hashTableReport(SIZES.POW_18, LOAD_FACTORS[0.75]);
hashTableReport(SIZES.POW_18, LOAD_FACTORS[0.95]);
////
