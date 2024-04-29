"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import ChartComponent from "@/app/dashboard/_component/Charts";
import { useFetch } from "@/util/api";

export type TrainingDataType = {
  data: {
    count: number;
    year: number;
  }[];
  years: number[];
};

const AwardsEmployeeChart = ({
  disableRedirect,
}: {
  disableRedirect?: boolean;
}) => {
  const router = useRouter();

  const [barChartData, setBarChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const { data, isLoading } = useFetch(
    "dashboard-employee-awards",
    ["dashboard-employee-awards"],
    "/api/dashboard/employee-awards"
  );

  const trainingData: TrainingDataType = data?.data?.data;

  useEffect(() => {
    setBarChartData({
      labels: trainingData?.years, // x-axis
      datasets: [
        {
          id: trainingData?.data.map((item) => item.count),
          label: trainingData?.data.map((item) => item.year),
          data: trainingData?.data.map((item) => item.count),
          backgroundColor: "#d1c675",
        },
      ],
    });
  }, [trainingData]);

  const options = {
    onClick: (event: any, elements: any) => {
      if (disableRedirect) return;
      // Handle click on the chart itself
      if (elements.length > 0) {
        router.push("/employee-management/training-records");
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      datalabels: {
        color: "#fff",
        textShadowColor: "#000",
        textShadowBlur: 10,
        formatter: function (value: any, context: any) {
          const hrValue = value <= 0 ? "" : value;
          return hrValue;
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <>
      <div className=" flex flex-col items-start w-full">
        <h5 className="inline-block font-bold text-black relative underline-ccgreen">
          Training
        </h5>
        <ChartComponent
          chartData={barChartData}
          type={"bar"}
          options={options}
          chartName={"traning-chart"}
        />
      </div>
    </>
  );
};

export default AwardsEmployeeChart;
