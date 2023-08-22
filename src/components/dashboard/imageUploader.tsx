"use client";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { PiUploadLight } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Context } from "../../app/(user)/dashboard/layout";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";

export default function ImageUploader() {
  const MAX_SIZE = 1 * 1024 * 1024;
  const { selectedImage, setSelectedImage, session } = useContext(Context);
  const [message, setMessage] = useState<any>();

  const { update } = useSession();

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
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size > MAX_SIZE) {
        setSelectedImage("");
        setMessage({ class: "text-red-700", content: "图片大小不超过1MB" });
        return;
      }
      setSelectedImage(URL.createObjectURL(file));
      /*
      const formData = new FormData();
      formData.append("image", file);

      let response;

      try {
        setMessage({ content: "保存中 ..." });

        //upload image
        response = await fetch("/api/image/upload/profile", {
          method: "POST",
          body: formData,
        });

        let { error, path } = await response.json();
        if (error) {
          setMessage({ class: "text-red-700", content: "保存失败" });
          return;
        }

        //update database image field
        response = await fetch("/api/db/user/update/image", {
          method: "PUT",
          body: JSON.stringify({ user: session.user, path: path }),
          headers: {
            "content-type": "application/json",
          },
        });

        let { updateUserError } = await response.json();
        if (updateUserError) {
          setMessage({ class: "text-red-700", content: "保存失败" });
          return;
        }
        //update current session user
        update({ image: path });
       
        setMessage({});
      } catch (e) {
        setMessage({ class: "text-red-700", content: "保存失败" });
      }
      */
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
              <p>上传头像 (JPEG, PNG, 不超过1MB)</p>{" "}
              <p>点击上传或图片拖放至此</p>
            </div>
          </div>
        </div>

        <div className="flex w-full h-[15rem]">
          {selectedImage ? (
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <Image
                  src={selectedImage}
                  alt="image_uploading"
                  quality={60}
                  width={150}
                  height={150}
                  style={{ objectFit: "contain" }}
                />
                <button className="btn font-sans bg-slate-500 hover:bg-slate-400 text-white font-thin py-1 px-4 rounded">
                  保存
                </button>
              </div>
              <div>Progrress Bar</div>
            </div>
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
