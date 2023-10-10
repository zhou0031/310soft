"use client";
import { useEffect } from "react";

export default function News({ location, setLocation }) {
  useEffect(() => {
    //setLocation((prev) => ({ ...prev, country: "China P.R" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
