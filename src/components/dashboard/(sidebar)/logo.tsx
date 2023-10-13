import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        alt="310 soft"
        className="rounded-lg"
        src="/logo.jpg"
        width={100}
        height={50}
        priority
        unoptimized
      />
    </Link>
  );
}
