import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"

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
   
  ],
  pages:{
    signIn:""
  },
  
  secret: process.env.JWT_SECRET ?? "",
}

const handler=NextAuth(authOptions);

export{handler as GET, handler as POST}