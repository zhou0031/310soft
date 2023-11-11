"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function News({ setNewsLocation }) {
  const { status } = useSession();
  const [content, setContent] = useState("");

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

      socket.onmessage = async (e) => {
        const json = await JSON.parse(e.data);
        setNewsLocation({ place: json?.place, position: json?.coordinates });
        setContent((prevContent) => json?.news.content);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <div className="flex gap-2 ">
        <div className="flex-none font-bold">新闻:</div>
        <div className="whitespace-nowrap font-normal text-ellipsis overflow-hidden">
          {content}
        </div>
      </div>
    </>
  );
}
