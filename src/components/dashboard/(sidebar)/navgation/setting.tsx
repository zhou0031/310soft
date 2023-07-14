import { AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";

export default function Setting() {
  return (
    <>
      <div className="relative  hover:text-black ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AiOutlineSetting />
        </div>
        <Link href="/dashboard/setting" className="pl-8">
          设置
        </Link>
      </div>
    </>
  );
}
