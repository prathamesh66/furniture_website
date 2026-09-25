import { NextResponse } from "next/server";

const proxy = (request) => {
  let cookies = request.cookies.get("user_login")?.value;

  if (cookies == undefined) {
    cookies = "";
  }

  // Already logged in → don't allow login page
  if (cookies != "" && request.nextUrl.pathname.startsWith("/login-register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Not logged in → don't allow dashboard
  if (cookies == "" && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login-register", request.url));
  }

  // Not logged in → don't allow checkout
  if (cookies == "" && request.nextUrl.pathname.startsWith("/checkout")) {
    return NextResponse.redirect(new URL("/login-register", request.url));
  }

  return NextResponse.next();
};

export default proxy;




// hii  this is the new