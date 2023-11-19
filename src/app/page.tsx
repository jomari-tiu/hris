import React from "react";

import UserAuthentication from "@/components/HOC/UserAuth";
import UserAuth from "@/components/HOC/UserAuth";

function SamplePage({ profile }: any) {
  console.log(profile);
  return <div>dashboard asdasdsad</div>;
}

export default UserAuth(SamplePage);
