"use client";
import Sidebar from "../../../components/dashboard/(sidebar)/sidebar";
import Rightbar from "../../../components/dashboard/(rightbar)/rightbar";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const [selectedImage, setSelectedImage] = useState(null);
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
      <div className="flex justify-between rounded-lg w-5/6 h-[53rem] max-lg:w-full max-lg:h-full p-5 bg-white">
        <Context.Provider
          value={{
            formData,
            setFormData,
            selectedImage,
            setSelectedImage,
            session,
          }}
        >
          <div className="max-lg:hidden ">
            <Sidebar />
          </div>
          <div className="max-md:hidden w-7/12">{children}</div>
          <div className="max-md:w-full w-3/12">
            <Rightbar />
          </div>
        </Context.Provider>
      </div>
    </>
  );
}
