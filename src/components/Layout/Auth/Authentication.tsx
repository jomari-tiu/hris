"use client";

import React from "react";

import { usePathname } from "next/navigation";

import GoogleValidation from "./GoogleValidation";
import Login from "./Login";

const Authentication = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (pathname.includes("/redirect/google")) {
    return <GoogleValidation />;
  }

  if (pathname === "/forgot-password" || pathname === "/change-password")
    return <>{children}</>;

  return (
    <>
      <Login />
    </>
  );
};

export default Authentication;
