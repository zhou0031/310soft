"use client";
import Image from "next/image";
import { PiUploadLight } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Context } from "../../app/(user)/dashboard/layout";
import { useContext, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ImageUploader() {
  const { setSelectedImage, session } = useContext(Context);
  const [isDraged, setIsDraged] = useState(false);
  const [disableDrag, setDisableDrag] = useState(false);
  const [message, setMessage] = useState<any>();
  const [progress, setProgress] = useState(0);
  const { update } = useSession();

  async function handleInput(e) {
    //console.log(e.target.files[0]);
  }

  async function handleDrop(e) {
    e.preventDefault();
    setIsDraged(false);
    if (disableDrag) return;

    const imageFile = e.dataTransfer.files[0];

    try {
      setDisableDrag(true);

      const formData = new FormData();
      formData.append("image", imageFile);
      setMessage({ class: "text-black-700", content: "保存中 ..." });
      const response = await axios.post("/api/image/upload/profile", formData, {
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

      setSelectedImage(response.data.imgUrl);
      setMessage({ class: "text-green-700", content: "保存成功" });
    } catch (e) {
      setMessage({ class: "text-red-700", content: "保存失败" });
    } finally {
      setDisableDrag(false);
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
          <p className={`${message?.class} text-sm font-sans`}>
            {message?.content || ""}
          </p>
        </div>
      </div>
    </>
  );
}
