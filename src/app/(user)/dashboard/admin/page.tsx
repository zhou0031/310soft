"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // @ts-ignore
    if (session?.user?.role !== "ADMIN") router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>Admin</>;
}
