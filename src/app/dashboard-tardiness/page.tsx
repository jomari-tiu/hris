"use client";

import React, { useState } from "react";

import PageTitle from "@/components/PageTitle";
import Tab from "@/components/Tab";

import Tardines from "../dashboard/_component/Tardines";
import Ipcr from "../performance-management/ipcr/page";

const DashboardTardinessPage = () => {
  const [isTab, setTab] = useState("Tardiness");
  return (
    <div className=" space-y-5">
      <PageTitle title={["Dashboard", "Tardiness"]} />

      {isTab === "Tardiness" && <Tardines />}
      {isTab === "IPCR" && <Ipcr />}
    </div>
  );
};

export default DashboardTardinessPage;
