"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaFacebookF } from "react-icons/fa";

export function Facebook() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button type="button" onClick={() => signOut()}>
          登出 Facebook
        </button>
      </>
    );
  }
  return (
    <>
      <button
        type="button"
        onClick={() => signIn("facebook")}
        className="justify-center h-8 bg-white hover:bg-slate-100 text-black py-2 px-4 rounded  items-center inline-flex gap-1"
      >
        <FaFacebookF />
        <span>使用 Facebook 账号登入</span>
      </button>
    </>
  );
}
