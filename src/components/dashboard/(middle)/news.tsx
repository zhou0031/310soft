"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function News({ setNewsLocation }) {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const socket = new WebSocket("wss://websocket-news.310soft.com");

      socket.onopen = (e) => {
        socket.send(
          JSON.stringify({
            action: "OPEN",
            token: process?.env?.NEXT_PUBLIC_CF_NEWS_TOKEN,
          })
        );
      };

      socket.onmessage = (e) => {
        console.log(e.data);
      };

      socket.onerror = (error) => {
        console.error("WebSocket Error: ", error);
      };

      socket.onclose = (event) => {
        console.log("WebSocket is closed:", event);
      };

      return () => {
        socket.close();
      };
    }
  }, [status]);

  return (
    <>
      <div className="flex gap-2 ">
        <div className="flex-none">新闻:</div>
        <div className="whitespace-nowrap font-thin text-ellipsis overflow-hidden"></div>
      </div>
    </>
  );
}
