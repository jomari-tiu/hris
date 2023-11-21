"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line, Bar } from "react-chartjs-2";
import { AiOutlineArrowRight } from "react-icons/ai";

import { ClipLoader } from "react-spinners";

import Dropdown from "@/components/Dropdown";

import { textDateFormat } from "@/components/helper";

import { useFetch } from "@/util/api";

import DepartmentSelect from "../DepartmentSelect";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

function IndividualPerformanceAndCareerReview() {
  const [LineChart, setLineChart] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [period, setPeriod] = useState({
    value: "",
    id: "",
  });

  const [department, setDepartment] = useState({
    value: "",
    id: "",
  });

  const { data: graph, isLoading: graphLoading } = useFetch(
    "ipcr-graph",
    ["ipcr-graph", period.id],
    `/api/ipcr-graph?ipcr_period_id=${period.id}&department_id=${department.id}`
  );

  const { data: ipcrSummary, isLoading: ipcrSummaryLoading } = useFetch(
    "ipcr-summary",
    ["ipcr-summary", period.id, department.id],
    `/api/ipcr-summary?ipcr_period_id=${period.id}&department_id=${department.id}`
  );

  const graphData: { rate: number; count: number }[] = graph?.data?.data?.data;

  useEffect(() => {
    setLineChart({
      labels: graphData?.map((item) => item?.rate), // x-axis
      datasets: [
        {
          data: graphData?.map((item) => item?.count),
          backgroundColor: "#9acd32",
        },
      ],
    });
  }, [graphData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        display: false,
      },
      datalabels: {
        color: "#fff",
        formatter: function (value: any, context: any) {
          return value;
        },
      },
    },
  };
  const plugins = [ChartDataLabels];

  return (
    <div className=" space-y-5">
      <ul className=" flex justify-between flex-wrap gap-3 items-center">
        <li>
          <h5 className="inline-block font-bold text-black relative underline-ccgreen">
            Individual Performance and Career Review
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
          <Dropdown
            value={department}
            setValue={setDepartment}
            endpoint={"/api/options/departments"}
            label={"Department"}
            displayValueKey={"name"}
          />
        </li>
      </ul>
      <ul className=" grid grid-cols-3 gap-5">
        <li className=" shadow-md 1280px:col-span-3 rounded-md bg-white-0 p-5 h-auto">
          <Bar data={LineChart} options={options} plugins={plugins} />
        </li>
        <li className=" shadow-md 1280px:col-span-3 col-span-2 rounded-md bg-white-0 p-5 h-auto">
          <div className="max-h-[400px] relative min-h-[10rem] overflow-auto w-full">
            {ipcrSummaryLoading && (
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
                  <th className=" text-center text-sm text-black">Employee</th>
                  <th className=" text-center text-sm text-black">
                    Office/College
                  </th>
                  <th className=" text-center text-sm text-black">
                    Avg Rating
                  </th>
                  <th className=" text-center text-sm text-black">Overall</th>
                  <th className=" text-center text-sm text-black">
                    Adjectival
                  </th>
                </tr>
              </thead>
              <tbody>
                {ipcrSummary?.data?.data?.map((item: any, indx: number) => (
                  <tr key={indx}>
                    <td>{item?.employee?.full_name}</td>
                    <td>{item?.employee?.email}</td>
                    <td>{textDateFormat(item?.employee?.date_hired)}</td>
                    <td className=" text-end">
                      {(
                        (Number(item?.mean_score_strategic) +
                          Number(item?.mean_score_core) +
                          Number(item?.mean_score_support)) /
                        3
                      ).toFixed(2)}
                    </td>
                    <td className=" text-end">
                      {(
                        (Number(item?.weighted_average_strategic) +
                          Number(item?.weighted_average_core) +
                          Number(item?.weighted_average_support)) /
                        3
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}

                {ipcrSummary?.data?.data?.length === 0 && (
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

export default IndividualPerformanceAndCareerReview;
