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

export async function DELETE(req:NextRequest){   
  const key= req.nextUrl.searchParams.get("key")
  
  const deleteObjectConfig = {
    Bucket:process.env.CLOUDFLARE_R2_BUCKET,
    Key:key
  }
  const command = new DeleteObjectCommand(deleteObjectConfig)
  await S3.send(command)  
  
  return NextResponse.json({})
}
