import { NextResponse } from "next/server";
import { prisma } from "../../../../prismaDB";

async function getNewsById(id) {
  "use server";
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
      <div className="">{JSON.stringify(news)}</div>
    </>
  );
}
