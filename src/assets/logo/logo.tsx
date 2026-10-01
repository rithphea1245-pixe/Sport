"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const heightClasses = {
    sm: "h-7 sm:h-8",
    md: "h-8 sm:h-9 md:h-10",
    lg: "h-11 sm:h-12",
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <img
        src="/sporty-logo.png"
        alt="Sporty Logo"
        className={`${heightClasses[size]} w-auto object-contain drop-shadow-[0_2px_12px_rgba(198,254,86,0.35)] transition-transform duration-300 hover:scale-105`}
      />
    </div>
  );
}
