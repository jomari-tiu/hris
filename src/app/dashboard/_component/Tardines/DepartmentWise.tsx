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

import { useFetch } from "@/util/api";

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

function DepartmentWise() {
  const [LineChart, setLineChart] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [type, setType] = useState("monthly");
  const [from, setFrom] = useState("");
  const [end, setEnd] = useState("");
  const { data, isLoading } = useFetch(
    "department-wise-tardiness",
    ["department-wise-tardiness", type, from, end],
    `/api/department-wise-tardiness?frequency=${
      type === "specific date" ? "specific_date" : type
    }${type === "specific date" && `&start_date=${from}&end_date=${end}`}`
  );

  const departmentWise: departmentWiseType = data?.data?.data;

  useEffect(() => {
    setLineChart({
      labels: departmentWise?.data.map((item) => item?.department), // x-axis
      datasets: [
        {
          data: departmentWise?.data.map(
            (item) => item?.average_tardiness_minutes
          ),
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
          const hrValue =
            departmentWise?.data[context.dataIndex]?.average_tardiness_time;
          return hrValue;
        },
      },
    },
  };
  const plugins = [ChartDataLabels];

  return (
    <div className=" space-y-5 ">
      <h5 className="inline-block font-bold text-black relative underline-ccgreen">
        Department Wise Tardiness
      </h5>
      <ul className=" flex items-center justify-between gap-3 flex-wrap w-full ">
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
      <ul className=" flex gap-3 items-center flex-wrap">
        <li>Average</li>
        <li>
          <p className=" text-center">Minutes</p>
          <h3 className=" font-bold text-black text-center">
            {departmentWise?.average_minutes
              ? departmentWise?.average_minutes
              : "0mins"}
          </h3>
        </li>
        <li>
          <p className=" text-center">Occurences</p>
          <h3 className=" font-bold text-black text-center">
            {departmentWise?.average_occurrences}
          </h3>
        </li>
      </ul>
      <aside>
        <Bar data={LineChart} options={options} plugins={plugins} />
      </aside>
    </div>
  );
}

export default DepartmentWise;
