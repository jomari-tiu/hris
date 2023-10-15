"use client";
import React from "react";

import UserAuth from "@/components/HOC/UserAuth";

function DashboardPage({ message }: any) {
  console.log(message);
  return <div>dashboard asdasdsad</div>;
}

export default UserAuth(DashboardPage);
