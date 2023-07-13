import Link from "next/link";
import { BiHelpCircle } from "react-icons/bi";

export default function Help() {
  return (
    <>
      <div className="relative hover:text-black ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <BiHelpCircle />
        </div>
        <Link href="#" className="pl-8">
          帮助 & 信息
        </Link>
      </div>
    </>
  );
}
