import { prisma } from "../../../../prismaDB";
import { NextRequest,NextResponse } from "next/server";

export  async function GET(req:NextRequest){
    
    const skip=parseInt(req.nextUrl.searchParams.get('skip'))
    const take=parseInt(req.nextUrl.searchParams.get('take')) 
    
    try{
        
        const news = await prisma.news.findMany({
            orderBy: [
                {published_at: "desc"},
                { id: "asc" }, 
            ],
            take: take,
            skip:skip,
            include: {
            publisher: {
                select: {
                name: true,
                },
            },
            },
        });
            
        return NextResponse.json({
            status: 200, 
            success: true,
            news: news,
            
        });
        }catch(e){
        return NextResponse.json({
            status: 500,
            success: false,
            error: 'Internal Server Error',
            
        })
        }finally{
        await prisma.$disconnect()
    }
    
}