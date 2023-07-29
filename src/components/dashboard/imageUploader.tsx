"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { PiUploadLight } from "react-icons/pi";

export default function ImageUploader() {
  const MAX_SIZE = 2 * 1024 * 1024;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDrop = (acceptedFiles) => {
    // Handle the dropped file here
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size <= MAX_SIZE) setSelectedImage(URL.createObjectURL(file));
      else alert("Please select an image smaller than 2MB");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1, // Limit to one file
    maxSize: MAX_SIZE,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  return (
    <>
      <div className="flex flex-col gap-5 font-serif text-sm">
        <p>上传头像 (JPEG, PNG, 不超过2MB)</p>

        <div
          {...getRootProps()}
          className={`dropzone ${
            isDragActive ? "active" : ""
          } flex items-center justify-center gap-5`}
        >
          <input {...getInputProps()} />
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="image_uploading"
              width={400}
              height={400}
            />
          ) : (
            <div className="text-slate-400">
              <PiUploadLight size={80} />
              点击上传或图片拖放至此
            </div>
          )}
        </div>
      </div>
    </>
  );
}
