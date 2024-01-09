import Image from "next/image";

export default function Carousel({ images }) {
  return (
    <>
      {images.map((img, index) => {
        const obj = JSON.parse(img);
        return <p key={index}>{obj.src}</p>;
      })}
    </>
  );
}
