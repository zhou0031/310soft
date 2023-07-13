import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

async function isUserSuspended(token, req: Request) {
  const reqUrl = new URL("/api/auth/sign_in", req.url).toString();

  const res = await fetch(reqUrl, {
    method: "POST",
    body: JSON.stringify(token.user),
    headers: {
      "content-type": "application/json",
    },
  });

  const user = await res.json();

  return user.isAllowed;
}

async function decodeJWT(token) {
  const decoded = await fetch("/api/jwt/decode", {
    method: "POST",
    body: JSON.stringify(token),
    headers: {
      "content-type": "application/json",
    },
  });
  const res = await decoded.json();
  return res;
}

export { isUserSuspended, decodeJWT };
