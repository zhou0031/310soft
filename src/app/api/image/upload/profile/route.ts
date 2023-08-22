import "server-only"
import { NextResponse,NextRequest } from 'next/server';
import { join } from 'path'
import { fileTypeFromBuffer } from 'file-type';
import cryptoRandomString from 'crypto-random-string';
import fs  from 'fs' 
import mv from 'mv'


export async function POST(req:NextRequest){
    const allowed_types=['image/png','image/jpeg','image/jpg']
    const allowed_extensions=['png','jpeg','jpg']
    const MAX_SIZE=1*1024*1024
    const data = await req.formData()    
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
    
    let fileName=`${cryptoRandomString({ length: 30, type: 'alphanumeric' })}.png`
    const savingPath=join("public/images/profile",fileName)
    const nextPath=join("/images/profile",fileName)
    /************** Save image ************* */
    //if user.image is not null, delete image,then upload  
    /*    
    if(toDelete){
         fs.unlink(toDelete,async (e)=>{
               if(!e){
                let writeableStream =  fs.createWriteStream(savingPath)
                writeableStream.write(buffer)
                
                return NextResponse.json({path:nextPath})
               }
               
               return NextResponse.json({error:true})
        })
    }
    
    //if toDelete (user image) is null, inster image directly
    try{
        let writeableStream = fs.createWriteStream(savingPath)
        writeableStream.write(buffer)
    }catch(e){
        return NextResponse.json({error:true})
    }
    
   
    let promise = new Promise(function(resolve,reject){
      fs.unlink(toDelete,(error)=>{!error?resolve(false):reject(true)})
    })
    promise
    .then(d=>{
        let writeableStream = fs.createWriteStream(savingPath)
        writeableStream.write(buffer)
    })
    .catch(e=>{
        return NextResponse.json({error:true}) 
    })
    */    
    

   

    return NextResponse.json({path:nextPath})
}

