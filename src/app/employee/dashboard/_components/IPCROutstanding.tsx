"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Dropdown from "@/components/Dropdown";

import { useFetch } from "@/util/api";

const IPCROutstanding = () => {
  const [period, setPeriod] = useState({
    value: "",
    id: "",
  });

  const { data, isLoading: graphLoading } = useFetch(
    "ipcr-employee-graph",
    ["ipcr-employee-graph", period.id],
    `/api/dashboard/employee-ipcr?ipcr_period_id=${period.id}`
  );

  return (
    <div className=" h-full flex flex-col items-start justify-start gap-g">
      <h5 className="inline-block font-bold text-black relative underline-ccgreen mb-2">
        Individual Performance and Career Review
      </h5>
      <ul className=" flex-1 flex justify-between items-start flex-wrap w-full">
        <li className=" w-full">
          <Dropdown
            value={period}
            setValue={setPeriod}
            endpoint={"/api/options/ipcr_periods"}
            label={"Period"}
            displayValueKey={"date_range"}
          />
        </li>
        <li className=" text-end flex-1 flex justify-center items-center">
          <div className=" text-center">
            <h1 className=" text-3xl">
              {data?.data?.data?.final_average_rating}
            </h1>
            <p>Final Average Rating</p>
          </div>
        </li>
        <li className=" text-end flex-1 flex justify-center items-center">
          <div className=" text-center">
            <h1 className=" text-3xl">{data?.data?.data?.adjectival_rating}</h1>
            <p>Adjectival Rating</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default IPCROutstanding;
