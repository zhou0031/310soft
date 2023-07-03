"use client";
import { RiLockPasswordLine } from "react-icons/ri";
import { useEffect, useState, forwardRef } from "react";

function Password(props: any, passwordRef: any) {
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    password.trim().length > 0 ? setValid(true) : setValid(false);
  }, [password]);

  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="password">密码</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <RiLockPasswordLine />
          </div>
          <input
            onChange={(e) => setPassword(e.currentTarget.value)}
            ref={passwordRef}
            {...props}
            type="password"
            id="password"
            name="password"
            className="h-10 p-2.5 pl-10 focus:outline-sky-500"
          />
        </div>
        <div
          id="alert-password"
          className={`${valid ? "hidden" : ""} text-red-700 font-medium`}
        >
          输入密码
        </div>
      </div>
    </>
  );
}
export default forwardRef(Password);
