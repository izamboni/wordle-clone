import { useState } from "react";

/**
 * The `useWordOfTheDay` function is a custom hook in TypeScript that manages the state and logic for a
 * word guessing game.
 * @param {string} [path] - The `path` parameter is an optional string that represents the path for
 * fetching the word of the day. It can have two possible values: "random" or "today". If the value is
 * "random", the word of the day will be fetched randomly. If the value is "today", the
 * @returns The function `useWordOfTheDay` returns an object with the following properties and methods:
 */
const useWordOfTheDay = (path?: string) => {
  const wordOfTheDayUrl = "https://words.dev-apis.com/word-of-the-day";
  const chekValidWordUrl = "https://words.dev-apis.com/validate-word";

  const [index, setIndex] = useState(0);

  const [word, setWord] = useState<string[][]>([[], [], [], [], [], []]);

  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);

  const wrongLetter = "bg-gray-400";
  const correctLetter = "bg-lime-500";
  const almostLetter = "bg-amber-400";

  const [bgColors, setBgColors] = useState<string[][]>([
    [
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
    ],
    [
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
    ],
    [
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
    ],
    [
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
    ],
    [
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
    ],
    [
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
      "bg-transparent",
    ],
  ]);

  const [keyboardColors, setKeyboardColors] = useState<{
    [key: string]: string;
  }>({});

  const [wordOfTheDay, setWordOfTheDay] = useState("");

  /**
   * The function `addLetter` adds a letter to a word if the game is not over and the word's length is
   * less than 5.
   * @param {string} letter - The parameter "letter" is a string that represents a letter that needs to
   * be added to the word.
   * @returns The function `addLetter` does not have a return statement. Therefore, it will implicitly
   * return `undefined`.
   */
  const addLetter = (letter: string) => {
    if (gameOver) return;
    const aux = [...word];
    if (word[index].length < 5) aux[index].push(letter);
    setWord(aux);
  };
  /**
   * The function `removeLetter` removes the last letter from a word if the game is not over.
   * @returns The function `removeLetter` does not have an explicit return statement. Therefore, it
   * will implicitly return `undefined`.
   */
  const removeLetter = () => {
    if (gameOver) return;
    const aux = [...word];
    if (word[index].length > 0) aux[index].pop();
    setWord(aux);
  };

  const win = () => {
    const auxBg = [...bgColors];
    auxBg[index].forEach((_, i) => (auxBg[index][i] = correctLetter));
    setBgColors(auxBg);
    setGameOver(true);
    setWinner(true);
    if (path === "today") {
      const today = new Date();
      localStorage.setItem(
        "lastComplete",
        `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
      );
    }
    console.log("You Win!");
  };
  /**
   * The `colorTest` function iterates through each letter in a word and sets the corresponding color
   * based on whether it matches the letter in the word of the day.
   */
  const colorTest = () => {
    let foundIndex: boolean[] = [];
    const auxKeyColors = { ...keyboardColors };

    const colorSetter = (
      letter: string,
      color: string,
      letterIndex: number,
      posIndex: number
    ) => {
      const auxBg = [...bgColors];
      auxBg[index][letterIndex] = color;
      setBgColors(auxBg);
      if (posIndex !== -1) foundIndex[posIndex] = true;
      if (
        color === wrongLetter &&
        (auxKeyColors[letter.toLowerCase()] !== correctLetter ||
          auxKeyColors[letter.toLowerCase()] !== almostLetter)
      )
        auxKeyColors[letter.toLowerCase()] = color;
      else if (
        color === almostLetter &&
        auxKeyColors[letter.toLowerCase()] !== correctLetter
      )
        auxKeyColors[letter.toLowerCase()] = color;
      else auxKeyColors[letter.toLowerCase()] = color;
      return true;
    };

    word[index].forEach((letter, i) => {
      let found = false;
      for (let j = 0; j < wordOfTheDay.length; j++) {
        const letterToCompare = wordOfTheDay.charAt(j);
        if (letter.toLowerCase() === letterToCompare.toLowerCase() && i === j) {
          found = colorSetter(letter, correctLetter, i, j);
        } else if (
          letter.toLowerCase() === letterToCompare.toLowerCase() &&
          !found &&
          !foundIndex[j]
        ) {
          found = colorSetter(letter, almostLetter, i, j);
        }
      }
      if (!found) {
        colorSetter(letter, wrongLetter, i, -1);
      }
    });
    setKeyboardColors(auxKeyColors);
    if (index < 5) setIndex((prev) => prev + 1);
    else {
      if (path === "today") {
        const today = new Date();
        localStorage.setItem(
          "lastComplete",
          `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        );
      }
      setGameOver(true);
    }
  };

  /**
   * The function `handleEnter` checks if a word has a length of 5 characters, sends a request to
   * validate the word, and performs different actions based on the response.
   * @returns The function `handleEnter` does not have an explicit return statement. Therefore, it will
   * implicitly return `undefined`.
   */
  const handleEnter = () => {
    if (gameOver) return;
    if (word[index].length === 5) {
      let res = "";

      word[index].forEach((letter) => (res += letter));

      fetch(chekValidWordUrl, {
        method: "POST",
        body: JSON.stringify({ word: `${res}` }),
      })
        .then((response) => response.json())
        .then(({ validWord }) => {
          if (!validWord) {
            console.log("Its not a word");
            return;
          }
          if (res.toLowerCase() === wordOfTheDay) {
            win();
          } else {
            if (!wordOfTheDay) return;
            colorTest();
          }
        });
    }
  };

  /**
   * The function `handleFetch` fetches data from a specified URL and sets the word of the day based on
   * the response.
   */
  const handleFetch = () => {
    const url =
      path === "random" ? wordOfTheDayUrl + "?random=1" : wordOfTheDayUrl;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setWordOfTheDay(data.word));
  };

  return {
    wordOfTheDay,
    index,
    word,
    bgColors,
    gameOver,
    winner,
    keyboardColors,
    addLetter,
    removeLetter,
    handleEnter,
    handleFetch,
  };
};

export default useWordOfTheDay;
