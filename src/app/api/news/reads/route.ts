import { prisma } from "../../../../prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updatedNews = await prisma.news.update({
      where: {
        id: body.id,
      },
      data: {
        reads: {
          increment: 1, //increase reads by 1
        },
      },
    });

    return NextResponse.json({
      status: 200,
      body: {
        success: true,
        data: updatedNews,
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
