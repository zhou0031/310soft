"use client";
import { useSession } from "next-auth/react";

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      {JSON.stringify(useSession())}
    </>
  );
}

export default Dashboard;
