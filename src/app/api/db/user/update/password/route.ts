import { prisma } from "../../../../../../prismaDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

const CREDENTIAL="credentials"

export async function POST(req:NextRequest){
    const {input,user}=await req.json()
    
    //check if user is a credential user
    if(user.provider!==CREDENTIAL)
        return NextResponse.json({error:true})
    
    //check user's old password
    const res = await prisma.user.findUnique({where:{email:user.email}})    
    const validPassword=await bcrypt.compare(input.old_password,res.password)
    if(!validPassword) return NextResponse.json({error:true})
    
    //check new passwords match
    if(input.new_password_1!==input.new_password_2) 
        return NextResponse.json({error:true})
    
    //update new password   
    try{
        const updatedUser = await updateCredientialUser(user,input.new_password_1)
        delete updatedUser['password']
        return NextResponse.json({user:updatedUser,error:false})
    }catch(e){
        return NextResponse.json({error:true})
    }
}

async function updateCredientialUser(user,password){
    const hashedPassword=await bcrypt.hash(password,10)
    try{
    const updatedUser = await prisma.user.update({
            where:{
                email:user.email,
            },
            data:{
               password:hashedPassword 
            },
        }
    )
    return updatedUser
    }catch(e){
        throw e
    }
}