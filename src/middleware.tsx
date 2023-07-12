import { withAuth } from "next-auth/middleware";
import { isUserSuspended } from "./helper";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const result = await isUserSuspended(req.nextauth.token, req);

    if (result != null && !result) {
      //user is suspended
      const response = NextResponse.next();
      response.cookies.delete("next-auth.session-token");
      return response;
    }
  },
  {
    callbacks: {},
  }
);

export const config = {
  matcher: ["/dashboard", "/dashboard/(.*)"],
};
