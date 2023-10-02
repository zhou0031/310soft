"use client";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../../app/(user)/dashboard/layout";
import { RiFontSize2 } from "react-icons/ri";

export default function Welcome() {
  const { session, setFontSize } = useContext(Context);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleClick(e) {
    setFontSize(e.currentTarget.id);
  }

  return (
    <>
      <div className="flex font-sans text-ellipsis">
        <h2 className="w-1/3 whitespace-nowrap overflow-hidden ...">
          Hello, {session?.user.name}
        </h2>
        <div className="w-1/3 flex gap-3 items-center justify-center">
          <button id="text-base" onClick={handleClick}>
            <RiFontSize2 size={15} />
          </button>
          <button id="text-xl" onClick={handleClick}>
            <RiFontSize2 size={17} />
          </button>
          <button id="text-2xl" onClick={handleClick}>
            <RiFontSize2 size={19} />
          </button>
        </div>
        <div className="w-1/3 text-right" suppressHydrationWarning>
          {date.toLocaleTimeString()}
        </div>
      </div>
    </>
  );
}
