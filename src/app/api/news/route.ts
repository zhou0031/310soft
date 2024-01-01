import { prisma } from "../../../prismaDB";
import { NextResponse } from "next/server";

export async function GET(req:Request){
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
      return NextResponse.json(news);
}