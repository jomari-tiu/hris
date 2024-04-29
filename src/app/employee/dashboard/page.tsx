import React from "react";

import EmployeeChart from "@/app/dashboard/_component/Charts/EmployeesChart";

import AwardsEmployeeChart from "./_components/AwardsEmployeeChart";
import IPCROutstanding from "./_components/IPCROutstanding";
import TrainingEmployeeChart from "./_components/TrainingEmployeeChart";

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
          <TrainingEmployeeChart disableRedirect />
        </li>
        <li className=" shadow-md 1280px:col-span-6 col-span-3 rounded-md p-5 h-auto bg-white-0 ">
          <AwardsEmployeeChart disableRedirect />
        </li>
      </ul>
    </>
  );
}

export default DashboardEmployeePage;
