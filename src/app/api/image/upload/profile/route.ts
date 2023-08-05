import { writeFile } from 'fs/promises';
import { NextResponse,NextRequest } from 'next/server';
import { join } from 'path';

export async function POST(req:NextRequest){
    const data=await req.formData()    
    const image:File|null = data.get('image') as unknown as File

    if(!image)
        return NextResponse.json({error:true})
    
    const bytes=await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path=join("/","/home/ryan/Desktop/images/profile",image.name)
    await writeFile(path,buffer)   
    
    return NextResponse.json("")
}

