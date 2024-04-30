import React from "react";
import axios from "axios";
import { deleteCookie } from "cookies-next";
import { cookies, headers } from "next/headers";

import { redirect } from "next/navigation";

import ClientLayout from "./ClientLayout";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  let isAdmin = false;
  const token = cookies()?.get("user")?.value;

  let profile: any = "";
  if (token) {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        profile = res.data?.data;
        isAdmin = res?.data?.data?.is_admin;
        // redirect to employee dashboard when not admin
      })
      .catch((err) => {
        profile = null;
        deleteCookie("user");
        throw err;
      });
  } else {
    deleteCookie("user");
  }

  return <ClientLayout isAdmin={isAdmin}>{children}</ClientLayout>;
};

export default Layout;
