import Link from "next/link";
import { BiHelpCircle } from "react-icons/bi";
import { usePathname } from "next/navigation";

export default function Help() {
  return (
    <>
      <div
        className={`${
          usePathname() == "/dashboard/help" ? "text-black" : ""
        } relative hover:text-black`}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <BiHelpCircle />
        </div>
        <Link href="/dashboard/help" className="pl-8">
          帮助 & 信息
        </Link>
      </div>
    </>
  );
}
