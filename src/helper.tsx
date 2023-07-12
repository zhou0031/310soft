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

export { isUserSuspended };
