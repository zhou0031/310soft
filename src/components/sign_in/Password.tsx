"use client";
import { RiLockPasswordLine } from "react-icons/ri";

export function Password() {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="password">密码</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <RiLockPasswordLine />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            className="h-10 p-2.5 pl-10 focus:outline-sky-500"
          />
        </div>
      </div>
    </>
  );
}
