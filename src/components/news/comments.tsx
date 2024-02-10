"use client";
import { useEffect } from "react";
import io from "socket.io-client";

export default function Comments({ newsId }) {
  useEffect(() => {
    const socket = io("http://localhost:3001/news");
    console.log(socket);
    socket.on("comments", (data) => {
      console.log("Received comments update:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [newsId]);
  return <>{newsId}</>;
}
