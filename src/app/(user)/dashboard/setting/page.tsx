"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loading from "../loading";

export default function Setting() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user && status === "authenticated") {
      fetch("/api/db/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session.user),
      })
        .then((d) => d.json())
        .then((data) => {
          setUserInfo(data);
          setLoading(false);
        });
    }
  }, [session?.user, status]);

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <>
      <h2>设置</h2>
      <form className="flex flex-col mt-5">
        <div className="flex gap-5">
          <div className="relative z-0 w-1/2 mb-6 group">
            <input
              type="text"
              name="full_name"
              id="full_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="full_name"
              className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              全名 {`${userInfo && userInfo?.name ? userInfo.name : ""}`}
            </label>
          </div>
          <div className="relative z-0 w-1/2 mb-6 group">
            <input
              type="text"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              电话{" "}
              {`${userInfo && userInfo?.contact ? userInfo.contact.phone : ""}`}
            </label>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="relative z-0 w-1/2 mb-6 group">
            <input
              type="text"
              name="street"
              id="street"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="street"
              className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              门牌，楼号，街名{" "}
              {`${
                userInfo && userInfo?.address ? userInfo.address.street : ""
              }`}
            </label>
          </div>
          <div className="relative z-0 w-1/2 mb-6 group">
            <input
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              城市{" "}
              {`${userInfo && userInfo?.address ? userInfo.address.city : ""}`}
            </label>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative z-0 w-1/3 mb-6 group">
            <input
              type="text"
              name="state"
              id="state"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="state"
              className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              州/省{" "}
              {`${userInfo && userInfo?.address ? userInfo.address.state : ""}`}
            </label>
          </div>
          <div className="relative z-0 w-1/3 mb-6 group">
            <input
              type="text"
              name="country"
              id="country"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="country"
              className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              国家{" "}
              {`${
                userInfo && userInfo?.address ? userInfo.address.country : ""
              }`}
            </label>
          </div>
          <div className="relative z-0 w-1/3 mb-6 group">
            <input
              type="text"
              name="zip"
              id="zip"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="zip"
              className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              邮编{" "}
              {`${userInfo && userInfo?.address ? userInfo.address.zip : ""}`}
            </label>
          </div>
        </div>
      </form>
    </>
  );
}
