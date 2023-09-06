import "server-only"
import { prisma } from "../../../../../../prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest){
    
    const {user,path,key} = await req.json()
  
    let updatedUser
    try{    
        switch(user.provider){
            case 'google':
                updatedUser=await updateGoogleUser(user,path)
                break;
            case 'facebook':
                updatedUser=await updateFacebookUser(user,path)
                break;
            default:
                updatedUser=await updateCredientialUser(user,path)
            break;
        }
    }catch(e){
        return NextResponse.json({error:true,name:key})
    }
    delete updatedUser['password']
    return NextResponse.json({user:updatedUser,imgUrl:path,name:key})
}

export async function updateGoogleUser(user,path){
    try{
    const updatedUser = await prisma.googleUser.update({
            where:{
                email:user.email,
            },
            data:{
                image:path,  
            },
        }
    )
    return updatedUser
    }catch(e){
        throw e
    }
}

export async function updateFacebookUser(user,path){
    try{
    const updatedUser = await prisma.facebookUser.update({
        where:{
            email:user.email,
        },
        data:{
            image:path,  
        },   
    })
    return updatedUser
    }catch(e){
        throw e
    }
}

export async function updateCredientialUser(user,path){
    try{
    const updatedUser = await prisma.user.update({
            where:{
                email:user.email,
            },
            data:{
                image:path,  
            },
        }
    )
    return updatedUser
    }catch(e){
        throw e
    }
}