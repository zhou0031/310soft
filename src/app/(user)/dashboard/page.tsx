"use client";
import dynamic from "next/dynamic";
import Welcome from "../../../components/dashboard/(middle)/welcome";

const OpenStreetMap = dynamic(
  () => import("../../../components/dashboard/(middle)/openstreetmap"),
  { ssr: false }
);

function Dashboard() {
  return (
    <>
      <div className="flex flex-col">
        <Welcome />
      </div>
    </>
  );
}

export default Dashboard;
