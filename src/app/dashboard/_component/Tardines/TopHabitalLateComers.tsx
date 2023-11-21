"use client";

import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

import { ClipLoader } from "react-spinners";

import { useFetch } from "@/util/api";

type TopHabitualType = {
  employee_name: string;
  department_name: string;
  total_tardiness: string;
  total_tardiness_minutes: string;
}[];

function TopHabitualLateComers() {
  const [type, setType] = useState("monthly");
  const [from, setFrom] = useState("");
  const [end, setEnd] = useState("");
  const { data, isLoading } = useFetch(
    "top-habitual-latecomers",
    ["top-habitual-latecomers", type, from, end],
    `/api/top-habitual-latecomers?frequency=${
      type === "specific date" ? "specific_date" : type
    }${type === "specific date" && `&start_date=${from}&end_date=${end}`}`
  );

  const topHabitual: TopHabitualType = data?.data?.data;

  return (
    <div className=" space-y-5 flex flex-col items-start h-full">
      <h5 className="inline-block font-bold text-black relative underline-ccgreen">
        Top Habitual Latecomers
      </h5>
      <ul className=" flex items-center justify-between gap-3 flex-wrap w-full">
        <li>
          <select
            className=" capitalize"
            defaultValue={"monthly"}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="yearly">yearly</option>
            <option value="specific date">specific date</option>
          </select>
        </li>
        {type === "specific date" && (
          <li className=" flex items-center flex-wrap gap-2">
            <input type="date" onChange={(e) => setFrom(e.target.value)} />
            <AiOutlineArrowRight className=" text-black" />
            <input type="date" onChange={(e) => setEnd(e.target.value)} />
          </li>
        )}
      </ul>
      <div className="max-h-[400px] relative min-h-[10rem] overflow-auto w-full">
        {isLoading && (
          <>
            <aside className=" absolute top-0 gap-2 flex-col left-0 h-full w-full flex justify-center items-center bg-[#e6e6e652]">
              <ClipLoader color="#9ACC2F" />
              <h4 className=" font-bold animate-pulse">Loading...</h4>
            </aside>
          </>
        )}
        <table className=" w-full font-medium">
          <tbody>
            {topHabitual?.map((item, indx) => (
              <tr key={indx}>
                <td>{item?.employee_name}</td>
                <td>{item?.department_name}</td>
                <td>{item?.total_tardiness}</td>
              </tr>
            ))}
            {topHabitual?.length <= 0 && (
              <tr>
                <td colSpan={3}>
                  <h3 className=" text-center">NO RECORD FOUND</h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopHabitualLateComers;
