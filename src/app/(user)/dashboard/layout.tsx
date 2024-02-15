"use client";
import Sidebar from "../../../components/dashboard/(sidebar)/sidebar";
import Rightbar from "../../../components/dashboard/(rightbar)/rightbar";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const [fontSize, setFontSize] = useState("text-base");
  const [formData, setFormData] = useState<any>({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  useEffect(() => {
    if (!session?.user && status === "unauthenticated")
      window.location.replace("/sign_in");
  }, [session?.user, status]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <div className="flex justify-between rounded-lg w-5/6 max-lg:w-full max-lg:h-full p-5 overflow-hidden bg-white gap-2">
          <Context.Provider
            value={{
              formData,
              setFormData,
              fontSize,
              setFontSize,
              session,
            }}
          >
            <div className="max-lg:hidden">
              <Sidebar />
            </div>
            <div className={`${fontSize} w-7/12 max-md:hidden max-lg:w-2/3`}>
              {children}
            </div>
            <div className={`${fontSize} w-3/12 max-md:w-full max-lg:w-1/3`}>
              <Rightbar />
            </div>
          </Context.Provider>
        </div>
      </div>
    </>
  );
}
