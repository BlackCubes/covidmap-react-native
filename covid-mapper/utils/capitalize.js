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
