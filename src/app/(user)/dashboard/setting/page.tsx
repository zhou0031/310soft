"use client";
import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import { Context } from "../layout";
import ImageUploader from "../../../../components/dashboard/(middle)/imageUploader";
import { experimental_useOptimistic as useOptimistic } from "react";

import axios from "axios";

export default function Setting() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ class: "", content: "" });
  const [pending, setPending] = useState(false);
  const [oMessage, setOMessage] = useOptimistic(message);
  const { data: session, status, update } = useSession();
  const { formData, setFormData } = useContext(Context);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    setOMessage((prev) => ({
      ...prev,
      class: "",
      content: "请稍侯 ...",
    }));

    const res = await axios.put("/api/db/user/update/profile", {
      formData,
      session,
    });

    if (!res.data.error) update({ name: formData.name });

    setMessage((prev) => ({
      ...prev,
      class: res.data?.error ? "text-red-500" : "text-green-500",
      content: res.data?.error ? res.data.error : "保存成功",
    }));
    setPending(false);
  }

  function handleChange(e) {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

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
          setFormData((prevFormData) => ({
            ...prevFormData,
            name: data.name,
            phone: data.contact?.phone,
            street: data.address?.street,
            city: data.address?.city,
            state: data.address?.state,
            country: data.address?.country,
            zip: data.address?.zip,
          }));
          setLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="flex flex-col gap-5">
        <form
          autoComplete="off"
          className="flex flex-col mt-5"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-5">
            <div className="relative z-0 w-1/2 mb-6 group">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.name || ""}
                onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="name"
                className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                全名
              </label>
            </div>
            <div className="relative z-0 w-1/2 mb-6 group">
              <input
                type="text"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.phone || ""}
                onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="phone"
                className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                电话
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
                value={formData.street || ""}
                onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="street"
                className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                门牌，楼号，街名
              </label>
            </div>
            <div className="relative z-0 w-1/2 mb-6 group">
              <input
                type="text"
                name="city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.city || ""}
                onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="city"
                className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                城市
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
                value={formData.state || ""}
                onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="state"
                className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                州/省
              </label>
            </div>
            <div className="relative z-0 w-1/3 mb-6 group">
              <input
                type="text"
                name="country"
                id="country"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.country || ""}
                onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="country"
                className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                国家
              </label>
            </div>
            <div className="relative z-0 w-1/3 mb-6 group">
              <input
                type="text"
                name="zip"
                id="zip"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.zip || ""}
                onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="zip"
                className="w-full whitespace-nowrap text-ellipsis overflow-hidden ... peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                邮编
              </label>
            </div>
          </div>
          <div className="flex items-center justify-end gap-5">
            <div className={oMessage?.class}>{oMessage?.content}</div>
            <button
              disabled={pending}
              type="submit"
              className="w-1/4 font-sans bg-slate-500 hover:bg-slate-400 text-white font-thin py-1 px-4 rounded"
            >
              {`${pending ? "保存中 ..." : "保存"}`}
            </button>
          </div>
        </form>
        <ImageUploader />
      </div>
    </>
  );
}
