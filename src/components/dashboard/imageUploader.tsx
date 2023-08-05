"use client";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { PiUploadLight } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Context } from "../../app/(user)/dashboard/layout";
import { useContext, useState } from "react";

export default function ImageUploader() {
  const MAX_SIZE = 2 * 1024 * 1024;
  const { selectedImage, setSelectedImage } = useContext(Context);
  const [message, setMessage] = useState<any>();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1, // Limit to one file
    multiple: false,
    accept: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
    },
  });

  async function handleDrop(acceptedFiles) {
    // Handle the dropped file here
    setSelectedImage("");
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size > MAX_SIZE) {
        setMessage({ class: "text-red-700", content: "图片大小不超过2MB" });
        return;
      }

      const formData = new FormData();
      formData.set("image", file);

      try {
        setMessage({ content: "保存中 ..." });
        const response = await fetch("/api/image/upload/profile", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          setSelectedImage(URL.createObjectURL(file));
          return;
        }
        setMessage({ class: "text-red-700", content: "保存失败" });
      } catch (e) {
        setMessage({ class: "text-red-700", content: "保存失败" });
      }
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="flex justify-center items-center gap-5 p-10 bg-slate-200 text-slate-400 rounded-lg hover:text-black border-2 border-dashed border-blue-400 cursor-pointer">
            {isDragActive ? (
              <IoMdCheckmarkCircleOutline size={50} />
            ) : (
              <PiUploadLight size={50} />
            )}
            <div className="flex flex-col break-all font-serif text-sm">
              <p>上传头像 (JPEG, PNG, 不超过2MB)</p>{" "}
              <p>点击上传或图片拖放至此</p>
            </div>
          </div>
        </div>

        <div className="flex w-full h-[15rem]">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="image_uploading"
              quality={60}
              width={250}
              height={250}
              style={{ objectFit: "contain" }}
            />
          ) : (
            <p className={`${message?.class} text-sm font-sans`}>
              {message?.content || ""}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
