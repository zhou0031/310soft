"use client";
import styles from "../../../styles/scrollbar.module.css";
import Loading from "../../app/(user)/dashboard/loading";
import { useSession } from "next-auth/react";
import { DefaultSession } from "next-auth";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
  const { isPending, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/comments").then((res) =>
        res.json()
      ),
  });

  /*
  useEffect(() => {
    
    const socket = io("http://localhost:3001/news");

    socket.on("comments", (data) => {
      console.log("Received comments update:", data);
    });

    return () => {
      socket.disconnect();
    };
    

  }, [newsId]);
  */
  if (isPending) return <Loading />;
  if (error) return `${error.message} 读取失败`;
  return (
    <>
      <div className="text-lg font-bold text-gray-500">
        {data.length} 条评论
      </div>
      <div
        className={`w-full h-3/5 min-h-[620px] max-h-[860px] px-5 overflow-auto ${styles["my-custom-scrollbar"]}`}
      >
        {data.map((comment) => (
          <p key={comment.id}>{comment.name}</p>
        ))}
      </div>
    </>
  );
}
