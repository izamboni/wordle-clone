import Link from "next/link";
import TodayButton from "./components/today-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-around p-24">
      <TodayButton />
      <Link
        className="border-2 p-4 w-64 h-48 flex justify-center items-center rounded-md hover:border-sky-900 hover:text-sky-900 hover:shadow-sky-900 shadow-lg shadow-white/50"
        href="/play/random"
      >
        Play With a Random Word!
      </Link>
    </main>
  );
}
