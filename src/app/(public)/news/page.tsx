import { prisma } from "../../../prismaDB";
import NewsCard from "./newsCard";

async function getNews() {
  const news = await prisma.news.findMany({
    orderBy: {
      published_at: "desc",
    },
    take: 14,
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
      {news.map((p) => (
        <NewsCard key={p.id} {...p} />
      ))}
    </>
  );
}
