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
import { Line, Bar } from "react-chartjs-2";
import { AiOutlineArrowRight } from "react-icons/ai";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DepartmentWise() {
  const [LineChart, setLineChart] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setLineChart({
      labels: ["sample", "sample"],
      datasets: [
        {
          label: "sampleDSlbl",
          data: [1, 2],

          backgroundColor: "#520100",
        },
      ],
    });
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        display: false,
      },
    },
    layout: {
      padding: 20,
    },
  };
  return (
    <div className=" space-y-5">
      <h5 className="inline-block font-bold text-red-2 relative after:content-[''] after:absolute after:w-full after:bottom-0 after:left-0 after:h-[2px] after:bg-yellow-400">
        Department Wise Tardines
      </h5>
      <ul className=" flex items-center justify-between gap-3">
        <li>
          <select>
            <option value="January">January</option>
            <option value="Febuary">Febuary</option>
          </select>
        </li>
        <li className=" flex items-center gap-2">
          <input type="date" />
          <AiOutlineArrowRight className=" text-red-2" />
          <input type="date" />
        </li>
      </ul>
      <ul className=" flex gap-3 items-center">
        <li>Average</li>
        <li>
          <p className=" text-center">Minutes</p>
          <h3 className=" font-bold text-red-2 text-center">15mins</h3>
        </li>
        <li>
          <p className=" text-center">Occurences</p>
          <h3 className=" font-bold text-red-2 text-center">4.6</h3>
        </li>
      </ul>
      <aside>
        <Bar data={LineChart} options={options} />
      </aside>
    </div>
  );
}

export default DepartmentWise;
