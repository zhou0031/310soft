import { prisma } from "../../../../prismaDB";
import { NextResponse } from "next/server";

export async function GET(req){
    
    return NextResponse.json({})

    /*
  try{
    const result = await prisma.news.findUnique({
        where: { id: id },
      });
      return NextResponse.json({
        status: 200,
        body: {
          success: true,
          data: result,
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
    }*/
}