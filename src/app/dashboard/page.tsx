"use client";
import React, { useState } from "react";

import UserAuth from "@/components/HOC/UserAuth";
import PageTitle from "@/components/PageTitle";
import Tab from "@/components/Tab";

import Tardines from "./_component/Tardines";

function DashboardPage({ message }: any) {
  const [isTab, setTab] = useState("Tardines");
  return (
    <section className=" space-y-5">
      <PageTitle title={["Dashboard"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["Tardines", "IPCR"]} />
      {isTab === "Tardines" && <Tardines />}
    </section>
  );
}

export default UserAuth(DashboardPage);
