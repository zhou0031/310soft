import 'server-only'
import { NextResponse } from "next/server"
import { prisma } from '../../../../prismaDB'

export async function POST(req){
    
    const user = await req.json()
    let res
   
    switch (user.provider){
        case 'google':
            res = await prisma.googleUser.findUnique(
                {
                    where:{email:user.email},
                    include:{
                        address:{select:{street:true,city:true,state:true,country:true,zip:true,googleUserId:true,id:true}},
                        contact:true
                    },
                    
                })
            break;
        case 'facebook':
            res = await prisma.facebookUser.findUnique(
                {
                    where:{email:user.email},
                    include:{
                        address:{select:{street:true,city:true,state:true,country:true,zip:true,facebookUserId:true,id:true}},
                        contact:true
                    }
                })
            break;
        case 'credentials':
            res = await prisma.user.findUnique(
                {
                    where:{email:user.email},
                    include:{
                        address:{select:{street:true,city:true,state:true,country:true,zip:true,userId:true,id:true}},
                        contact:true
                    }
                })
            delete res.password      
            break;
    }
    
    return NextResponse.json(res)
}