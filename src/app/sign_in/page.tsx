"use client";
import Link from "next/link";
import Email from "@/components/sign_in/Email";
import Password from "@/components/sign_in/Password";
import { Google } from "@/components/sign_in/Google";
import { Facebook } from "@/components/sign_in/Facedbook";
import { GoPerson } from "react-icons/go";
import { useRef } from "react";
import { signIn } from "next-auth/react";

export default function Index() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSignIn(
    e: React.MouseEvent<HTMLButtonElement>,
    emailRef: any,
    passwordRef: any
  ) {
    e.preventDefault();

    if (emailRef.current != null) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      signIn("credentials", { email: email, password: password });
    }
  }

  return (
    <>
      <div className="w-[400px] flex flex-col items-center my-28 mx-auto py-5 bg-gray-200">
        <header>
          <h1 className="text-2xl mb-2">登陆</h1>
        </header>
        <GoPerson size={100} />
        <div className="flex flex-col gap-2">
          <form className="flex flex-col gap-3">
            <Email ref={emailRef} />
            <Password ref={passwordRef} />
            <div className="flex justify-end gap-3 items-center">
              <button
                onClick={(e) => {
                  handleSignIn(e, emailRef, passwordRef);
                }}
                type="submit"
                className="w-full font-sans bg-slate-500 hover:bg-slate-400 text-white font-thin py-1 px-4 rounded"
              >
                登入
              </button>
            </div>
          </form>

          <Link
            href="#"
            className="flex justify-end font-sans font-extralight text-slate-700"
          >
            忘记密码?
          </Link>

          <hr className="h-px border-0 dark:bg-gray-400"></hr>

          <Google />
          <Facebook />
        </div>

        <Link
          href="/sign_up"
          className="mt-10 font-sans font-extralight text-slate-700"
        >
          创建账户
        </Link>
      </div>
    </>
  );
}
