import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("user")?.value;

  const isChangePassword = req.url.includes("/change-password");
  if (isChangePassword && token) {
    return NextResponse.redirect(new URL("/edit-profile", req.url));
  }

  const isForgotPassword = req.url.includes("/forgot-password");
  if (isForgotPassword && token) {
    return NextResponse.redirect(new URL("/edit-profile", req.url));
  }

  return NextResponse.next();
}
