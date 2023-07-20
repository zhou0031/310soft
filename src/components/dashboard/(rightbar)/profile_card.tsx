import { useSession } from "next-auth/react";
import Image from "next/image";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function ProfileCard() {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col gap-2 items-center bg-slate-200 rounded-lg py-8 px-10">
      {session?.user.image && (
        <Image
          src={session?.user.image}
          width={80}
          height={80}
          alt={session?.user.name}
          className="rounded-full  border-2 border-cyan-50"
        />
      )}
      <div className="w-full text-center whitespace-nowrap font-sans text-ellipsis overflow-hidden ...">
        {session?.user.name}
      </div>
      <div className="w-full text-center whitespace-nowrap font-sans text-ellipsis overflow-hidden ... text-xs text-slate-400">
        {session?.user.email}
      </div>
      <div className="flex gap-5 mt-2 max-md:hidden">
        <Link
          href="/dashboard"
          className="rounded-full bg-white p-2 hover:bg-slate-300"
        >
          <RiDashboardFill />
        </Link>

        <Link
          href="/dashboard/setting"
          className="rounded-full bg-white p-2 hover:bg-slate-300"
        >
          <PiDotsThreeOutlineVerticalFill />
        </Link>
        <button
          className="rounded-full bg-white p-2 hover:bg-slate-300"
          onClick={() => signOut()}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
}
