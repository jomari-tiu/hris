"use client";

import React, { useEffect, useState } from "react";

import { display } from "html2canvas/dist/types/css/property-descriptors/display";

import { useRouter } from "next/navigation";

import { useFetch } from "@/util/api";

import ChartComponent from ".";

const EmployeeChart = ({ disableRedirect }: { disableRedirect?: boolean }) => {
  const router = useRouter();
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const options = {
    onClick: (event: any, elements: any) => {
      if (disableRedirect) return;
      // Handle click on the chart itself
      if (elements.length > 0) {
        router.push("/employee-management/profile");
        // const clickedElement = elements[0];
        // console.log("Chart Element Clicked:", clickedElement);
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
        text: "Employees",
        font: {
          weight: "bold",
          size: 20,
        },
        align: "center",
      },
      datalabels: {
        color: "#fff",
        textShadowColor: "#000",
        textShadowBlur: 10,
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
  const { data: graph, isLoading: graphLoading } = useFetch(
    "employee-pie-chart",
    ["employee-pie-chart"],
    `/api/dashboard/employees`
  );

  const graphData: { label: string; count: number; backgroundColor: string }[] =
    graph?.data?.data;

  useEffect(() => {
    setData({
      labels: graphData ? graphData?.map((item) => item.label) : ["", ""], // x-axis
      datasets: [
        {
          data: graphData ? graphData?.map((item) => item.count) : [0, 0], // y-axis
          backgroundColor: ["#3b8ad9", "#e24b26"],
        },
      ],
    });
  }, [graphData]);

  return (
    <div className=" h-full flex flex-col items-start justify-start">
      {/* <h5 className="inline-block font-bold text-black relative underline-ccgreen">
        Employees
      </h5> */}
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
