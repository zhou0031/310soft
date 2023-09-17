"use client";
import { useContext, useState, useRef } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Context } from "../layout";

export default function Password() {
  const { session } = useContext(Context);
  const [input, setInput] = useState({
    "old-password": "",
    "new-password-1": "",
    "new-password-2": "",
  });
  const [message, setMessage] = useState({
    class: "",
    content: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    //setInput(prevState=>({...prevState,[]})
  }

  function handleChange(e) {
    alert(e.target.value);
  }

  return (
    <>
      <h2>修改密码</h2>
      <form
        className="flex flex-col mt-11 justify-center items-center gap-5"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2 w-full items-center">
          <label className="w-1/5 text-right text-sm" htmlFor="old-password">
            旧密码:
          </label>
          <input
            className="w-4/5 h-10 p-2.5 pl-10 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500"
            id="old-password"
            name="old-password"
            type="password"
          ></input>
        </div>

        <div className="flex gap-2 w-full items-center">
          <label className="w-1/5 text-right text-sm" htmlFor="new-password-1">
            新密码:
          </label>
          <input
            className="w-4/5 h-10 p-2.5 pl-10 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500"
            id="new-password-1"
            name="new-password-1"
            type="password"
            onChange={handleChange}
          ></input>
        </div>
        <div className="flex gap-2 w-full items-center">
          <label className="w-1/5 text-right text-sm" htmlFor="new-password-2">
            确认新密码:
          </label>
          <input
            className="w-4/5 h-10 p-2.5 pl-10 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500"
            id="new-password-2"
            name="new-password-2"
            type="password"
            onChange={handleChange}
          ></input>
        </div>
        <div className="w-full flex items-center justify-end gap-2">
          <div className={`${message.class}`}>{message.content}</div>
          <button
            type="submit"
            className="w-1/5 font-sans text-md bg-slate-500 hover:bg-slate-400 text-white font-thin py-1 px-4 rounded"
          >
            提交
          </button>
        </div>
      </form>
    </>
  );
}
