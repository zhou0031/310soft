import { NextResponse } from "next/server";
import { prisma } from "../../../../prismaDB";
import Carousel from "../../../../components/carousels/carousel";

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
      <div className="w-full flex justify-center">
        <div className="w-1/3  flex flex-col ">
          <h1 className="text-3xl font-semibold">{news.title}</h1>
          <time className="my-3 text-slate-500" dateTime={news.published_at}>
            {new Date(news.published_at).toLocaleString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <Carousel images={news.photos} />
          <div>
            {news.content.map((p, index) => (
              <p key={index} className="my-3">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
