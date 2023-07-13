"use client";
import { signOut } from "next-auth/react";
import { CgLogOut } from "react-icons/cg";

export default function Logout() {
  return (
    <>
      <div className="relative hover:text-black ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <CgLogOut />
        </div>
        <button className="pl-8" onClick={() => signOut()}>
          登出
        </button>
      </div>
    </>
  );
}
