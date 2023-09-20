interface KeyProps {
  letter: string;
  addLetter: (letter: string) => void;
  color?: string;
}

interface KeyboardProps {
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  handleEnter: () => void;
  keyboardColors: { [key: string]: string };
}
