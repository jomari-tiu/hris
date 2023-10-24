"use client";

import React, { useEffect, useState } from "react";

import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDaysInMonth,
  isValid,
  parse,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import { useRouter } from "next/navigation";

import { useQueryClient } from "react-query";

import { ClipLoader } from "react-spinners";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import DeleteButton from "@/components/DeleteButton";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import MonthField from "@/components/MonthField";
import EmployeeForm from "@/components/page-components/Employee/Profile/EmployeeForm/EmployeeForm";
import {
  employeeEducation,
  employeeTrainings,
  employeeinfo,
} from "@/components/page-components/Employee/Profile/EmployeeForm/Type";
import PageTitle from "@/components/PageTitle";
import RestoreButton from "@/components/RestoreButton";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import ViewButton from "@/components/ViewButton";
import YearsField from "@/components/YearsField";

import { useFetch } from "@/util/api";

import DepartmentSelect from "../DepartmentSelect";

function EmployeeTardines() {
  const [page, setPage] = useState(1);

  const date = new Date();
  let today = startOfDay(date);
  const [isDepartmentIds, setDepartmentIds] = useState<
    { name: string; id: string }[]
  >([]);

  const [isMonth, setMonth] = useState(format(today, "M"));

  const [isYear, setYear] = useState(format(today, "yyyy"));

  let days = eachDayOfInterval({
    start: startOfMonth(
      isValid(parse(isMonth, "M", new Date()))
        ? parse(isMonth, "M", new Date())
        : today
    ),
    end: endOfMonth(today),
  });

  const { data, isLoading } = useFetch(
    "employee-tardines-list",
    [
      "employee-tardines-list",
      page,
      isMonth,
      isYear,
      isDepartmentIds.map((item) => item.id),
    ],
    `/api/employee-tardiness?month=${isMonth}&year=${isYear}&department_ids=${isDepartmentIds.map(
      (item) => item.id
    )}`
  );

  return (
    <div className=" space-y-5">
      <div className=" flex items-center justify-between gap-2">
        <h5 className="inline-block font-bold text-red-2 relative after:content-[''] after:absolute after:w-full after:bottom-0 after:left-0 after:h-[2px] after:bg-yellow-400">
          Employee Tardines
        </h5>
        <aside className=" gap-2 flex">
          <DepartmentSelect
            selectedIDs={isDepartmentIds}
            setSelected={setDepartmentIds}
          />
          <MonthField
            onChange={(value) => {
              const date = parse(value, "MMMM", new Date());
              setMonth(format(date, "M"));
            }}
          />
          <YearsField
            onChange={(value) => {
              setYear(`${value}`);
            }}
          />
        </aside>
      </div>
      <div className=" w-full relative overflow-auto min-h-[10rem]">
        {isLoading && (
          <>
            <aside className=" absolute top-0 gap-2 flex-col left-0 h-full w-full flex justify-center items-center bg-[#e6e6e652]">
              <ClipLoader color="#520100" />
              <h4 className=" font-bold animate-pulse">Loading...</h4>
            </aside>
          </>
        )}
        <table className=" w-full">
          <thead>
            <tr>
              <th>Employee Name</th>
              {days.map((day, indx) => (
                <th key={indx}>
                  <div className=" flex flex-col items-center justify-center">
                    <p className=" text-[12px]">{format(day, "MMM")}</p>
                    <p className=" border-b-2 border-red-2 ">
                      {format(day, "dd")}
                    </p>
                    <p className=" text-[12px]">{format(day, "eee")}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data?.data.map((item: any, indx: number) => (
              <tr key={indx}>
                <td className=" min-w-[15rem] py-1 px-2">{item.employee}</td>
                {item.tardiness_minutes_by_day.map(
                  (innerItem: string, indx: number) => (
                    <td
                      className=" py-1 px-5 min-w-[10rem] border-b text-center"
                      key={indx}
                    >
                      {innerItem}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeTardines;
