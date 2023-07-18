import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfileCard() {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col gap-2 items-center bg-slate-200 rounded-lg p-24">
      {session?.user.image && (
        <Image
          src={session?.user.image}
          width={80}
          height={80}
          alt={session?.user.name}
          className="rounded-full  border-2 border-cyan-50"
        />
      )}
      <div className="font-sans">{session?.user.name}</div>
    </div>
  );
}
