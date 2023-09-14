import { RiPassValidLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Password() {
  return (
    <>
      <div
        className={`${
          usePathname() == "/dashboard/password" ? "text-black" : ""
        } relative hover:text-black`}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <RiPassValidLine />
        </div>
        <Link href="/dashboard/password" className="pl-8">
          修改密码
        </Link>
      </div>
    </>
  );
}
