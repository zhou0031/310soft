"use client";
import { useSession } from "next-auth/react";

export default function Ad_Admin() {
  const { data: session, status } = useSession();

  return <>{session}</>;
}
