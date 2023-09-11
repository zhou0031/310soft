import "server-only"
import { fileTypeFromBuffer } from 'file-type';
import cryptoRandomString from 'crypto-random-string';
import {
    S3Client,
    PutObjectCommand,
  } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import path from "path"

  const S3 = new S3Client({
    region: "auto",
    endpoint:process.env.CLOUDFLARE_R2_URL,
      
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_S3_CLIENT_ID,
      secretAccessKey:process.env.CLOUDFLARE_S3_SECRET
    },
  });
  
export async function POST(req:NextRequest){
  try{
    const data = await req.formData()   
    const image:File|null = data.get('image') as unknown as File
    const imageBuffer=await isValidImage(image)
    
    const key=path.join('profile',`${cryptoRandomString({ length: 30, type: 'alphanumeric' })}.png`)
  
    const user=data.get("user").toString()
    const provider=data.get("provider").toString()
    
    const SaveObjectCommand = new PutObjectCommand({
      Bucket:process.env.CLOUDFLARE_R2_BUCKET,
      Key: key,
      Body: imageBuffer, 
      Metadata:{
        "user":user,
        "provider":provider
      }
    })    

    await S3.send(SaveObjectCommand);
        
    return NextResponse.json({name:key,imgUrl:path.join(process.env.CLOUDFLARE_R2_CUSTOM_DOMAIN,key)})
  }catch(e){
    
    return NextResponse.json({error:true})
  }
}

async function isValidImage(image){
  const allowed_types=['image/png','image/jpeg','image/jpg']
  const allowed_extensions=['png','jpeg','jpg']
  const MAX_SIZE=1*1024*1024
  const file_extension=image.name.slice(((image.name.lastIndexOf('.')-1)>>>0)+2)
  
  if(!image) throw new Error
  if(!allowed_extensions.includes(file_extension)||!allowed_types.includes(image.type)) throw new Error
  if(image.size>MAX_SIZE) throw new Error

  const bytes=await image.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const signature=await fileTypeFromBuffer(buffer)
  if(!allowed_types.includes(signature?.mime)) throw new Error
  
  return buffer
}
