import Link from "next/link";
import Image from "next/image";

export default function newsCard(news) {
  let obj;
  if (typeof news.photos[0] !== "undefined") {
    obj = JSON.parse(news.photos[0]);
  }

  return (
    <>
      <div className="w-48 h-fit bg-white border border-gray-200 rounded-lg shadow">
        <Link href={`/news/${news.id}`}>
          {obj && (
            <Image
              src={`https://image.310soft.com?url=${obj.src}`}
              width={350}
              height={250}
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
          <p className="mb-3 text-sm text-gray-400 whitespace-nowrap text-ellipsis overflow-hidden">
            {news.content}
          </p>
        </div>
      </div>
    </>
  );
}
