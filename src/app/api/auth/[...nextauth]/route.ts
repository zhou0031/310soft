"use server"
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/components/prismaDB";
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
          if(!user)return null
          
          const validPassword=await bcrypt.compare(password,user.password)
          if(!validPassword) return null

          return user
        
      }catch(e){
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