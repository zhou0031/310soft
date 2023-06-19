"use client";
import { useState } from "react";
const emailRegx = /^[A-Za-z\._\-0-9]*[@][A-Za-z0-9]*[\.][a-z]{2,9}$/;

export function Email() {
  const [valid, setValid] = useState(false);
  function checkEmailFormat(email: string) {
    email.match(emailRegx) ? setValid(true) : setValid(false);
  }

  return (
    <div className="flex gap-3 justify-end">
      <label htmlFor="email">Email:</label>
      <section>
        <input
          type="text"
          id="email"
          name="email"
          onInput={(e) => checkEmailFormat(e.currentTarget.value)}
        />
        <div
          id="email-alert"
          className={`${valid ? "hidden" : ""} text-red-700 font-medium`}
        >
          输入正确的email地址
        </div>
      </section>
    </div>
  );
}
