import React from "react";

import LayoutColumn from "@/components/LayoutColumn";

import DepartmentWise from "./DepartmentWise";
import EmployeeTardines from "./EmployeeTardines";
import TopHabitualLateComers from "./TopHabitalLateComers";

function Tardines() {
  return (
    <ul className=" grid grid-cols-2 gap-5">
      <li className=" shadow-md rounded-md p-5 h-auto">
        <DepartmentWise />
      </li>
      <li className=" shadow-md rounded-md p-5">
        <TopHabitualLateComers />
      </li>
      <li className=" col-span-2 shadow-md rounded-md p-5">
        <EmployeeTardines />
      </li>
    </ul>
  );
}

export default Tardines;
