"use client";
import React, { useState } from "react";

import UserAuth from "@/components/HOC/UserAuth";
import PageTitle from "@/components/PageTitle";
import Tab from "@/components/Tab";

import Ipcr from "./_component/IPCR/indx";
import Tardines from "./_component/Tardines";

function DashboardPage() {
  const [isTab, setTab] = useState("Tardines");
  return (
    <section className=" space-y-5">
      <PageTitle title={["Dashboard"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["Tardines", "IPCR"]} />
      {isTab === "Tardines" && <Tardines />}
      {isTab === "IPCR" && <Ipcr />}
    </section>
  );
}

export default DashboardPage;
