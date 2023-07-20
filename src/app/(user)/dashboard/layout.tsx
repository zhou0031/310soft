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
      <div className="flex justify-between rounded-lg w-5/6 h-[53rem] max-lg:w-full max-lg:h-full p-5 bg-white">
        <div className="max-lg:hidden ">
          <Sidebar />
        </div>
        <div className="max-md:hidden ">{children}</div>
        <div className="max-md:w-full w-3/12">
          <Rightbar />
        </div>
      </div>
    </>
  );
}
