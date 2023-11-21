import React from "react";

import { CircleLoader, ClimbingBoxLoader, RotateLoader } from "react-spinners";

import { useFetch } from "@/util/api";

import IpcrForm from "./IpcrForm";

const ModifyForm = ({ id, setModal }: { id: string; setModal: Function }) => {
  const { data, isLoading } = useFetch(
    "ipcr-detail",
    ["ipcr-detail", id],
    `/api/ipcr_evaluations/${id}`
  );
  if (isLoading) {
    return (
      <div className=" w-full flex justify-center items-center">
        <aside className=" flex flex-col items-center">
          <RotateLoader className=" my-10" color="#9acd32" />
          <h3 className=" animate-pulse text-black">Fetching Data...</h3>
        </aside>
      </div>
    );
  }
  return <IpcrForm defaultValues={data?.data?.data} setModal={setModal} />;
};

export default ModifyForm;
