"use client";

import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { useLanguage } from "@/context/language-context";

interface HeroAnimeTitleProps {
  onWordChange?: (word: string) => void;
}

export function HeroAnimeTitle({ onWordChange }: HeroAnimeTitleProps) {
  const { isKhmer } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const rotatingWordRef = useRef<HTMLSpanElement | null>(null);

  // Dynamic cycling keywords
  const rotatingWordsEn = [
    "Arenas",
    "Tournaments",
    "Kun Khmer",
    "Champions",
    "CPL Finals",
  ];

  const rotatingWordsKm = [
    "ពហុកីឡដ្ឋាន",
    "គុនខ្មែរ",
    "ជើងឯកជាតិ",
    "លីគកំពូល",
    "សង្វៀនកីឡា",
  ];

  const words = isKhmer ? rotatingWordsKm : rotatingWordsEn;
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = words[wordIndex % words.length];

  // Prefix words intact (never split Khmer characters to avoid broken combining vowels and dotted circles)
  const prefixWordsKm = ["កីឡាជាតិ", "ការប្រកួត", "និង"];
  const prefixWordsEn = ["National", "Sports,", "Tournaments", "&"];
  const prefixWords = isKhmer ? prefixWordsKm : prefixWordsEn;

  // Initial title words stagger reveal (Anime.js style)
  useEffect(() => {
    if (!titleRef.current) return;

    // Animate prefix words as whole units (preserves Khmer vowels & consonants)
    anime({
      targets: titleRef.current.querySelectorAll(".title-prefix-word"),
      translateY: ["110%", "0%"],
      opacity: [0, 1],
      rotateZ: [-4, 0],
      duration: 800,
      delay: anime.stagger(90, { start: 150 }),
      easing: "easeOutExpo",
    });

    // Animate SVG neon stroke underline
    if (pathRef.current) {
      anime({
        targets: pathRef.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1200,
        delay: 500,
        easing: "easeInOutCubic",
      });
    }
  }, [isKhmer]);

  // Dynamic word cycle animation using whole word transition
  useEffect(() => {
    const wordEl = rotatingWordRef.current;
    if (!wordEl) return;

    // Stagger / spring in the new rotating keyword
    const enterAnim = anime({
      targets: wordEl,
      translateY: ["100%", "0%"],
      opacity: [0, 1],
      scale: [0.85, 1],
      duration: 750,
      easing: "easeOutBack",
      complete: () => {
        // Redraw the SVG line under the new word
        if (pathRef.current) {
          anime({
            targets: pathRef.current,
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 700,
            easing: "easeInOutQuad",
          });
        }
      },
    });

    // Schedule next word transition
    const timer = setTimeout(() => {
      anime({
        targets: wordEl,
        translateY: ["0%", "-100%"],
        opacity: [1, 0],
        scale: [1, 0.85],
        duration: 500,
        easing: "easeInExpo",
        complete: () => {
          setWordIndex((prev) => (prev + 1) % words.length);
          if (onWordChange) {
            onWordChange(words[(wordIndex + 1) % words.length]);
          }
        },
      });
    }, 3500);

    return () => {
      clearTimeout(timer);
      enterAnim.pause();
    };
  }, [wordIndex, words, onWordChange]);

  return (
    <h1
      ref={titleRef}
      className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 select-none ${
        isKhmer ? "font-battambang leading-[1.35] py-1" : "leading-[1.1]"
      }`}
    >
      {/* Prefix Words - Rendered as whole intact words to guarantee proper Khmer font ligature rendering */}
      <span className="inline-block mr-2">
        {prefixWords.map((word, index) => (
          <span
            key={`${isKhmer ? "km" : "en"}-${index}`}
            className="inline-block overflow-hidden align-top mr-2 sm:mr-3.5"
          >
            <span className="title-prefix-word inline-block will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </span>

      {/* Kinetic Anime.js Rotating Keyword */}
      <span className="relative inline-block text-[#C6FE56] align-top overflow-visible">
        <span className="inline-block overflow-hidden">
          <span
            ref={rotatingWordRef}
            className="dynamic-anime-word inline-block will-change-transform whitespace-nowrap"
          >
            {currentWord}
          </span>
        </span>

        {/* Anime.js SVG Neon Hand-Drawn Underline */}
        <span className="absolute -bottom-2 sm:-bottom-2.5 left-0 right-0 w-full h-3 pointer-events-none">
          <svg
            viewBox="0 0 240 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M3 11C45 4 120 2 237 9"
              stroke="#C6FE56"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(198,254,86,0.8)]"
            />
          </svg>
        </span>
      </span>
    </h1>
  );
}
