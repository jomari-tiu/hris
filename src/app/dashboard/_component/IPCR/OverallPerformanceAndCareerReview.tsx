"use client";

import React, { useState } from "react";

import { AiOutlineArrowRight } from "react-icons/ai";

import { ClipLoader } from "react-spinners";

import Dropdown from "@/components/Dropdown";
import { textDateFormat } from "@/components/helper";
import { useFetch } from "@/util/api";

type departmentWiseType = {
  max_average_minutes: number | string | null;
  max_occurrences: number;
  average_minutes: number | string | null;
  average_occurrences: number;
  data: {
    department: string;
    average_tardiness_minutes: number;
    average_tardiness_time: number;
    total_occurrences: number;
    late_employees: {
      id: string;
      department_id: string;
      first_name: string;
      middle_name: string;
      last_name: string;
      full_name: string;
      full_name_formal: string;
      is_flexible: boolean;
      schedule: {
        name: string;
        is_default: boolean;
        time_in: string;
        time_out: string;
        is_deletable: boolean;
      };
    }[];
  }[];
};

function OverallPerformanceAndCareerReview() {
  const [period, setPeriod] = useState({
    value: "",
    id: "",
  });

  const { data, isLoading: opcrSummaryLoading } = useFetch(
    "opcr-summary",
    ["opcr-summary", period.id],
    `/api/opcr-summary?ipcr_period_id=${period.id}`
  );

  const opcrSummary = data?.data?.data;

  return (
    <div className=" space-y-5">
      <ul className=" flex justify-between flex-wrap gap-3 items-center">
        <li>
          <h5 className="inline-block font-bold text-black relative underline-ccgreen">
            Overall Performance and Career Review
          </h5>
        </li>
        <li className=" flex gap-2 flex-wrap items-center">
          <Dropdown
            value={period}
            setValue={setPeriod}
            endpoint={"/api/options/ipcr_periods"}
            label={"Period"}
            displayValueKey={"date_range"}
          />
        </li>
      </ul>
      <ul className=" grid gap-5">
        <li className=" shadow-md 1280px:col-span-3 col-span-2 rounded-md p-5 h-auto bg-white-0 ">
          <div className="max-h-[400px] relative min-h-[10rem] overflow-auto w-full">
            {opcrSummaryLoading && (
              <>
                <aside className=" absolute top-0 gap-2 flex-col left-0 h-full w-full flex justify-center items-center bg-[#e6e6e652]">
                  <ClipLoader color="#9acd32" />
                  <h4 className=" font-bold animate-pulse">Loading...</h4>
                </aside>
              </>
            )}
            <table className=" w-full font-medium">
              <thead>
                <tr>
                  <th className=" text-center text-sm text-black">Name</th>
                  <th className=" text-center text-sm text-black">
                    Office/College
                  </th>
                  <th className=" text-center text-sm text-black">
                    Final Average
                  </th>

                  <th className=" text-center text-sm text-black">
                    Adjectival Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {opcrSummary?.map((item: any, indx: any) => (
                  <tr key={indx}>
                    <td>{item?.department_head_employee?.full_name}</td>
                    <td>
                      {textDateFormat(
                        item?.department_head_employee?.date_hired
                      )}
                    </td>
                    <td>{item?.department_head_employee?.email}</td>
                    <td>{item?.department_head_employee?.citizenship}</td>
                  </tr>
                ))}

                {opcrSummary?.length === 0 && (
                  <tr>
                    <td colSpan={5}>
                      <h3 className=" text-center py-5">NO RECORD FOUND</h3>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default OverallPerformanceAndCareerReview;
