"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import io from "socket.io-client";

export default function Comments({ newsId }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    const socket = io("http://localhost:3001/news");

    socket.on("comments", (data) => {
      console.log("Received comments update:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [newsId]);

  return <>ID:{session?.user?.id}</>;
}
