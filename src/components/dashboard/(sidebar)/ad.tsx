import Image from "next/image";
import Link from "next/link";

export default function Ad() {
  return (
    <Link href="#">
      <Image
        alt="310 soft ad"
        className="rounded-lg"
        src="https://placehold.jp/120x150.png"
        width={120}
        height={150}
        loading="lazy"
      />
    </Link>
  );
}
