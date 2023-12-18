import React from "react";

import PageTitle from "@/components/PageTitle";

import Tardines from "../dashboard/_component/Tardines";

const DashboardTardinessPage = () => {
  return (
    <div className=" space-y-5">
      <PageTitle title={["Dashboard", "Tardiness"]} />
      <Tardines />
    </div>
  );
};

export default DashboardTardinessPage;
