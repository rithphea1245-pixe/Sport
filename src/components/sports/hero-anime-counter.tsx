"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";

interface HeroAnimeCounterProps {
  value: number;
  className?: string;
}

export function HeroAnimeCounter({ value, className = "" }: HeroAnimeCounterProps) {
  const numRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!numRef.current || value <= 0) return;

    const counterObj = { count: 0 };

    anime({
      targets: counterObj,
      count: [0, value],
      round: 1,
      duration: 1500,
      easing: "easeOutExpo",
      update: () => {
        if (numRef.current) {
          numRef.current.textContent = counterObj.count.toString();
        }
      },
    });
  }, [value]);

  return (
    <span ref={numRef} className={className}>
      {value > 0 ? value : "..."}
    </span>
  );
}
