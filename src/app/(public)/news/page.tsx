import NewsCard from "./newsCard";

async function getNews() {
  try {
    const response = await fetch("http://127.0.0.1:3000/api/news", {
      //cache: "force-cache", //SSG-Static Site Generation
      //cache: "no-store", //SSR-Server Side Rendering

      next: {
        revalidate: 20, //ISR-Incremental Static Rengenration
      },
    });

    return await response.json();
  } catch (e) {
    console.log(e);
  }
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
