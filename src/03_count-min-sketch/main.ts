const csv = require("csv-parser");
const fs = require("fs");
const { CountMinSketch } = require("bloom-filters");

let sketch: typeof CountMinSketch,
  count = 0,
  wordsCount = {},
  maxWordFrequency = [];
const processedText: string[] = [];

//* Filtering the words from the text (content of the article)
function processText(text: string) {
  const processedText = text
    .split(" ")
    .map((word) =>
      word
        .toLowerCase()
        //* If words contain any symbol from the below array, remove it
        .replace(/[,.!?’'"”“()’:]/g, (word) =>
          [
            ".",
            ",",
            "?",
            "!",
            "’",
            "'",
            "”",
            "“",
            "(",
            ")",
            "’",
            '"',
            ":",
          ].includes(word)
            ? ""
            : word
        )
    )
    //* Filter out unnecessary words
    .filter(
      (word) =>
        ![
          "a",
          "an",
          "as",
          "of",
          "in",
          "it",
          "to",
          "and",
          "the",
          "off",
          "no",
          "on",
          "is",
          "by",
          "if",
          "at",
          "-",
          "—",
          "\n",
        ].includes(word) && word.length
    );

  count += processedText.length;

  return processedText;
}

function calculateHighestWordsFrequencies() {
  while (maxWordFrequency.length <= 100) {
    let highest: any = { count: -Infinity };

    for (const key in wordsCount)
      if (highest.count < wordsCount[key])
        highest = { key, count: wordsCount[key] };

    delete wordsCount[highest.key];
    maxWordFrequency.push(highest);
  }
}

fs.createReadStream("src/03_count-min-sketch/articles.csv")
  .pipe(csv())
  .on("data", ({ content }: { content: string }) =>
    processedText.push(...processText(content))
  )
  .on("end", () => {
    console.log(
      `Inserting ${processedText.length} words into the Count-min sketch`
    );
    console.time("Inserting words into the Count-min sketch");

    //* Initializing Count-min sketch with 5 hash functions
    sketch = new CountMinSketch(count, 5);

    processedText.forEach((word) => sketch.update(word));

    console.timeEnd("Inserting words into the Count-min sketch");
    console.log(
      "__________________________________________________________________________"
    );

    //* Since Set can't contain duplicate values with this initialization
    //* we get the unique words
    const uniqueWords = new Set(processedText);

    console.time(
      "Finding frequencies of inserted words into the Count-min sketch"
    );

    //* Retrieving the frequencies of the inserted words
    uniqueWords.forEach((word) => {
      wordsCount[word] = sketch.count(word);
    });

    console.timeEnd(
      "Finding frequencies of inserted words into the Count-min sketch"
    );
    console.log(
      "__________________________________________________________________________"
    );

    calculateHighestWordsFrequencies();

    console.log(maxWordFrequency);
  });
