import Image from "next/image";
import Link from "next/link";

export default function Ad() {
  return (
    <Link href="#">
      <Image
        alt="310 soft ad"
        className="rounded-lg"
        src="https://placehold.jp/100x150.png"
        width={100}
        height={150}
        loading="lazy"
      />
    </Link>
  );
}