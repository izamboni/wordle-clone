"use client";

import Link from "next/link";
import { useMemo } from "react";

const TodayButton = () => {
  const today = useMemo(() => new Date(), []);

  let pointerEvent = "pointer-events-auto";

  let color = "text-white";

  let shadow = "shadow-lg shadow-white/50";

  if (typeof window !== undefined) {
    if (
      localStorage !== undefined &&
      localStorage.getItem("lastComplete") ===
        `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
    ) {
      pointerEvent = "pointer-events-none";
      color = "text-gray-700";
      shadow = "";
    }
  }

  return (
    <Link
      className={`${pointerEvent} ${color} ${shadow} border-current border-2 p-4 w-64 h-48 flex justify-center items-center rounded-md hover:border-sky-900 hover:text-sky-900 hover:shadow-sky-900 `}
      href="/play/today"
    >
      Play Word of the day!
    </Link>
  );
};

export default TodayButton;
