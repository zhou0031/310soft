import "server-only";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../prismaDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "",
      clientSecret: process.env.FACEBOOK_SECRET ?? "",
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const user = await prisma.user.findFirst({ where: { email: email } });
          if (!user) throw new Error("email");

          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) throw new Error("password");

          return user;
        } catch (e) {
          if (e instanceof Error) {
            switch (e.message) {
              case "email":
                throw new Error("email或密码错误");
              case "password":
                throw new Error("email或密码错误");
              default:
                throw new Error("服务器出错");
            }
          }
          throw new Error("服务器出错");
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign_in",
    error: "/sign_in",
  },
  callbacks: {
    async signIn({ user, account }: any) {
      /******* Google *******/
      if (account.provider == "google") {
        //is google user existed
        let googleUser = await prisma.googleUser.findUnique({
          where: { email: user.email },
        });
        //if google user doesn't exist
        if (!googleUser) {
          googleUser = await prisma.googleUser.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
            },
          });
        }
        user = googleUser;
      }

      /******* Facebook ***********/
      if (account.provider == "facebook") {
        //is facebook user existed
        let facebookUser = await prisma.facebookUser.findUnique({
          where: { email: user.email },
        });
        //if facebook user doesn't exist
        if (!facebookUser) {
          facebookUser = await prisma.facebookUser.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
            },
          });
        }
        user = facebookUser;
      }

      /******* Credential ********/
      //if credential user is blocked
      if (!user.isAllowed) {
        switch (account.provider) {
          case "google":
          case "facebook":
            //error message in url parameter
            const errorToken = await jwt.sign(
              { error: "此账户被禁用" },
              process.env.JWT_SECRET
            );
            throw new Error(errorToken);
          default:
            throw new Error("此账户被禁用"); //this is in a message
        }
      }
      //all good, proceed
      return true;
    },
    async redirect({ baseUrl }: any) {
      return `${baseUrl}/dashboard`;
    },

    async jwt({ token, user, account, trigger, session }: any) {
      if (trigger === "update" && session?.name) token.user.name = session.name;

      if (trigger === "update" && session?.image && session?.key) {
        token.user.image = session.image;
        token.user.key = session.key;
      }

      if (user) {
        switch (account.provider) {
          case "google":
            token.user = await prisma.googleUser.findUnique({
              where: { email: user.email },
            });
            break;
          case "facebook":
            token.user = await prisma.facebookUser.findUnique({
              where: { email: user.email },
            });
            break;
          default:
            delete user["password"];
            token.user = user;
            break;
        }
        token.user.provider = account.provider;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
  session: {
    maxAge: 24 * 60 * 60 * 7,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
