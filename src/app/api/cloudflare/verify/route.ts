import { NextResponse } from 'next/server'

export async function POST(req:Request){
    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
    const {token}=await req.json()
    const secret = process.env.CLOUDFLARE_SECRET??""
    let formData = new FormData()
    
   
    formData.append("secret",secret)
    formData.append("response",token)

    const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});
    const outcome = await result.json()
    
    if(outcome.success)
        return NextResponse.json({success:true})
    else
        return NextResponse.json({success:false})
}