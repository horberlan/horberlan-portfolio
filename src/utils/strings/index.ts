/**
 * Splits a string into two halves
 * @param {string} input - The string to be divided.
 * @returns {string[]} An array with left and right halves
 */
function twoAndAHalfWords(input: string): string[] {
  if (typeof input !== "string") return [input];

  const words = input.split(" ");
  if (words.length <= 2) return [input];

  const secondWordIndex = 2;
  const firstPart = words.slice(0, secondWordIndex).join(" ");
  const secondPart = words.slice(secondWordIndex).join(" ");

  return [firstPart, secondPart];
}

export { twoAndAHalfWords };
