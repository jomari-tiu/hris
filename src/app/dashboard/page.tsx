"use client";
import React from "react";

import AwardsAndAccomplishmentsChart from "./_component/Charts/AwardsAndAccomplishmentsChart";
import EmployeeChart from "./_component/Charts/EmployeesChart";
import IndividualPerformanceAndCarreerReviewChart from "./_component/Charts/IndividualPerformanceAndCarreerReviewChart";
import TrainingChart from "./_component/Charts/TrainingChart";
import DepartmentWise from "./_component/Tardines/DepartmentWise";

function DashboardPage() {
  return (
    <>
      <ul className=" w-full grid grid-cols-6 gap-5">
        <li className=" shadow-md 1280px:col-span-6 col-span-2 rounded-md p-5 h-auto bg-white-0 ">
          <IndividualPerformanceAndCarreerReviewChart />
        </li>
        <li className=" shadow-md 1280px:col-span-6  col-span-2 rounded-md p-5 h-auto bg-white-0 ">
          <EmployeeChart />
        </li>
        <li className=" shadow-md 1280px:col-span-6 col-span-2 rounded-md p-5 h-auto bg-white-0 ">
          <DepartmentWise />
        </li>
        <li className=" shadow-md 1280px:col-span-6 col-span-3  rounded-md p-5 h-auto bg-white-0 ">
          <TrainingChart />
        </li>
        <li className=" shadow-md 1280px:col-span-6 col-span-3 rounded-md p-5 h-auto bg-white-0 ">
          <AwardsAndAccomplishmentsChart />
        </li>
      </ul>
      {/* <PageTitle title={["Dashboard"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["Tardiness", "IPCR"]} />
      {isTab === "Tardiness" && <Tardines />}
      {isTab === "IPCR" && <Ipcr />} */}
    </>
  );
}

export default DashboardPage;
