import { FC, useState } from "react";
import Cell from "../cell";

const Row: FC<RowProps> = ({ word, bgColors }) => {
  const [transitions, setTransitions] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleEndOfTransition = (index: number) => {
    const aux = [...transitions];
    if (index < 5) aux[index + 1] = true;
    setTransitions(aux);
  };

  const cells = [
    <Cell
      key="00"
      letter={word[0] ? word[0].toUpperCase() : ""}
      bgColor={bgColors[0]}
      transition={true}
      index={0}
      handleEndOfTransition={handleEndOfTransition}
    />,
    <Cell
      key="01"
      letter={word[1] ? word[1].toUpperCase() : ""}
      bgColor={bgColors[1]}
      transition={transitions[1]}
      index={1}
      handleEndOfTransition={handleEndOfTransition}
    />,
    <Cell
      key="02"
      letter={word[2] ? word[2].toUpperCase() : ""}
      bgColor={bgColors[2]}
      transition={transitions[2]}
      index={2}
      handleEndOfTransition={handleEndOfTransition}
    />,
    <Cell
      key="03"
      letter={word[3] ? word[3].toUpperCase() : ""}
      bgColor={bgColors[3]}
      transition={transitions[3]}
      index={3}
      handleEndOfTransition={handleEndOfTransition}
    />,
    <Cell
      key="04"
      letter={word[4] ? word[4].toUpperCase() : ""}
      bgColor={bgColors[4]}
      transition={transitions[4]}
      index={4}
      handleEndOfTransition={handleEndOfTransition}
    />,
  ];

  return <div className="flex gap-2">{cells.map((cell) => cell)}</div>;
};
export default Row;
