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

import Dropdown from "@/components/Dropdown";

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
    id: "3d7684a3-8f92-4d7c-82d8-fe38cdfb127a",
  });

  const [from, setFrom] = useState("");
  const [end, setEnd] = useState("");
  const [isDepartmentIds, setDepartmentIds] = useState<
    { name: string; id: string }[]
  >([]);

  const { data: graph, isLoading } = useFetch(
    "ipcr-graph",
    ["ipcr-graph", period.id],
    `/api/ipcr-graph?ipcr_period_id=${period.id}`
  );

  const departmentWise: departmentWiseType = graph?.data?.data;

  useEffect(() => {
    setLineChart({
      labels: [1, 2, 3, 4, 5], // x-axis
      datasets: [
        {
          data: [5, 20, 90, 15, 45],
          backgroundColor: "#9acd32",
        },
      ],
    });
  }, [departmentWise?.data]);

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
          <h5 className="inline-block font-bold text-red-2 relative after:content-[''] after:absolute after:w-full after:bottom-0 after:left-0 after:h-[2px] after:bg-yellow-400">
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
          <DepartmentSelect
            selectedIDs={isDepartmentIds}
            setSelected={setDepartmentIds}
          />
          <aside className=" flex items-center flex-wrap gap-2">
            <input type="date" onChange={(e) => setFrom(e.target.value)} />
            <AiOutlineArrowRight className=" text-red-2" />
            <input type="date" onChange={(e) => setEnd(e.target.value)} />
          </aside>
        </li>
      </ul>
      <ul className=" grid grid-cols-3 gap-5">
        <li className=" shadow-md 1280px:col-span-3 rounded-md p-5 h-auto">
          <Bar data={LineChart} options={options} plugins={plugins} />
        </li>
        <li className=" shadow-md 1280px:col-span-3 col-span-2 rounded-md p-5 h-auto">
          <div className="max-h-[400px] relative min-h-[10rem] overflow-auto w-full">
            <table className=" w-full font-medium">
              <thead>
                <tr>
                  <th className=" text-center text-sm text-red-2">Employee</th>
                  <th className=" text-center text-sm text-red-2">
                    Office/College
                  </th>
                  <th className=" text-center text-sm text-red-2">
                    Avg Rating
                  </th>
                  <th className=" text-center text-sm text-red-2">Overall</th>
                  <th className=" text-center text-sm text-red-2">
                    Adjectival
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {topHabitual?.map((item, indx) => (
              <tr key={indx}>
                <td>{item?.employee_name}</td>
                <td>{item?.department_name}</td>
                <td>{item?.total_tardiness}</td>
              </tr>
            ))} */}

                <tr>
                  <td colSpan={5}>
                    <h3 className=" text-center py-5">NO RECORD FOUND</h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default IndividualPerformanceAndCareerReview;
