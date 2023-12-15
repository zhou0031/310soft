import Link from "next/link";
import { prisma } from "../../../prismaDB";
import NewsLayout from "./layout";

async function getNews() {
  const news = await prisma.news.findMany({
    orderBy: {
      published_at: "desc",
    },
    take: 10,
    include: {
      publisher: {
        select: {
          name: true,
        },
      },
    },
  });
  return news;
}

export default async function News() {
  const news = await getNews();
  return (
    <>
      <NewsLayout>
        <ul>
          {news.map((p) => (
            <li key={p.id}>
              <Link href={`/news/${p.id}`}>
                {p.title}-{p.published_at.toDateString()}-{p.publisher.name}
              </Link>
            </li>
          ))}
        </ul>
      </NewsLayout>
    </>
  );
}
