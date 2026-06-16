"use client";
import React, { useState, useEffect } from "react";

interface TypeWriterProps {
  text: string;
  typingSpeed?: number;
  className?: string;
  cursorColor?: string;
}

export default function TypeWriter({
  text,
  typingSpeed = 150,
  className = "",
  cursorColor = "currentColor",
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, text, typingSpeed]);

  return (
    <span className={className}>
      {displayedText}
      <span
        className={`inline-block w-[3px] h-[1em] ml-1 align-middle ${
          isTypingComplete ? "animate-blink" : ""
        }`}
        style={{ backgroundColor: cursorColor }}
      />
    </span>
  );
}
