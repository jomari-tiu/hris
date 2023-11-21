"use client";

import React, { useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isValid,
  parse,
  startOfDay,
  startOfMonth,
} from "date-fns";

import { ClipLoader } from "react-spinners";

import MonthField from "@/components/MonthField";
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
      <div className=" flex items-center justify-between flex-wrap gap-2">
        <h5 className="inline-block font-bold text-black relative underline-ccgreen">
          Employee Tardiness
        </h5>
        <aside className=" gap-2 flex flex-wrap">
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
              <ClipLoader color="#9ACC2F" />
              <h4 className=" font-bold animate-pulse">Loading...</h4>
            </aside>
          </>
        )}
        {data?.data?.data?.length <= 0 && (
          <aside className=" absolute top-0 gap-2 flex-col left-0 h-full w-full flex justify-center items-center bg-[#e6e6e652]">
            <h3>NO RECORD FOUND</h3>
          </aside>
        )}
        <table className=" w-full">
          <thead>
            <tr>
              <th>Employee&nbsp;Name</th>
              {days.map((day, indx) => (
                <th key={indx} className=" min-w-[10rem]">
                  <div className=" flex flex-col items-center justify-center">
                    <p className=" text-[12px]">{format(day, "MMM")}</p>
                    <p className=" border-b-2 border-ccgreen3 ">
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
                <td className=" min-w-[10rem] py-1 px-2">{item.employee}</td>
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
