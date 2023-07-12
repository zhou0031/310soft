import 'server-only'
import { NextResponse } from "next/server"
import { prisma } from '../../../../prismaDB'

export async function POST(req){
   
    const user = await req.json()
    let res

    switch (user.provider){
        case 'google':
            res = await prisma.googleUser.findUnique({where:{email:user.email}})
            break;
        case 'facebook':
            res = await prisma.facebookUser.findUnique({where:{email:user.email}})
            break;
        case 'credentials':
            res = await prisma.user.findUnique({where:{email:user.email}})
            break;
    }
    
    return NextResponse.json(res)
    
}