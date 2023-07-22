"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loading from "../loading";

export default function Setting() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user && status === "authenticated") {
      fetch("/api/db/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session.user),
      })
        .then((d) => d.json())
        .then((data) => {
          setUserInfo(data);
          setLoading(false);
        });
    }
  }, [session?.user, status]);

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  return <>{JSON.stringify(userInfo)}</>;
}
