"use client";
import { useContext, useState, useEffect } from "react";
import { experimental_useOptimistic as useOptimistic } from "react";
import { Context } from "../layout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export default function Password() {
  const { session } = useContext(Context);
  const router = useRouter();
  const { status } = useSession();
  const [disabled, setDisabled] = useState(true);
  const [input, setInput] = useState({
    old_password: "",
    new_password_1: "",
    new_password_2: "",
  });
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState({
    class: "",
    content: "",
  });
  const [oMessage, setOMessage] = useOptimistic(message);

  useEffect(() => {
    if (status == "authenticated" && session?.user.provider !== "credentials") {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.provider, status]);

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
    setDisabled(true);
    setOMessage((prevMessage) => ({
      ...prevMessage,
      class: "",
      content: "保存中 ...",
    }));

    const res = await axios.post("/api/db/user/update/password", {
      input: input,
      user: session.user,
    });

    if (res.data.error) {
      setMessage((prevMessage) => ({
        ...prevMessage,
        class: "text-red-500",
        content: "修改密码失败",
      }));
      setDisabled(false);
      return;
    }

    setMessage((prevMessage) => ({
      ...prevMessage,
      class: "text-green-500",
      content: "修改成功，登出中 ...",
    }));
    //signout
    signOut();
  }

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  }

  function toggleVisible() {
    setVisible((visible) => !visible);
  }

  return (
    <>
      <h2>修改密码</h2>
      <form
        className="flex flex-col mt-11 justify-center items-center gap-5"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2 w-full items-center">
          <label className=" w-1/5 text-right text-sm" htmlFor="old-password">
            旧密码:
          </label>
          <div className="relative w-4/5">
            <div
              onClick={toggleVisible}
              className="absolute inset-y-0 left-0 flex items-center pl-3.5 cursor-pointer"
            >
              {(!visible && <AiOutlineEye size={20} />) || (
                <AiOutlineEyeInvisible size={20} />
              )}
            </div>
            <input
              className="w-full h-10 p-2.5 pl-10 bg-gray-100 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-sky-500"
              id="old_password"
              name="old_password"
              type={`${visible ? "text" : "password"}`}
              onInput={handleInput}
            ></input>
          </div>
        </div>

        <div className="flex gap-2 w-full items-center">
          <label className="w-1/5 text-right text-sm" htmlFor="new-password-1">
            新密码:
          </label>
          <div className="relative w-4/5">
            <div
              onClick={toggleVisible}
              className="absolute inset-y-0 left-0 flex items-center pl-3.5 cursor-pointer"
            >
              {(!visible && <AiOutlineEye size={20} />) || (
                <AiOutlineEyeInvisible size={20} />
              )}
            </div>
            <input
              className="w-full h-10 p-2.5 pl-10 bg-gray-100 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-sky-500"
              id="new_password_1"
              name="new_password_1"
              type={`${visible ? "text" : "password"}`}
              onInput={handleInput}
            ></input>
          </div>
        </div>
        <div className="flex gap-2 w-full items-center">
          <label className="w-1/5 text-right text-sm" htmlFor="new-password-2">
            确认新密码:
          </label>
          <div className="relative w-4/5">
            <div
              onClick={toggleVisible}
              className="absolute inset-y-0 left-0 flex items-center pl-3.5 cursor-pointer"
            >
              {(!visible && <AiOutlineEye size={20} />) || (
                <AiOutlineEyeInvisible size={20} />
              )}
            </div>
            <input
              className="w-full h-10 p-2.5 pl-10 bg-gray-100 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-sky-500"
              id="new_password_2"
              name="new_password_2"
              type={`${visible ? "text" : "password"}`}
              onInput={handleInput}
            ></input>
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-2">
          <div className={`${oMessage.class}`}>{oMessage.content}</div>
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
