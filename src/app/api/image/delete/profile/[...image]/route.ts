import "server-only"
import { NextResponse } from 'next/server';
import fs from 'fs/promises'
import path from "path";

export async function DELETE(req){ 
    const urlParams = new URL(req.url);
    const image = urlParams.searchParams.get("image")
    const pathToDelete=path.join("public/",image)
   
    try{  
        deleteFile(pathToDelete)
        return NextResponse.json({ok:true})
    }catch(e){
        return NextResponse.json({error:true})
    }
}

export async function deleteFile(filePath){
    try{
        await fs.unlink(filePath)
    }
    catch(e){
        
        throw e
    }
}