import "server-only"
import { NextResponse ,NextRequest} from 'next/server';
import {
  S3Client,
  DeleteObjectCommand
} from "@aws-sdk/client-s3";

const S3 = new S3Client({
  region: "auto",
  endpoint:process.env.CLOUDFLARE_R2_URL,
    
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_S3_CLIENT_ID,
    secretAccessKey:process.env.CLOUDFLARE_S3_SECRET
  },
});

export async function DELETE(req:NextRequest,{params}){ 
  const {image}=params
  const deleteObjectConfig = {
    Bucket:process.env.CLOUDFLARE_R2_BUCKET,
    Key:image
  }
  const command = new DeleteObjectCommand(deleteObjectConfig)
  await S3.send(command)  
  return NextResponse.json({})
}
