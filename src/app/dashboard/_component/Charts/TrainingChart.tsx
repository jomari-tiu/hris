"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useFetch } from "@/util/api";

import ChartComponent from ".";

export type TrainingDataType = {
  years: number[];
  data: {
    backgroundColor: "#c8ddf9";
    label: "CAS";
    count: {
      year: number;
      value: number;
    }[];
  }[];
};

const TrainingChart = ({ disableRedirect }: { disableRedirect?: boolean }) => {
  const router = useRouter();

  const [barChartData, setBarChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const { data, isLoading } = useFetch(
    "dashboard-training",
    ["dashboard-training"],
    "/api/dashboard/trainings"
  );

  const trainingData: TrainingDataType = data?.data?.data;

  useEffect(() => {
    setBarChartData({
      labels: trainingData?.years, // x-axis
      datasets: trainingData?.data.map((item) => {
        return {
          id: item?.count.map((item) => item.year),
          label: item?.label,
          data: item?.count.map((item) => item.value),
          backgroundColor: item.backgroundColor,
        };
      }),
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
        display: true,
      },
      title: {
        display: true,
        text: "Training Record",
        font: {
          weight: "bold",
          size: 20,
        },
        align: "start",
        padding: {
          bottom: 20,
        },
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
        {/* <h5 className="inline-block font-bold text-black relative underline-ccgreen">
          Training
        </h5> */}

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

export default TrainingChart;
