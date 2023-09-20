"use client";

import { FC } from "react";
import Key from "./key";

const Keyboard: FC<KeyboardProps> = ({
  addLetter,
  removeLetter,
  handleEnter,
  keyboardColors,
}) => {
  return (
    <div
      className="flex flex-col gap-2 focus:outline-none"
      tabIndex={-1}
      onKeyDown={({ key }) => {
        if (key === "Enter") handleEnter();
        if (key === "Backspace") removeLetter();
        if (key.length === 1 && /[a-zA-Z]/.test(key)) addLetter(key);
      }}
      autoFocus
    >
      <div className="flex gap-2 justify-center">
        <Key addLetter={addLetter} letter={"Q"} color={keyboardColors.q} />
        <Key addLetter={addLetter} letter={"W"} color={keyboardColors.w} />
        <Key addLetter={addLetter} letter={"E"} color={keyboardColors.e} />
        <Key addLetter={addLetter} letter={"R"} color={keyboardColors.r} />
        <Key addLetter={addLetter} letter={"T"} color={keyboardColors.t} />
        <Key addLetter={addLetter} letter={"Y"} color={keyboardColors.y} />
        <Key addLetter={addLetter} letter={"U"} color={keyboardColors.u} />
        <Key addLetter={addLetter} letter={"I"} color={keyboardColors.i} />
        <Key addLetter={addLetter} letter={"O"} color={keyboardColors.o} />
        <Key addLetter={addLetter} letter={"P"} color={keyboardColors.p} />
      </div>
      <div className="flex gap-2 justify-center">
        <Key addLetter={addLetter} letter={"A"} color={keyboardColors.a} />
        <Key addLetter={addLetter} letter={"S"} color={keyboardColors.s} />
        <Key addLetter={addLetter} letter={"D"} color={keyboardColors.d} />
        <Key addLetter={addLetter} letter={"F"} color={keyboardColors.f} />
        <Key addLetter={addLetter} letter={"G"} color={keyboardColors.g} />
        <Key addLetter={addLetter} letter={"H"} color={keyboardColors.h} />
        <Key addLetter={addLetter} letter={"J"} color={keyboardColors.j} />
        <Key addLetter={addLetter} letter={"K"} color={keyboardColors.k} />
        <Key addLetter={addLetter} letter={"L"} color={keyboardColors.l} />
      </div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleEnter}
          className="border h-14 bg-gray-700 w-16 rounded flex justify-center items-center "
        >
          ENTER
        </button>
        <Key addLetter={addLetter} letter={"Z"} color={keyboardColors.z} />
        <Key addLetter={addLetter} letter={"X"} color={keyboardColors.x} />
        <Key addLetter={addLetter} letter={"C"} color={keyboardColors.c} />
        <Key addLetter={addLetter} letter={"V"} color={keyboardColors.v} />
        <Key addLetter={addLetter} letter={"B"} color={keyboardColors.b} />
        <Key addLetter={addLetter} letter={"N"} color={keyboardColors.n} />
        <Key addLetter={addLetter} letter={"M"} color={keyboardColors.m} />
        <button
          onClick={removeLetter}
          className="border h-14 bg-gray-700 w-16 rounded flex justify-center items-center "
        >
          {"<="}
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
