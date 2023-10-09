"use client";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../../app/(user)/dashboard/layout";
import { TbLetterA } from "react-icons/tb";

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
        <h1 className="w-1/3 font-extrabold whitespace-nowrap overflow-hidden ...">
          Hello, {session?.user.name}
        </h1>
        <div className="w-1/3 flex gap-1 items-center justify-center">
          <button id="text-base" onClick={handleClick}>
            <TbLetterA size={15} />
          </button>
          <button id="text-xl" onClick={handleClick}>
            <TbLetterA size={17} />
          </button>
          <button id="text-2xl" onClick={handleClick}>
            <TbLetterA size={19} />
          </button>
        </div>
        <div className="w-1/3 text-right" suppressHydrationWarning>
          {date.toLocaleTimeString()}
        </div>
      </div>
    </>
  );
}
