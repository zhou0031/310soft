import 'server-only'
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prismaDB";
import bcrypt from 'bcrypt'
 

const authOptions={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId:process.env.FACEBOOK_ID??"",
      clientSecret:process.env.FACEBOOK_SECRET??""
    }),
    CredentialsProvider({
      type:"credentials",
      credentials:{},
      async authorize(credentials,req){
        const {email,password} = credentials as {email:string,password:string}
        try{
          const user = await prisma.user.findFirst({where:{email:email}})
          if(!user) throw new Error("email")

          const validPassword=await bcrypt.compare(password,user.password)
          if(!validPassword) throw new Error("password")

          return user
        
      }catch(e ){
       
        if (e instanceof Error){
          switch (e.message){
            case 'email':
              throw new Error("email或密码错误")
            case "password":
              throw new Error("email或密码错误")
            default:
              throw new Error("服务器出错")    
          }
        }
        throw new Error("服务器出错")
      }
    }
    }),
   
  ],
  pages:{
    signIn:"/sign_in"
  },
  secret: process.env.JWT_SECRET ?? "",
}

const handler=NextAuth(authOptions);

export {handler as GET, handler as POST}