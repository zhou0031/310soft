import Link from "next/link";
import Image from "next/image";
import styles from "../../../styles/scrollbar.module.css";
import Reads from "./reads";

export default function NewsCard(news) {
  let obj;
  if (typeof news.photos !== "undefined" && news.photos.length > 0) {
    for (let i = 0; i < news.photos.length; i++) {
      const photoObj = JSON.parse(news.photos[i]);
      if (photoObj.src) {
        obj = photoObj;
        break;
      }
    }
  }
  return (
    <>
      <div
        className={`flex flex-col w-52 h-96 bg-slate-100 border border-gray-200 rounded-lg shadow overflow-auto ${styles["my-custom-scrollbar"]}`}
      >
        <Link href={`/news/${news.id}`}>
          {obj?.src && (
            <Image
              src={`https://image.310soft.com?url=${obj.src}`}
              width={150}
              height={100}
              className="w-full"
              alt={obj.alt || news.title}
            />
          )}
        </Link>
        <div className="p-2 flex-grow flex flex-col">
          <Link href={`/news/${news.id}`}>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              {news.title}
            </h5>
          </Link>
          <p className="mb-3 text-sm text-gray-400">
            {news.content.toString().slice(0, 80)}
          </p>
          <div className="flex-grow"></div>
          <div className="flex justify-between text-xs text-gray-500">
            <time dateTime={`${news.published_at}`}>
              {new Date(news.published_at).toLocaleString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </time>
            <Reads number={1} />
          </div>
        </div>
      </div>
    </>
  );
}
