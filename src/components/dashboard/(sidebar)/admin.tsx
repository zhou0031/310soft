import Link from "next/link";
import { AiOutlineDatabase } from "react-icons/ai";
import { usePathname } from "next/navigation";

export default function Admin() {
  return (
    <>
      <div
        className={`${
          usePathname() == "/dashboard/admin" ? "text-black" : ""
        } relative hover:text-black`}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AiOutlineDatabase />
        </div>
        <Link href="/dashboard/admin" className="pl-8">
          管理员
        </Link>
      </div>
    </>
  );
}
