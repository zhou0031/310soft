"use client";
import { useState } from "react";
const emailRegx = /^[A-Za-z\._\-0-9]*[@][A-Za-z0-9]*[\.][a-z]{2,9}$/;

export function Email() {
  const [valid, setValid] = useState(false);
  function checkEmailFormat(email: string) {
    email.match(emailRegx) ? setValid(true) : setValid(false);
  }

  return (
    <div className="flex flex-col relative ">
      <div className="flex gap-3 justify-end items-center">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          className="h-10 p-2.5"
          onInput={(e) => checkEmailFormat(e.currentTarget.value)}
        />
      </div>
      <div
        id="email-alert"
        className={`${
          valid ? "hidden" : ""
        } text-red-700 font-medium absolute left-14 top-10`}
      >
        输入正确的email地址
      </div>
    </div>
  );
}
