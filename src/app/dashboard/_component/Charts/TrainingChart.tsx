import React, { useEffect, useState } from "react";

import ChartComponent from ".";
import { traningData } from "./sampleData/traning";

const TrainingChart = () => {
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setData({
      labels: traningData?.years, // x-axis
      datasets: traningData.data.map((item) => {
        return {
          id: item?.count.map((item) => item.id),
          label: item?.label,
          data: item?.count.map((item) => item.value),
          backgroundColor: item.backgroundColor,
        };
      }),
    });
  }, [traningData]);

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
      <div className=" flex flex-col items-start w-full">
        <h5 className="inline-block font-bold text-black relative underline-ccgreen mb-5">
          Training
        </h5>
        <ChartComponent
          chartData={data}
          type={"bar"}
          options={options}
          chartName={"traning-chart"}
        />
      </div>
    </>
  );
};

export default TrainingChart;
