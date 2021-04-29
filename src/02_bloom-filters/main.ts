import { BloomFilter, PartitionedBloomFilter } from "bloom-filters";

import { generateRandomWords } from "../helpers";
import { SIZES } from "../constants";

const randomWords = generateRandomWords(1000); //* Generating random words which will be inserted to the Bloom Filter
const randomWordsForLookup = generateRandomWords(5000); //* Generating random words which will be used for lookup

//* Initializing Bloom Filters
const bloomFilter1 = new BloomFilter(SIZES.POW_10, 6), //* n = 98 for p = 1%
  bloomFilter2 = new BloomFilter(SIZES.POW_12, 6), //* n = 390 for p = 1%
  bloomFilter3 = new BloomFilter(SIZES.POW_16, 6); //* n = 6229 for p = 1%

const partitionedBloomFilter1 = new PartitionedBloomFilter(
    SIZES.POW_10,
    6,
    0.5
  ),
  partitionedBloomFilter2 = new PartitionedBloomFilter(SIZES.POW_12, 6, 0.5),
  partitionedBloomFilter3 = new PartitionedBloomFilter(SIZES.POW_16, 6, 0.5);
////

//* Initializing falsePositives object which will be later used for storing false positive values for each Bloom Filter
const falsePositives = {
  bloomFilter1: 0,
  bloomFilter2: 0,
  bloomFilter3: 0,
  partitionedBloomFilter1: 0,
  partitionedBloomFilter2: 0,
  partitionedBloomFilter3: 0,
};

randomWords.forEach((word) => {
  bloomFilter1.add(word);
  bloomFilter2.add(word);
  bloomFilter3.add(word);

  partitionedBloomFilter1.add(word);
  partitionedBloomFilter2.add(word);
  partitionedBloomFilter3.add(word);
});

/*
 * If randomWords array doesn't contain currently iterated word from the randomWordsForLookup
 * check the lookup response from the bloom filters and update falsePositives ....
 */
randomWordsForLookup.forEach((word) => {
  if (!randomWords.includes(word)) {
    if (bloomFilter1.has(word)) falsePositives.bloomFilter1++;

    if (bloomFilter2.has(word)) falsePositives.bloomFilter2++;

    if (bloomFilter3.has(word)) falsePositives.bloomFilter3++;

    if (partitionedBloomFilter1.has(word))
      falsePositives.partitionedBloomFilter1++;

    if (partitionedBloomFilter2.has(word))
      falsePositives.partitionedBloomFilter2++;

    if (partitionedBloomFilter3.has(word))
      falsePositives.partitionedBloomFilter3++;
  }
});

console.log(falsePositives);
