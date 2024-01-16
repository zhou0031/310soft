"use client";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function Slide({ images }) {
  return (
    <>
      <Splide options={{ arrows: images.length > 1 ? true : false }}>
        {images?.map((img, index) => {
          const obj = JSON.parse(img);
          return (
            <SplideSlide key={index} className="flex justify-center">
              <Image
                key={index}
                loading="lazy"
                src={`https://image.310soft.com?url=${obj.src}`}
                alt={obj.alt}
                height={800}
                width={600}
                style={{ objectFit: "contain" }}
                className="w-fit h-96"
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </>
  );
}
