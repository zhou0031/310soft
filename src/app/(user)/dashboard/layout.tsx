"use client";
import Sidebar from "../../../components/dashboard/(sidebar)/sidebar";
import Rightbar from "../../../components/dashboard/(rightbar)/rightbar";
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
      <div className="flex justify-between gap-10 relative rounded-lg max-lg:w-full w-10/12 my-9 mx-auto p-5 bg-white">
        <div className="max-lg:hidden">
          <Sidebar />
        </div>
        <div className="max-md:hidden">{children}</div>
        <div className="max-md:w-full">
          <Rightbar />
        </div>
      </div>
    </>
  );
}
