import { NextResponse } from "next/server";
import { prisma } from "../../../../prismaDB";
import Slide from "../../../../components/slide/slide";
import Reads from "../../../../components/news/reads";
import Comments from "../../../../components/news/comments";

export async function generateStaticParams() {
  const response = await fetch("http://localhost:3000/api/news", {
    method: "PUT",
  });
  const json = await response.json();
  const news = json?.body?.data;

  return (
    news &&
    news.map((i) => ({
      id: i.id,
    }))
  );
}

async function getNewsById(id) {
  ("use server");
  try {
    const response = await prisma.news.findUnique({
      where: { id: id },
    });
    return NextResponse.json({
      status: 200,
      body: {
        success: true,
        data: response,
      },
    });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      body: {
        success: false,
        error: "Internal Server Error",
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}

export default async function Page({ params }) {
  const { id } = params;
  const data = await getNewsById(id);
  const json = await data.json();
  const news = json?.body?.data;
  return (
    <>
      <Reads id={id} />
      <div className="flex p-5 gap-5">
        <div className="w-1/3 flex flex-col items-center max-lg:hidden">
          asdasdsa
        </div>

        <div className="w-1/3 flex flex-col max-lg:w-full">
          <h1 className="text-3xl font-semibold">{news?.title}</h1>
          <time className="my-3 text-slate-500" dateTime={news?.published_at}>
            {new Date(news?.published_at).toLocaleString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          {news?.photos.length > 0 && <Slide images={news?.photos} />}

          <div className="mt-10">
            {news?.content.map((p, index) => (
              <p key={index} className="my-3 text-lg">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="w-1/3 flex flex-col max-lg:hidden">
          <Comments newsId={id} />
        </div>
      </div>
    </>
  );
}
