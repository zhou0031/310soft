import "server-only"
import { NextResponse } from 'next/server';
import fs from 'fs'
import path from "path";

export async function DELETE(req){ 
    const urlParams = new URL(req.url);
    const image = urlParams.searchParams.get("image")
    
    fs.unlink(path.join("public/",image),error=>{
        error?console.log(error):"" 
    })

    return NextResponse.json({ok:true})
}