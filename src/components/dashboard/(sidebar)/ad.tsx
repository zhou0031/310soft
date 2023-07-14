import Image from "next/image";
export default function Ad() {
  return (
    <Image
      alt="310 soft ad"
      className="rounded-lg"
      src="https://placehold.co/100x150@2x.png"
      width={100}
      height={150}
      loading="lazy"
    />
  );
}
