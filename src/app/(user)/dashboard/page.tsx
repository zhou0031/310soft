"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import Welcome from "../../../components/dashboard/(middle)/welcome";
import News from "../../../components/dashboard/(middle)/news";

const OpenStreetMap = dynamic(
  () => import("../../../components/dashboard/(middle)/openstreetmap"),
  { ssr: false }
);

function Dashboard() {
  const [newsLocation, setNewsLocation] = useState({
    place: "",
    position: "",
  });

  return (
    <>
      <div className="flex flex-col">
        <Welcome />
        <OpenStreetMap newsLocation={newsLocation} />
        <News setNewsLocation={setNewsLocation} />
      </div>
    </>
  );
}

export default Dashboard;
