"use client";
import { useContext, useState, useEffect } from "react";
import { Context } from "../layout";
import axios from "axios";

export default function Password() {
  const { session } = useContext(Context);
  const [disabled, setDisabled] = useState(true);
  const [input, setInput] = useState({
    old_password: "",
    new_password_1: "",
    new_password_2: "",
  });
  const [message, setMessage] = useState({
    class: "",
    content: "",
  });

  useEffect(() => {
    setMessage((prevMessage) => ({
      ...prevMessage,
      class: "",
      content: "",
    }));

    if (
      input.old_password.trim().length == 0 ||
      input.new_password_1.trim().length == 0 ||
      input.new_password_2.trim().length == 0
    ) {
      setDisabled(true);
      return;
    }

    if (input.new_password_1 !== input.new_password_2) {
      setMessage((prevMessage) => ({
        ...prevMessage,
        class: "text-red-500",
        content: "新密码不一致",
      }));
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [input]);

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(await axios.post("https://httpbin.org/post"));
  }

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
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
            id="old_password"
            name="old_password"
            type="password"
            onInput={handleInput}
          ></input>
        </div>

        <div className="flex gap-2 w-full items-center">
          <label className="w-1/5 text-right text-sm" htmlFor="new-password-1">
            新密码:
          </label>
          <input
            className="w-4/5 h-10 p-2.5 pl-10 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500"
            id="new_password_1"
            name="new_password_1"
            type="password"
            onInput={handleInput}
          ></input>
        </div>
        <div className="flex gap-2 w-full items-center">
          <label className="w-1/5 text-right text-sm" htmlFor="new-password-2">
            确认新密码:
          </label>
          <input
            className="w-4/5 h-10 p-2.5 pl-10 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-500"
            id="new_password_2"
            name="new_password_2"
            type="password"
            onInput={handleInput}
          ></input>
        </div>
        <div className="w-full flex items-center justify-end gap-2">
          <div className={`${message.class}`}>{message.content}</div>
          <button
            type="submit"
            disabled={disabled}
            className="w-1/5 font-sans text-md bg-slate-500 hover:bg-slate-400 text-white font-thin py-1 px-4 rounded"
          >
            提交
          </button>
        </div>
      </form>
    </>
  );
}
