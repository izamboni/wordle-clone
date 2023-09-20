import { FC } from "react";

const Key: FC<KeyProps> = ({ letter, addLetter, color }) => {
  const bgColor = color ? color : "bg-gray-700";
  return (
    <button
      onClick={() => addLetter(letter)}
      className={`border h-14 ${bgColor} w-10 rounded flex justify-center items-center text-xl`}
    >
      {letter}
    </button>
  );
};

export default Key;
