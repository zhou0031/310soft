import 'server-only'
import { NextResponse } from "next/server"
import { prisma } from '../../../../prismaDB'
import {cookies} from 'next/headers'

export async function POST(req:Request){
    const res = await req.json()
    let user, error    
    console.log(res)
    /*    
    switch (res.provider){
        case 'google':
            user = await prisma.googleUser.findUnique({where:{email:res.email}})
            break;
        case 'facebook':
            user = await prisma.facebookUser.findUnique({where:{email:res.email}})
            break;
        case 'credentials':
            user = await prisma.user.findUnique({where:{email:res.email}})
            break;
    }
   
    if(!user.isAllowed) {
        cookies().set({
            name: 'next-auth.session-token',
            value: '',
            expires:0,
            path: '/',
          })
        error="此账户被禁用"
    }
    
    return NextResponse.json({stat:user.isAllowed,err:error})
    */
    return NextResponse.json({})
}