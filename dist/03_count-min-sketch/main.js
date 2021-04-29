var csv = require("csv-parser");
var fs = require("fs");
var CountMinSketch = require("bloom-filters").CountMinSketch;
var sketch,
  count = 0,
  wordsCount = {},
  maxWordFrequency = [];
var processedText = [];
//* Filtering the words from the text (content of the article)
function processText(text) {
  var processedText = text
    .split(" ")
    .map(function (word) {
      return (
        word
          .toLowerCase()
          //* If words contain any symbol from the below array, remove it
          .replace(/[,.!?’'"”“()’:]/g, function (word) {
            return [
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
              : word;
          })
      );
    })
    //* Filter out unnecessary words
    .filter(function (word) {
      return (
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
    });
  count += processedText.length;
  return processedText;
}
function calculateHighestWordsFrequencies() {
  while (maxWordFrequency.length <= 100) {
    var highest = { count: -Infinity };
    for (var key in wordsCount)
      if (highest.count < wordsCount[key])
        highest = { key: key, count: wordsCount[key] };
    delete wordsCount[highest.key];
    maxWordFrequency.push(highest);
  }
}
fs.createReadStream("dist/03_count-min-sketch/articles.csv")
  .pipe(csv())
  .on("data", function (_a) {
    var content = _a.content;
    return processedText.push.apply(processedText, processText(content));
  })
  .on("end", function () {
    console.log(
      "Inserting " + processedText.length + " words into the Count-min sketch"
    );
    console.time("Inserting words into the Count-min sketch");
    //* Initializing Count-min sketch with 5 hash functions
    sketch = new CountMinSketch(count, 5);
    processedText.forEach(function (word) {
      return sketch.update(word);
    });
    console.timeEnd("Inserting words into the Count-min sketch");
    console.log(
      "__________________________________________________________________________"
    );
    //* Since Set can't contain duplicate values with this initialization
    //* we get the unique words
    var uniqueWords = new Set(processedText);
    console.time(
      "Finding frequencies of inserted words into the Count-min sketch"
    );
    //* Retrieving the frequencies of the inserted words
    uniqueWords.forEach(function (word) {
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
