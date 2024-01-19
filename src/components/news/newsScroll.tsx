"use client";
import NewsCard from "./newsCard";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const TAKE = 14;

export default function NewsScroll() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const isMounted = useRef(false);

  const loadData = async (page) => {
    const skip = (page - 1) * TAKE;
    const response = await axios.get(
      `http://localhost:3000/api/news/fetch?skip=${skip}&take=${TAKE}`
    );
    const { news } = await response.data;
    setData((prevData) => [...prevData, ...news]);
  };

  useEffect(() => {
    if (isMounted.current && page > 1) loadData(page);
  }, [page]);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.scrollHeight;
    if (
      scrollPosition >= documentHeight &&
      scrollPosition + window.innerHeight >= documentHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Set isMounted to true when the component mounts
    isMounted.current = true;
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-between min-w-[100rem] max-w-[100rem] gap-2 p-5">
        {data && data.map((p) => <NewsCard key={p.id} {...p} />)}
      </div>
    </>
  );
}
