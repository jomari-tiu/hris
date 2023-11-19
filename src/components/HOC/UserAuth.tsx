import React from "react";
import axios from "axios";
import { deleteCookie } from "cookies-next";
import { cookies } from "next/headers";

function UserAuth(OriginalComponent: any) {
  const NewComponent = async () => {
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
          profile = res.data;
        })
        .catch((err) => {
          profile = null;
          deleteCookie("user");
          throw err;
        });
    }
    return <OriginalComponent profile={profile.data} />;
  };
  return NewComponent;
}

export default UserAuth;
