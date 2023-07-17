import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative  hover:text-black ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AiOutlineHome />
        </div>
        <Link href="/" className="pl-8">
          网站首页
        </Link>
      </div>
    </>
  );
}
