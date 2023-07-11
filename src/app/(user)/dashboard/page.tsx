"use client";
import { useSession } from "next-auth/react";

function Dashboard() {
  const { data: session, status } = useSession();

  return (
    <>
      <h1>Dashboard</h1>
      {JSON.stringify(session)}
    </>
  );
}

export default Dashboard;
