"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { PiUploadLight } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Context } from "../../app/(user)/dashboard/layout";
import { useContext } from "react";

export default function ImageUploader() {
  const MAX_SIZE = 2 * 1024 * 1024;
  //const [selectedImage, setSelectedImage] = useState(null);
  const { selectedImage, setSelectedImage } = useContext(Context);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1, // Limit to one file
    maxSize: MAX_SIZE,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  function handleDrop(acceptedFiles) {
    // Handle the dropped file here
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size <= MAX_SIZE) setSelectedImage(URL.createObjectURL(file));
      else alert("Please select an image smaller than 2MB");
    }
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="flex justify-center items-center gap-5 p-10 bg-slate-200 text-slate-400 rounded-lg hover:text-black cursor-pointer">
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
            ""
          )}
        </div>
      </div>
    </>
  );
}
