import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word of the Day",
};

const WordOfTheDayLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="border-b-2 rounded-lg h-12 flex items-center justify-center">
        <h1 className="font-bold text-lg">Wordle Clone</h1>
      </header>
      <section>{children}</section>
    </>
  );
};

export default WordOfTheDayLayout;
