/* eslint-disable react-hooks/refs */
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import "./App.css";

export default function Home() {
  const [text, setText] = useState("");
  const [offsetWidth, setOffsetWidth] = useState(0);
  const [caretX, setCaretX] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const measurableRef = useRef<HTMLSpanElement | null>(null);

  console.log(inputRef?.current?.selectionStart);

  const updateCaret = () => {
    if (inputRef?.current) {
      setOffsetWidth(inputRef?.current?.selectionStart || 0);
    }
  };

  useEffect(() => {
    if (measurableRef?.current) {
      setCaretX(measurableRef?.current?.offsetWidth);
    }
  }, [text, offsetWidth]);

  const HighlightedText = ({ content }: { content: string }) => {
    if (!content) return null;
    const parts = content.split(/(\d+(?:°C|°F|\$|k\$)?)/g);

    return (
      <>
        {parts.map((part, i) => {
          const isMatch = /(\d+(?:°C|°F|\$|k\$)?)/g.test(part);
          return isMatch ? (
            <span
              key={i}
              className="inline-block bg-[#343434] px-1.5 py-0.5 rounded-md border border-[#333] text-white mx-0.5 shadow-sm"
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          );
        })}
      </>
    );
  };

  return (
    <div className="w-full h-screen overflow-x-hidden flex px-[5vw] items-center">
      <div className="relative input-wrapper">
        <span
          ref={measurableRef}
          className="absolute text-2xl font-sans opacity-0 whitespace-pre pointer-events-none"
        >
          <HighlightedText content={text.slice(0, offsetWidth)} />
        </span>
        <span
          ref={spanRef}
          className="absolute top-0 left-0 inline-block text-2xl caret-transparent font-sans focus:outline-none border-none whitespace-pre"
        >
          <HighlightedText content={text} />
        </span>
        <motion.div
          initial={false}
          animate={{ x: caretX }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.5,
          }}
          className="absolute left-0 w-0.5 h-8 animate-blink bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
        />
        <input
          ref={inputRef}
          value={text}
          autoFocus
          onChange={(e) => {
            setText(e.target.value);
            setTimeout(updateCaret, 0);
          }}
          onSelect={updateCaret}
          onKeyDown={(e) => {
            setTimeout(updateCaret, 0);
          }}
          id="input"
          type="text"
          className="w-full text-2xl caret-transparent font-sans focus:outline-none border-none text-transparent"
        />
      </div>
    </div>
  );
}
