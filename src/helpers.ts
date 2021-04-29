function generateRandomLetters(length: number = 10) {
  const result = [],
    characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * characters.length))
    );
  }

  return result.join("");
}

export function generateRandomWords(size: number) {
  const randomLetters = [];

  for (let i = 0; i < size; i++) {
    randomLetters.push(generateRandomLetters());
  }
  return randomLetters;
}

export function getMax(arr: number[]) {
  let len = arr.length;
  let max = -Infinity;

  while (len--) {
    max = arr[len] > max ? arr[len] : max;
  }

  return max;
}

export function getMin(arr: number[]) {
  let len = arr.length;
  let min = Infinity;

  while (len--) {
    min = arr[len] < min ? arr[len] : min;
  }

  return min;
}

export function getAverage(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
