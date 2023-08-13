import "server-only"
import { prisma } from "../../../../../../prismaDB";
import { NextResponse } from "next/server";

export async function PUT(req){
    const {user,path} = await req.json()
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
        return NextResponse.json({updateUserError:true})
    }
    return NextResponse.json({updatedUser:updatedUser})
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