"use client";
import Sidebar from "../../../components/dashboard/(sidebar)/sidebar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session?.user && status === "unauthenticated")
      window.location.replace("/sign_in");
  }, [session?.user, status]);

  return (
    <>
      <div className="rounded-lg  w-10/12 flex my-9 mx-auto p-5 bg-slate-100">
        <Sidebar session={session} />
        {children}
      </div>
    </>
  );
}
