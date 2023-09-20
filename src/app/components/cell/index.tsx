import { FC } from "react";

const Cell: FC<CellProp> = ({
  letter,
  bgColor,
  transition,
  index,
  handleEndOfTransition,
}) => {
  // animate-[wiggle_0.25s_linear_1]
  const color = transition ? bgColor : "bg-transparent";
  const animation =
    transition && bgColor !== "bg-transparent"
      ? "animate-[flip_1s_ease-in-out_1_alternate]"
      : "";

  return (
    <div
      className={`${animation} scale-[1 1] transition-colors duration-700 border w-10 h-10 rounded flex justify-center items-center ${color}`}
      onTransitionEnd={() => handleEndOfTransition(index)}
    >
      {letter}
    </div>
  );
};

export default Cell;
