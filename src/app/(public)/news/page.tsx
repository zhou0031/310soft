import NewsCard from "../../../components/news/newsCard";

export const dynamic = "force-dynamic";

async function getNews() {
  try {
    const response = await fetch("http://localhost:3000/api/news", {
      method: "PUT",
      //cache: "force-cache", //SSG-Static Site Generation
      //cache: "no-store", //SSR-Server Side Rendering
      next: {
        revalidate: 300, //ISR-Incremental Static Rengenration
      },
    });

    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

export default async function News() {
  const response = await getNews();
  const news = response?.body?.data;

  return (
    <>
      <div className="flex flex-wrap justify-between min-w-[100rem] max-w-[100rem] gap-2 p-5">
        {news && news.map((p) => <NewsCard key={p.id} {...p} />)}
      </div>
    </>
  );
}
