"use client";
import { useSession } from "next-auth/react";
import { DefaultSession } from "next-auth";
import { useEffect } from "react";
import io from "socket.io-client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

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

  return (
    <>
      <div className="text-lg font-bold text-gray-500">1983 条评论</div>
      <div className="w-full h-3/5 min-h-[620px] max-h-[860px]"></div>
    </>
  );
}
