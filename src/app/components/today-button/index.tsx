"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const TodayButton = () => {
  const today = useMemo(() => new Date(), []);

  const [style, setStyle] = useState({
    pointerEvent: "pointer-events-auto",
    color: "text-white",
    shadow: "shadow-lg shadow-white/50",
  });

  useEffect(() => {
    const formatedToday = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    if (localStorage.getItem("lastComplete") === formatedToday) {
      const newStyle = {
        pointerEvent: "pointer-events-none",
        color: "text-gray-700",
        shadow: "",
      };
      setStyle(newStyle);
    }
  }, [today]);

  return (
    <Link
      className={`${style.pointerEvent} ${style.color} ${style.shadow} border-current border-2 p-4 w-64 h-48 flex justify-center items-center rounded-md hover:border-sky-900 hover:text-sky-900 hover:shadow-sky-900 `}
      href="/play/today"
    >
      Play Word of the day!
    </Link>
  );
};

export default TodayButton;
