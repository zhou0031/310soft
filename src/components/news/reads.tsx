"use client";
import { useEffect } from "react";
import axios from "axios";

export default function Reads({ id }) {
  useEffect(() => {
    if (document.visibilityState === "visible") {
      axios.put("http://localhost:3000/api/news/reads", { id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return <></>;
}
