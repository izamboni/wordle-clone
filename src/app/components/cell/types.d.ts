interface CellProp {
  letter: string;
  bgColor: string;
  transition: boolean;
  index: number;
  handleEndOfTransition: (index: number) => void;
}
