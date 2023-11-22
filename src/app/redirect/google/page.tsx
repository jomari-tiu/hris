"use client";
import React from "react";
import { setCookie } from "cookies-next";
import { redirect, useRouter } from "next/navigation";

const GoogleLoginPage = ({
  searchParams,
}: {
  searchParams: { token: string; id: string };
}) => {
  const router = useRouter();
  //   if (searchParams?.token) {
  //     setCookie("user", searchParams?.token);
  //     router.refresh();
  //   }
  return <div></div>;
};

export default GoogleLoginPage;
