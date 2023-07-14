import Link from "next/link";
import { MdOutlineDashboard } from "react-icons/md";

export default function Dashboard() {
  return (
    <>
      <div className="relative  hover:text-black ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MdOutlineDashboard />
        </div>
        <Link href="/dashboard" className="pl-8">
          控制面板
        </Link>
      </div>
    </>
  );
}
