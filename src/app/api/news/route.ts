import { prisma } from "../../../prismaDB";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PUT(req:NextRequest){
  try{
    
    const news = await prisma.news.findMany({
      orderBy: [
        {published_at: "desc"},
        { id: "asc" }, 
        ],
        take: 14,
        include: {
          publisher: {
            select: {
              name: true,
            },
          },
        },
      });
    
      /*
      const response=await fetch("https://worldtimeapi.org/api/timezone/Asia/Shanghai")
      const news=await response.json()
      */
      const path=req.nextUrl.pathname
      revalidatePath(path)   
      
      return NextResponse.json({
        status: 200,
        body: {
          success: true,
          data: news,
        },
      });
    }catch(e){
      return NextResponse.json({
        status: 500,
        body: {
          success: false,
          error: 'Internal Server Error',
        },
      })
    }finally{
      await prisma.$disconnect()
    }
}