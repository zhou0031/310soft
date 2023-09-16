"use client";
import { useContext, useState } from "react";
import { Context } from "../layout";

export default function Password() {
  const { session } = useContext(Context);

  return (
    <>
      <h2>修改密码</h2>
      <div className="h-1/2 flex flex-col justify-center items-center gap-5">
        <div className="flex gap-2 w-full">
          <label className="w-1/5 text-right" htmlFor="old-password">
            旧密码:
          </label>
          <input
            className="w-4/5 h-10 p-2.5 pl-10 focus:outline-sky-500"
            id="old-password"
            name="old-password"
            type="password"
          ></input>
        </div>
        <div className="flex gap-2 w-full">
          <label className="w-1/5 text-right" htmlFor="new-password-1">
            新密码:
          </label>
          <input
            className="w-4/5 h-10 p-2.5 pl-10 focus:outline-sky-500"
            id="new-password-1"
            name="new-password-1"
            type="password"
          ></input>
        </div>
        <div className="flex gap-2 w-full">
          <label className="w-1/5 text-right" htmlFor="new-password-2">
            确认新密码:
          </label>
          <input
            className="w-4/5 h-10 p-2.5 pl-10 focus:outline-sky-500"
            id="new-password-2"
            name="new-password-2"
            type="password"
          ></input>
        </div>
      </div>
    </>
  );
}
