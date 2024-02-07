"use client";
import debounce from "lodash.debounce";
import NewsCard from "./newsCard";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const TAKE = 14;
const SESSION_STORAGE_LIMIT = 200;

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
    // Save data to session storage
    //if the page is less than SESSION_STORAGE_LIMIT to prevent session storage full
    if (page <= SESSION_STORAGE_LIMIT)
      sessionStorage.setItem("newsData", JSON.stringify([...data]));
  };

  useEffect(() => {
    if (page > 1) {
      loadData(page);
      //if the page is less than SESSION_STORAGE_LIMIT to prevent session storage full
      if (page <= SESSION_STORAGE_LIMIT)
        sessionStorage.setItem("newsPage", page.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  /******** handle scrolling **********/
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    if (scrollPosition + windowHeight >= documentHeight && scrollPosition > 0) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  /********* add scrolling ************/
  const debouncedHandleScroll = useRef(debounce(handleScroll, 300)).current;
  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    isMounted.current = true;

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);
  /***********************************/
  useEffect(() => {
    const cachedData = sessionStorage.getItem("newsData");
    const cachedPage = sessionStorage.getItem("newsPage");

    if (isMounted.current && cachedData && cachedPage) {
      setData((prevData) => [...JSON.parse(cachedData)]);
      setPage(parseInt(cachedPage));
    }
  }, []);
  /**********************************/
  return (
    <>
      <div className="flex flex-wrap justify-between min-w-[100rem] max-w-[100rem] gap-2 px-5">
        {data && data.map((p, index) => <NewsCard key={p.id} {...p} />)}
      </div>

      <span
        className="text-zinc-700 cursor-pointer underline p-5"
        onClick={() => setPage((prevPage) => prevPage + 1)}
      >
        更多新闻
      </span>
    </>
  );
}
