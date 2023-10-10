import Image from "next/image";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Context } from "../../../app/(user)/dashboard/layout";
import { useContext, useEffect, useState } from "react";

export default function ProfileCard() {
  const { formData, session } = useContext(Context);
  const [imgSource, setImgSource] = useState(session?.user.image);

  useEffect(() => {
    if (session?.user.image != null) setImgSource(session?.user.image);
  }, [session?.user?.image]);

  return (
    <div className="flex flex-col gap-2 items-center bg-slate-200 rounded-lg p-8">
      <div className="flex h-[5rem]">
        <Image
          src={imgSource ? imgSource : "https://placehold.co/80x80.webp"}
          quality={50}
          width={80}
          height={80}
          alt={session?.user.name ? session.user.name : ""}
          style={{ objectFit: "cover" }}
          className="rounded-full  border-2 border-cyan-50"
          unoptimized
        />
      </div>

      <div className="w-full text-center whitespace-nowrap font-sans text-ellipsis overflow-hidden ...">
        {formData.name || session?.user.name}
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

function isHttpValid(str) {
  try {
    const newUrl = new URL(str);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}
