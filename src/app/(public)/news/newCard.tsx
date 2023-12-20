import Link from "next/link";
import Image from "next/image";

export default function NewsCard(news) {
  let obj;
  if (typeof news.photos[0] !== "undefined") {
    obj = JSON.parse(news.photos[0]);
  }

  return (
    <>
      <div className="w-52 h-fit bg-white border border-gray-200 rounded-lg shadow">
        <Link href={`/news/${news.id}`}>
          {obj && (
            <Image
              src={`https://image.310soft.com?url=${obj.src}`}
              width={150}
              height={100}
              alt={obj.alt}
            />
          )}
        </Link>
        <div className="p-2">
          <Link href={`/news/${news.id}`}>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              {news.title}
            </h5>
          </Link>
          <p className="mb-3 text-sm text-gray-400">
            {news.content.toString().slice(0, 50)}
          </p>
          <time
            className="text-xs text-gray-500"
            dateTime={`${news.published_at}`}
          >
            {news.published_at.toLocaleString("zh-CN", {
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </div>
    </>
  );
}
