"use client";
import Link from "next/link";
import Script from "next/script";
import Email from "../../../components/sign_in/Email";
import Password from "../../../components/sign_in/Password";
import { Google } from "../../../components/sign_in/Google";
import { Facebook } from "../../../components/sign_in/Facedbook";
import { GoPerson } from "react-icons/go";
import { useState, useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { decodeJWT } from "../../../helper";

export default function Index() {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<any>();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  async function handleSignIn(
    e: React.MouseEvent<HTMLButtonElement>,
    email: string,
    password: string
  ) {
    e.preventDefault();
    setDisabled(true);
    setErrorMessage("");

    /**** Cloudflare Turnstile *******/
    const formData = new FormData(formRef.current);
    const token = formData.get("cf-turnstile-response");

    const turnstile_res = await fetch("/api/cloudflare/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await turnstile_res.json();

    // the token did't go through
    if (!data.success) {
      const error = "真人验证未通过";
      setErrorMessage(error);
      setDisabled(false);
      return;
    }

    /**** Sign In ********/
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (res?.error) {
      setErrorMessage(res.error);
      setDisabled(false);
      return;
    }
    window.location.replace("/dashboard");
  }

  useEffect(() => {
    if (session?.user && status === "authenticated") {
      window.location.replace("/dashboard");
    }
    if (error) {
      decodeJWT(error).then((res) => setErrorMessage(res.error));
    }
    return () => {
      setErrorMessage("");
    };
  }, [status, session?.user, error]);

  useEffect(() => {
    const emailRegx = /^[A-Za-z\._\-0-9]*[@][A-Za-z0-9]*[\.][a-z]{2,9}$/;
    setErrorMessage("");
    email.match(emailRegx) && password.trim().length > 0
      ? setDisabled(false)
      : setDisabled(true);
  }, [email, password]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      ></Script>

      <div className="flex flex-col items-center max-w-fit mx-auto m-auto p-10 bg-gray-200">
        <header>
          <h1 className="text-2xl mb-2">登陆</h1>
        </header>
        <GoPerson size={100} />
        <div className="flex flex-col gap-2">
          <form className="flex flex-col gap-3" ref={formRef}>
            <Email
              email={email}
              onChange={(e: any) => setEmail(e.currentTarget.value)}
            />
            <Password
              password={password}
              onChange={(e: any) => setPassword(e.currentTarget.value)}
            />

            <div
              className="cf-turnstile"
              data-sitekey={process.env.CLOUDFLARE_SITE}
              data-theme="light"
              data-language="zh-cn"
            ></div>

            <button
              disabled={disabled}
              onClick={(e) => {
                handleSignIn(e, email, password);
              }}
              type="submit"
              className="w-full font-sans bg-slate-500 hover:bg-slate-400 text-white font-thin py-1 px-4 rounded"
            >
              登入
            </button>
            <div id="error" className="text-red-700 font-medium">
              {errorMessage}
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
