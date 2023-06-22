"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";

export function Google() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button type="button" onClick={() => signOut()}>
          登出 Google
        </button>
      </>
    );
  }
  return (
    <>
      <button
        type="button"
        onClick={() => signIn("google")}
        className="h-10 bg-white hover:bg-slate-100 text-black py-2 px-4 rounded my-1 items-center inline-flex gap-1"
      >
        <BsGoogle />
        <span>使用 Google 账号登入</span>
      </button>
    </>
  );
}
