"use client";
import React from "react";

import UserAuth from "@/components/HOC/UserAuth";

function page({ message }: any) {
  console.log(message);
  return <div>dashboard asdasdsad</div>;
}

export default UserAuth(page);
