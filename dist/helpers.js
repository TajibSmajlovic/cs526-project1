"use strict";
exports.__esModule = true;
exports.calculateAverage = exports.getMin = exports.getMax = exports.generateRandomWords = void 0;
function generateRandomLetters(length) {
  if (length === void 0) {
    length = 10;
  }
  var result = [],
    characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * characters.length))
    );
  }
  return result.join("");
}
function generateRandomWords(size) {
  var randomLetters = [];
  for (var i = 0; i < size; i++) {
    randomLetters.push(generateRandomLetters());
  }
  return randomLetters;
}
exports.generateRandomWords = generateRandomWords;
function getMax(arr) {
  var len = arr.length;
  var max = -Infinity;
  while (len--) {
    max = arr[len] > max ? arr[len] : max;
  }
  return max;
}
exports.getMax = getMax;
function getMin(arr) {
  var len = arr.length;
  var min = Infinity;
  while (len--) {
    min = arr[len] < min ? arr[len] : min;
  }
  return min;
}
exports.getMin = getMin;
function calculateAverage(arr) {
  return (
    arr.reduce(function (a, b) {
      return a + b;
    }, 0) / arr.length
  );
}
exports.calculateAverage = calculateAverage;
