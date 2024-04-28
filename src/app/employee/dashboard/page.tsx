import React from "react";

import AwardsAndAccomplishmentsChart from "@/app/dashboard/_component/Charts/AwardsAndAccomplishmentsChart";
import EmployeeChart from "@/app/dashboard/_component/Charts/EmployeesChart";
import TrainingChart from "@/app/dashboard/_component/Charts/TrainingChart";

import IPCROutstanding from "./_components/IPCROutstanding";

function DashboardEmployeePage() {
  return (
    <>
      <ul className=" w-full grid grid-cols-6 gap-5">
        <li className=" shadow-md 1280px:col-span-6 col-span-3  rounded-md p-5 h-auto bg-white-0 ">
          <IPCROutstanding />
        </li>
        <li className=" shadow-md 1280px:col-span-6 col-span-3  rounded-md p-5 h-auto bg-white-0 ">
          <EmployeeChart disableRedirect />
        </li>

        <li className=" shadow-md 1280px:col-span-6 col-span-3  rounded-md p-5 h-auto bg-white-0 ">
          <TrainingChart disableRedirect />
        </li>
        <li className=" shadow-md 1280px:col-span-6 col-span-3 rounded-md p-5 h-auto bg-white-0 ">
          <AwardsAndAccomplishmentsChart disableRedirect />
        </li>
      </ul>
    </>
  );
}

export default DashboardEmployeePage;
