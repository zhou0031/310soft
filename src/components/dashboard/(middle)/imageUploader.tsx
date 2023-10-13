"use client";
import { PiUploadLight } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Context } from "../../../app/(user)/dashboard/layout";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { experimental_useOptimistic as useOptimistic } from "react";
import axios from "axios";

export default function ImageUploader() {
  const { session } = useContext(Context);
  const [isDraged, setIsDraged] = useState(false);
  const [disableDrag, setDisableDrag] = useState(false);
  const [message, setMessage] = useState({ class: "", content: "" });
  const [oMessage, setOMessage] = useOptimistic(message);

  const [progress, setProgress] = useState(0);
  const { update } = useSession();

  async function handleInput(e) {
    e.preventDefault();
    setIsDraged(false);
    if (disableDrag) return;

    const imageFile = e.target.files[0];

    try {
      setDisableDrag(true);

      /***************************************** */
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("user", session.user.email);
      formData.append("provider", session.user.provider);
      setOMessage((prev) => ({
        ...prev,
        class: "text-black-700",
        content: "保存中 ...",
      }));
      let response = await axios.post("/api/image/upload/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgress(progress);
        },
      });

      if (response.data?.error) throw new Error();
      /************************************************ */
      //save image name into user table
      response = await axios.put("/api/db/user/update/image", {
        user: session.user,
        path: response.data.imgUrl,
        key: response.data.name,
      });

      if (response.data?.error) throw new Error();
      /***************************************** */
      update({ image: response.data.imgUrl, key: response.data.name });
      setMessage((prev) => ({
        ...prev,
        class: "text-green-500",
        content: "保存成功",
      }));
    } catch (e) {
      setMessage((prev) => ({
        ...prev,
        class: "text-red-700",
        content: "保存失败",
      }));
    } finally {
      setDisableDrag(false);
      setProgress(0);
    }
  }

  async function handleDrop(e) {
    e.preventDefault();
    setIsDraged(false);
    if (disableDrag) return;

    const imageFile = e.dataTransfer.files[0];

    try {
      setDisableDrag(true);

      /************************************** */
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("user", session.user.email);
      formData.append("provider", session.user.provider);
      setOMessage((prev) => ({
        ...prev,
        class: "text-black-700",
        content: "保存中 ...",
      }));
      let response = await axios.post("/api/image/upload/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgress(progress);
        },
      });

      if (response.data?.error) throw new Error();
      /**************************************** */
      //save image name into user table
      response = await axios.put("/api/db/user/update/image", {
        user: session.user,
        path: response.data.imgUrl,
        key: response.data.name,
      });
      if (response.data?.error) throw new Error();
      /************************************* */
      update({ image: response.data.imgUrl, key: response.data.name });
      setMessage((prev) => ({
        ...prev,
        class: "text-green-500",
        content: "保存成功",
      }));
    } catch (e) {
      setMessage((prev) => ({
        ...prev,
        class: "text-red-700",
        content: "保存失败",
      }));
    } finally {
      setDisableDrag(false);
      setProgress(0);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDraged(true);
  }
  function handleDragLeave(e) {
    e.preventDefault();
    setIsDraged(false);
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="text-sm font-serif">上传头像</label>
        <div
          className="flex items-center justify-center w-full"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onChange={handleInput}
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center text-gray-500 w-full h-50 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-slate-200 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center py-5">
              {isDraged ? (
                <IoMdCheckmarkCircleOutline size={50} />
              ) : (
                <PiUploadLight size={50} />
              )}
              <p className="mb-2 text-sm">点击或将照片拖放至此</p>
              <p className="text-xs">PNG, JPG格式(最大: 1MB)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/png,image/jpeg,image/jpg"
            />
          </label>
        </div>

        <div className="w-full h-fit bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>

        <div className="flex w-full h-[15rem]">
          <p className={`${oMessage?.class} text-sm font-sans`}>
            {oMessage?.content || ""}
          </p>
        </div>
      </div>
    </>
  );
}
