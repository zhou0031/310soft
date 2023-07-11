import { withAuth } from "next-auth/middleware";

export default withAuth(async function middleware(req) {}, {
  callbacks: {},
});

export const config = {
  matcher: ["/dashboard", "/dashboard/(.*)"],
};
