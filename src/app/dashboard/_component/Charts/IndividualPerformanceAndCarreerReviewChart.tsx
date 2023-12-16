import React, { useEffect, useState } from "react";

import Dropdown from "@/components/Dropdown";
import { useFetch } from "@/util/api";

import ChartComponent from ".";

const IndividualPerformanceAndCarreerReviewChart = () => {
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [],
  });

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

  const graphData: { rate: number; count: number }[] = graph?.data?.data?.data;

  useEffect(() => {
    setData({
      labels: graphData?.map((item) => item?.rate), // x-axis
      datasets: [
        {
          data: graphData?.map((item) => item?.count),
          backgroundColor: "#f18227",
        },
      ],
    });
  }, [graphData]);

  return (
    <div className=" h-full flex flex-col items-start justify-start gap-5">
      <h5 className="inline-block font-bold text-black relative underline-ccgreen">
        Individual Performance and Career Review
      </h5>
      <ul className=" flex flex-wrap gap-3">
        <li>
          <Dropdown
            value={period}
            setValue={setPeriod}
            endpoint={"/api/options/ipcr_periods"}
            label={"Period"}
            displayValueKey={"date_range"}
          />
        </li>
        <li>
          <Dropdown
            value={department}
            setValue={setDepartment}
            endpoint={"/api/options/departments"}
            label={"Department"}
            displayValueKey={"name"}
          />
        </li>
      </ul>
      <div className=" w-full">
        <div className=" w-full">
          <ChartComponent
            chartData={data}
            type={"bar"}
            options={options}
            chartName={"Individual-Performance-and-Career-Review"}
            redirectTo={"/performance-management/ipcr"}
          />
        </div>
      </div>
    </div>
  );
};

export default IndividualPerformanceAndCarreerReviewChart;
