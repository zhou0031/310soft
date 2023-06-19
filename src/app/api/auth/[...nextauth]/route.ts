import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  pages:{
    signIn:""
  },
  secret: process.env.JWT_SECRET ?? "",
}

const handler=NextAuth(authOptions);

export{handler as GET, handler as POST}