/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import "./App.css";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [highlight, setHiglight] = useState(false);
  const [offsetWidth, setOffsetWidth] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  const numbers = text.match(/\d+/g);
  useEffect(() => {
    if (numbers) {
      console.log("Numbers:", numbers.map(Number)); // [123, 456]
    } else {
      console.log("Koi number nahi mila");
    }
  }, [numbers]);

  console.log();

  useEffect(() => {
    if (numbers) {
      if (text.split(" ").includes(numbers[0])) {
        console.log("found", numbers[0]);
        setHiglight(true);
      }
    }
  }, [numbers, text]);

  useEffect(() => {
    if (spanRef?.current) {
      setOffsetWidth(spanRef?.current?.offsetWidth);
    }
  }, [text]);

  return (
    <div className="w-full h-screen overflow-x-hidden flex px-[5vw] items-center">
      <div className="relative input-wrapper">
        <div
          style={{
            position: "absolute",
            left: offsetWidth,
          }}
          className="input-before"
        />
        <span
          ref={spanRef}
          className="absolute top-0 left-0 opacity-1 inline-block text-2xl caret-transparent font-sans focus:outline-none border-none whitespace-pre"
        >
          {text}
        </span>
        <span
          ref={inputRef}
          style={{
            backgroundColor: highlight ? "red" : "",
            position: "absolute",
            left: offsetWidth,
          }}
          className="absolute top-0 left-0 inline-block text-2xl caret-transparent font-sans focus:outline-none border-none whitespace-pre"
        >
          {numbers[0]}
        </span>
        <input
          ref={inputRef}
          onChange={(e) => {
            setText(e.target.value);
          }}
          id="input"
          type="text"
          // style={{ backgroundColor: highlight ? "red" : "" }}
          className="bg-transparent w-xl text-2xl caret-transparent font-sans focus:outline-none border-none"
        />
      </div>
    </div>
  );
}
