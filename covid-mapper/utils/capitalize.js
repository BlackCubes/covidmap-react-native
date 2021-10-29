/**
 * Takes in the word and a boolean. Checks to see if the given word is a string, and if not,
 * then return an empty string. If the second parameter is true, then it capitalizes more
 * than one word i.e. new york -> New York. Otherwise, it returns the capitalized word.
 * @param {String} word
 * @param {Boolean} wantMoreThanOneCapitalWord Default of false.
 * @returns {String} A string of capitalize word(s).
 */
const capitalize = (word, wantMoreThanOneCapitalWord = false) => {
  if (typeof word !== "string") return "";

  if (wantMoreThanOneCapitalWord) {
    const multiWords = word.split(" ");

    return multiWords
      .map((wordVal) => wordVal.charAt(0).toUpperCase() + wordVal.slice(1))
      .join(" ");
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
};

export default capitalize;
