import Image from "next/image";

export default function Carousel({ images }) {
  return (
    <>
      {images.map((img, index) => {
        const obj = JSON.parse(img);
        return (
          <Image
            key={index}
            loading="lazy"
            src={`https://image.310soft.com?url=${obj.src}`}
            alt={obj.alt}
            height={1000}
            width={1000}
            className="w-fit h-fit"
          />
        );
      })}
    </>
  );
}
