import "server-only"
import { NextResponse } from 'next/server';
import fs from 'fs/promises'
import path from "path";

export async function DELETE(req){ 
    const urlParams = new URL(req.url);
    const image = urlParams.searchParams.get("image")
    const pathToDelete=path.join("public/",image)
    
    try{  
        await fs.access(pathToDelete, fs.constants.F_OK)
        await fs.unlink(pathToDelete)
        return NextResponse.json({ok:true})
    }catch(e){
        return NextResponse.json({error:true})
    }
}
