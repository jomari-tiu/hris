import React, { useEffect, useState } from "react";

import Dropdown from "@/components/Dropdown";
import { useFetch } from "@/util/api";

import ChartComponent from ".";

const EmployeeChart = () => {
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: true,
      },
      datalabels: {
        color: "#fff",
        formatter: function (value: any, context: any) {
          return `${value}`;
        },
        font: {
          weight: "bold",
          size: "30rem",
        },
      },
    },
  };
  //   const { data: graph, isLoading: graphLoading } = useFetch(
  //     "ipcr-graph",
  //     ["ipcr-graph", period.id],
  //     `/api/ipcr-graph?ipcr_period_id=${period.id}&department_id=${department.id}`
  //   );

  //   const graphData: { rate: number; count: number }[] = graph?.data?.data?.data;

  useEffect(() => {
    setData({
      labels: ["Male", "Female"], // x-axis
      datasets: [
        {
          data: [60, 40], // y-axis
          backgroundColor: ["#8cc6f0", "#ffc7c2"],
        },
      ],
    });
  }, []);

  return (
    <div className=" h-full flex flex-col items-start justify-start">
      <h5 className="inline-block font-bold text-black relative underline-ccgreen">
        Employees
      </h5>

      <div className=" w-full">
        <ChartComponent
          chartData={data}
          type={"pie"}
          options={options}
          chartName={"Employee"}
        />
      </div>
    </div>
  );
};

export default EmployeeChart;
