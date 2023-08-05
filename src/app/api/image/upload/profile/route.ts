import "server-only"
import { writeFile } from 'fs/promises';
import { NextResponse,NextRequest } from 'next/server';
import { join } from 'path';
import { fileTypeFromBuffer } from 'file-type';
import cryptoRandomString from 'crypto-random-string';
import { prisma } from '../../../../../prismaDB';


export async function POST(req:NextRequest){
    const allowed_types=['image/png','image/jpeg','image/jpg']
    const allowed_extensions=['png','jpeg','jpg']
    const MAX_SIZE=2*1024*1024
    const data=await req.formData()    
    const image:File|null = data.get('image') as unknown as File
    const file_extension=image.name.slice(((image.name.lastIndexOf('.')-1)>>>0)+2)

    if(!image)
        return NextResponse.json({error:true})

    if(!allowed_extensions.includes(file_extension)||!allowed_types.includes(image.type))
        return NextResponse.json({error:true})
        
    if(image.size>MAX_SIZE)
        return NextResponse.json({error:true})

    const bytes=await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
   
    const signature=await fileTypeFromBuffer(buffer)
    if(!allowed_types.includes(signature?.mime))
        return NextResponse.json({error:true})
    
    const fileName=`${cryptoRandomString({ length: 32, type: 'alphanumeric' })}.png`

    const path=join("/","/home/ryan/Desktop/images/profile",fileName)
    await writeFile(path,buffer)   

    return NextResponse.json({path:path})
}

