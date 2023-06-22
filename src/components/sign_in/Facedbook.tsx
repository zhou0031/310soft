"use client";
import { useSession, signIn, signOut } from "next-auth/react";

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
        className="h-10 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded my-1 items-center inline-flex"
      >
        <span>使用 Facebook 账号登入</span>
      </button>
    </>
  );
}
