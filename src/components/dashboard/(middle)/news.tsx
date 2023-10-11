"use client";
import { useState, useEffect } from "react";

export default function News({ setNewsLocation }) {
  const newsLocations = [
    { position: [24.796708, 176.277178], country: "China P.R" },
    { position: [43.285203, 268.43397], country: "USA" },
    { position: [27.945886, 40.469359], country: "Africa" },
  ];

  const [i, setI] = useState(0);

  useEffect(() => {
    /*
    newsLocations.map((location) => {
      setNewsLocation((prev) => ({ ...prev, ...location }));
    });
    */
    const interval = setInterval(() => {
      setNewsLocation((prev) => ({ ...prev, ...newsLocations[i] }));
      if (i > 2) setI((prev) => (prev = 0));
      else setI((prev) => prev + 1);
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  return (
    <>
      <div className="flex gap-3 ">
        <div className="flex-none">新闻:</div>
        <div className="whitespace-nowrap font-thin text-ellipsis overflow-hidden">
          中国正经历人才流失，美国并非理想目的地
        </div>
        <div className="whitespace-nowrap font-thin text-ellipsis overflow-hidden">
          他们毕业于中国和西方的顶尖大学，曾在北京、上海、深圳过着中产阶级生活，为处于中美技术竞争中心的科技企业工作。
        </div>
      </div>
    </>
  );
}
