import 'server-only'
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export async function POST(req:Request){
    const token = await req.json()
    
    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        return NextResponse.json(decoded)   
    }catch(e){
       
        return NextResponse.json({})
    }   
}