import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useFetch } from "@/util/api";

import ChartComponent from ".";

export type AwardsDataType = {
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

const AwardsAndAccomplishmentsChart = () => {
  const router = useRouter();

  const [barChartData, setBarChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const { data, isLoading } = useFetch(
    "dashboard-awards-accomplishments",
    ["dashboard-awards-accomplishments"],
    "/api/dashboard/awards"
  );

  const awardsData: AwardsDataType = data?.data?.data;

  useEffect(() => {
    setBarChartData({
      labels: awardsData?.years, // x-axis
      datasets: awardsData?.data?.map((item) => {
        return {
          id: item?.count.map((item) => item.year),
          label: item?.label,
          data: item?.count.map((item) => item.value),
          backgroundColor: item.backgroundColor,
        };
      }),
    });
  }, [awardsData]);

  const options = {
    onClick: (event: any, elements: any) => {
      // Handle click on the chart itself
      if (elements.length > 0) {
        router.push("/employee-management/awards-accomplishments");
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
          Awards and Accomplishments
        </h5>
        <ChartComponent
          chartData={barChartData}
          type={"bar"}
          options={options}
          chartName={"awards-accomplishments-chart"}
        />
      </div>
    </>
  );
};

export default AwardsAndAccomplishmentsChart;
