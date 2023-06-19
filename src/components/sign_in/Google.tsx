"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export function Google() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button type="button" onClick={() => signOut()}>
          登出Google
        </button>
      </>
    );
  }
  return (
    <>
      <button type="button" onClick={() => signIn("google")}>
        使用Google账号登入
      </button>
    </>
  );
}
