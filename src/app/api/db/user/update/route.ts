import "server-only"
import { prisma } from "../../../../../prismaDB";
import { NextResponse } from "next/server";

export async function PUT(req){
    const {formData,session} = await req.json()
    const user = session.user
    let updatedUser
    try{    
    switch(user.provider){
        case 'google':
            updatedUser=await updateGoogleUser(formData,user)
            break;
        case 'facebook':
            updatedUser=await updateFacebookUser(formData,user)
            break;
        default:
            updatedUser=await updateCredientialUser(formData,user)
        break;
    }
    
    return NextResponse.json(updatedUser)
    }catch(e){
       return NextResponse.json({"error":"保存失败"})
    }
}

async function updateGoogleUser(formData,user){
    try{
    const updatedUser = await prisma.googleUser.update({
        where:{
            email:user.email,
        },
        data:{
            name:formData.name,  
            contact:{
            upsert:{
                update:{ 
                    phone:formData.phone,
                },
                create:{
                    phone:formData.phone
                }
            }
            },
            address:{
                upsert:{
                    update:{
                        street:formData.street,
                        city:formData.city,
                        state:formData.state,
                        country:formData.country,
                        zip:formData.zip
                    },
                    create:{
                        street:formData.street,
                        city:formData.city,
                        state:formData.state,
                        country:formData.country,
                        zip:formData.zip
                    }
                }
            }
        },
        
        }
    )
    return updatedUser
    }catch(e){
        throw e
    }
}

async function updateFacebookUser(formData,user){
    try{
    const updatedUser = await prisma.facebookUser.update({
        where:{
            email:user.email,
        },
        data:{
            name:formData.name,  
            contact:{
            upsert:{
                update:{ 
                    phone:formData.phone,
                },
                create:{
                    phone:formData.phone
                }
            }
            },
            address:{
                upsert:{
                    update:{
                        street:formData.street,
                        city:formData.city,
                        state:formData.state,
                        country:formData.country,
                        zip:formData.zip
                    },
                    create:{
                        street:formData.street,
                        city:formData.city,
                        state:formData.state,
                        country:formData.country,
                        zip:formData.zip
                    }
                }
            }
        },
        
        }
    )
    return updatedUser
    }catch(e){
        throw e
    }
}

async function updateCredientialUser(formData,user){
    try{
    const updatedUser = await prisma.user.update({
        where:{
            email:user.email,
        },
        data:{
            name:formData.name,  
            contact:{
            upsert:{
                update:{ 
                    phone:formData.phone,
                },
                create:{
                    phone:formData.phone
                }
            }
            },
            address:{
                upsert:{
                    update:{
                        street:formData.street,
                        city:formData.city,
                        state:formData.state,
                        country:formData.country,
                        zip:formData.zip
                    },
                    create:{
                        street:formData.street,
                        city:formData.city,
                        state:formData.state,
                        country:formData.country,
                        zip:formData.zip
                    }
                }
            }
        },
        
        }
    )
    return updatedUser
    }catch(e){
        throw e
    }
}