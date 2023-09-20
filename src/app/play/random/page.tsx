"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Suspense, useEffect } from "react";
import Keyboard from "../../components/keyboard";
import Row from "../../components/row";
import useWordOfTheDay from "../../hooks/useWordOfTheDay";
import Loading from "../loading";

interface GameOverModalProps {
  word: string;
}

const GameOverModal: FC<GameOverModalProps> = ({ word }) => {
  return (
    <div className="absolute w-full h-screen top-0 left-0 flex justify-center items-center bg-black/[0.65]">
      <div className="border rounded-md bg-gray-700 w-96 h-64 flex flex-col items-center justify-between py-2">
        <h1>Game Over!</h1>
        <div className="flex flex-col items-center">
          <p>No more tries</p>
          <p>The answer was</p>
          <p>{word.toUpperCase()}</p>
        </div>
        <div className="flex justify-around w-full">
          <Link href="/" className="border rounded p-1">
            Main Menu
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="border rounded p-1"
          >
            Play Again!
          </button>
        </div>
      </div>
    </div>
  );
};

const WinnerModal: FC = () => {
  return (
    <div className="absolute w-full h-screen top-0 left-0 flex justify-center items-center bg-black/[0.65]">
      <div className="border rounded-md bg-gray-700 w-96 h-64 flex flex-col items-center justify-between py-2">
        <h1>You Won!</h1>
        <div className="flex justify-around w-full">
          <Link href="/" className="border rounded p-1">
            Main Menu
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="border rounded p-1"
          >
            Play Again!
          </button>
        </div>
      </div>
    </div>
  );
};

const RandomWord = () => {
  const pathname = usePathname();
  const {
    wordOfTheDay,
    word,
    bgColors,
    gameOver,
    winner,
    keyboardColors,
    addLetter,
    removeLetter,
    handleEnter,
    handleFetch,
  } = useWordOfTheDay(pathname.split("/").pop());

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <main>
        <div className="flex gap-4 flex-col items-center pt-8 mb-8">
          <Row word={word[0]} bgColors={bgColors[0]} />
          <Row word={word[1]} bgColors={bgColors[1]} />
          <Row word={word[2]} bgColors={bgColors[2]} />
          <Row word={word[3]} bgColors={bgColors[3]} />
          <Row word={word[4]} bgColors={bgColors[4]} />
          <Row word={word[5]} bgColors={bgColors[5]} />
        </div>
        <Keyboard
          addLetter={addLetter}
          removeLetter={removeLetter}
          handleEnter={handleEnter}
          keyboardColors={keyboardColors}
        />
      </main>
      {gameOver && winner ? (
        <WinnerModal />
      ) : (
        gameOver && <GameOverModal word={wordOfTheDay} />
      )}
    </Suspense>
  );
};

export default RandomWord;
