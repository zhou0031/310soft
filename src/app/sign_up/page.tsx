"use client";
import Link from "next/link";
import Email from "@/components/sign_up/Email";
import Password from "@/components/sign_up/Password";
import { GoPersonAdd } from "react-icons/go";
import { useState, useRef, useEffect } from "react";

export default function Index() {
  const [isDisabled, setDisable] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  useEffect(() => {
    setErrorMessage("");
    if (emailRef.current != null && passwordRef.current != null)
      emailRef.current.isValid() && passwordRef.current.isValid()
        ? setDisable(false)
        : setDisable(true);
  }, [emailValue, password1, password2]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const res = await fetch("/api/user/sign_up", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ emailValue, password1, password2 }),
    });
    const { user, error } = await res.json();
    error ? setErrorMessage(error) : setErrorMessage("");
  }

  return (
    <>
      <div className="w-[400px] flex flex-col items-center my-28 mx-auto py-5 bg-gray-200">
        <header>
          <h1 className="text-2xl mb-2">创建账户</h1>
        </header>
        <GoPersonAdd size={100} />
        <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
          <Email
            ref={emailRef}
            value={emailValue}
            onChange={(e: any) => setEmailValue(e.target.value)}
          />
          <Password
            ref={passwordRef}
            password1={password1}
            password2={password2}
            onChange_password1={(e: any) => setPassword1(e.target.value)}
            onChange_password2={(e: any) => setPassword2(e.target.value)}
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="mt-3 w-full font-sans text-lg bg-slate-500 hover:bg-slate-400 text-white font-thin py-1 px-4 rounded"
          >
            提交
          </button>
          <div id="error" className="text-red-700 font-medium">
            {errorMessage}
          </div>
        </form>
        <Link href=".." className="font-sans text-xs mt-3">
          取消
        </Link>
        <div className="mt-10 font-sans font-extralight text-slate-700">
          <Link href="/sign_in">已有账户在此登陆</Link>
        </div>
      </div>
    </>
  );
}
