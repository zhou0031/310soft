"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function Dashboard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session?.user && status === "unauthenticated") {
      window.location.replace("/sign_in?error=此账户被禁用");
    }
  }, [session?.user, status]);

  return (
    <>
      <h1>Dashboard</h1>
      {JSON.stringify({ session, status })}
    </>
  );
}

export default Dashboard;
