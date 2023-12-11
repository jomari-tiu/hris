import React, { useEffect, useState } from "react";

import ChartComponent from ".";
import { awardsAndAccomplishmentsData } from "./sampleData/awardsAndAccomplishments";

const AwardsAndAccomplishmentsChart = () => {
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setData({
      labels: awardsAndAccomplishmentsData?.years, // x-axis
      datasets: awardsAndAccomplishmentsData.data.map((item) => {
        return {
          id: item?.count.map((item) => item.id),
          label: item?.label,
          data: item?.count.map((item) => item.value),
          backgroundColor: item.backgroundColor,
        };
      }),
    });
  }, [awardsAndAccomplishmentsData]);

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
          const hrValue = value;
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
      <div className=" flex flex-col items-center w-full">
        <h5 className="inline-block font-bold text-black relative underline-ccgreen mb-5">
          Awards and Accomplishments
        </h5>
        <ChartComponent
          chartData={data}
          type={"bar"}
          options={options}
          chartName={"awards-and-accomplishments"}
        />
      </div>
    </>
  );
};

export default AwardsAndAccomplishmentsChart;
