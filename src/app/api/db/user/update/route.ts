import "server-only"
import { prisma } from "../../../../../prismaDB";
import { NextResponse } from "next/server";

export async function PUT(req){
    const {formData,session} = await req.json()
    const user = session.user
    


    //check google,facebook, or credential user to
    //update right table
    const updatedUser = await prisma.user.update({
        where:{
            email:user.email,
        },
        data:{
            name:formData.name,  
        },
        
        }
    )

    return NextResponse.json(updatedUser)
}