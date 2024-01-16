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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useRouter } from "next/navigation";

import { AiOutlineArrowRight } from "react-icons/ai";

import { useFetch } from "@/util/api";

import ChartComponent from "../Charts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
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
  const router = useRouter();

  const [LineChart, setLineChart] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [type, setType] = useState("monthly");
  const [from, setFrom] = useState("");
  const [end, setEnd] = useState("");

  const frequencyParam = type === "specific date" ? "specific_date" : type;
  const specificDateParams =
    type === "specific date" ? `&start_date=${from}&end_date=${end}` : "";

  const url = `/api/department-wise-tardiness?frequency=${frequencyParam}${specificDateParams}`;

  const { data, isLoading } = useFetch(
    "department-wise-tardiness",
    ["department-wise-tardiness", type, from, end],
    url
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
          backgroundColor: "#ffdb69",
        },
      ],
    });
  }, [departmentWise?.data]);

  const options = {
    onClick: (event: any, elements: any) => {
      // Handle click on the chart itself
      if (elements.length > 0) {
        router.push("/dashboard-tardiness");
        // const clickedElement = elements[0];
        // console.log("Chart Element Clicked:", clickedElement);
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        display: false,
      },
      datalabels: {
        color: "#fff",
        textShadowColor: "#000",
        textShadowBlur: 10,
        formatter: function (value: any, context: any) {
          const hrValue =
            departmentWise?.data[context.dataIndex]?.average_tardiness_time;
          return hrValue;
        },
      },
    },
  };

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
      <aside className=" flex flex-col items-center gap-2">
        <ChartComponent
          chartData={LineChart}
          type={"bar"}
          options={options}
          chartName={"department-wise-tardiness-chart"}
        />
        <span className="text-sm font-bold">DEPARTMENT</span>
      </aside>
    </div>
  );
}

export default DepartmentWise;
