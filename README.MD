## Instructions to run exercise files:

- clone the repository
- navigate to the the project directory and run: **npm install**
- after installing of the dependencies is finished, run:
  1. **npm run hashing** to receive results from the first exercise
  2. **npm run bloom-filters** to receive results from the second exercise
  3. **npm run count-min_sketch** to receive results from the third exercise

<br/>

#### NOTE 1: For the implementation details refer to the src folder.

#### NOTE 2: Make sure Node.js is installed

<br/>

## I Hashing:

**NOTE:** time is written in seconds

| Load factor / HT size |                     | 2^10                  | 2^14                  | 2^18                  |
| --------------------- | ------------------- | --------------------- | --------------------- | --------------------- |
| 0.5                   | Min query time:     | 0.0012999773025512695 | 0.0004999637603759766 | 0.0004999637603759766 |
|                       | Max query time:     | 0.04910004138946533   | 0.29329997301101685   | 6.188300013542175     |
|                       | Average query time: | 0.00173202995210886   | 0.0008633422257844359 | 0.0007189389962150017 |
| 0.75                  | Min query time:     | 0.0009999871253967285 | 0.0004999637603759766 | 0.0004999637603759766 |
|                       | Max query time:     | 0.33810001611709595   | 0.29339998960494995   | 14.280799984931946    |
|                       | Average query time: | 0.003777213549862305  | 0.001175130363359737  | 0.0007933307806524681 |
| 0.95                  | Min query time:     | 0.0006999969482421875 | 0.0004999637603759766 | 0.0004999637603759766 |
|                       | Max query time:     | 0.04830002784729004   | 1.76910001039505      | 11.653299987316132    |
|                       | Average query time: | 0.0015998961746631398 | 0.006240295617097143  | 0.030601435926947515  |

<br/>
<br/>

### II Bloom filters:

**Number of inserts that makes the original Bloom filter have the false positive rate f=1%:**

- m = 2^10, k = 4 -> **n = 98** for p = 1%
- m = 2^12, k = 4 -> **n = 390** for p = 1%
- m = 2^16, k = 4 -> **n = 6229** for p = 1%

<br/>

**TABLE 1: False positive rates table:**
| Type of BF / Size | 2^10 | 2^12 | 2^16 |
| ----------------- | ---- | ---- | ---- |
| Original BF | 93.66% | 14.29% | 0% |
| Partitioned BF | 92.84% | 15.64% | 0% |

<br/>

### Discussion:

If we calculate probability of a false positives we will get these results

**TABLE 2: Probability of a false positives table: (n = 1000, k = 4)**
| | 2^10 | 2^12 | 2^16 |
| ----------------- | ---- | ---- | ---- |
| False positive rate: | 92.19% | 15.10% | 0% |

<br/>

By analyzing the False positive rates from the Table 1 and the Table 2 it can be clearly seen that both of the bloom filters perform as expected. Furthermore on the Table 1 we can see that the results are not so different between the two Bloom filters. Both bloom filters perform very well (0% false positive rate) if we allocate enough space (m) and will perform very bad (which is expected) if the allocated space (m) is not enough for the number of items that will be inserted.

Now what is interesting to see is that by increasing number of hash functions we will get worse values for the false positive rates.

**TABLE 3: False positive rates table: (k = 6)**
| Type of BF / Size | 2^10 | 2^12 | 2^16 |
| ----------------- | ---- | ---- | ---- |
| Original BF | 98.1% | 19.42% | 0% |
| Partitioned BF | 98.82% | 19.96% | 0% |

<br/>
<br/>

## Count-min sketch

**Note 1:** For this exercise only these things are done:

1. Filtering the text (words) from the 2000 articles
2. Storing filtered words to the Count-min sketch
3. Storing the count of the 100 words with the highest count

**Note 2:** Count-min sketch was configured to use 5 hash functions

<br/>

| NO. of inserted words | Time needed to insert words into the Count-min sketch | Time needed to find frequencies of the inserted words from the Count-min sketch |
| --------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| 1720691               | 1:32.277 (m:ss.mmm)                                   | 3.059s                                                                          |

<br/>

**Top 10 words with the highest frequency:**

- that -> 30593
- for -> 21693
- mr -> 20575
- he -> 18412
- said -> 18362
- was -> 17627
- with -> 15575
- his -> 13150
- from -> 10544
- but -> 10456

To see the frequencies of the top 100 words run: **npm run count-min-sketch**
