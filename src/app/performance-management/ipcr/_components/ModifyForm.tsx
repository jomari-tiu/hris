import React from "react";

import { CircleLoader, ClimbingBoxLoader, RotateLoader } from "react-spinners";

import { useFetch } from "@/util/api";

import IpcrForm from "./IpcrForm";
import { ipcr } from "./ipcrType";

const ModifyForm = ({ id, setModal }: { id: string; setModal: Function }) => {
  const { data, isLoading } = useFetch(
    "ipcr-detail",
    ["ipcr-detail", id],
    `/api/ipcr_evaluations/${id}`
  );

  // const lol: ipcr = {
  //   employee_name: "Wolff, Ressie J.",
  //   employee_id: "1571c8cf-4b3d-49b6-9bde-10050a996369",
  //   ipcr_period_id: "bd061613-b394-48c1-9050-762097b2485d",
  //   ipcr_period_date_range: "Feb to Jul 2020",
  //   reviewed_by: "0579d154-fad3-41d7-accb-8e8d706e1880",
  //   reviewed_by_name: "Hills, Allison",
  //   recommending_approval: "16bf97a3-f2f7-4066-a745-2bfe801b7000",
  //   recommending_approval_name: "Gerhold, Albertha B.",
  //   strategic_evaluations: [
  //     {
  //       subcategory_id: "0211f770-2e86-48ea-bc35-46b64349ad01",
  //       subcategory_name: "Prompt Sub",
  //       evaluations: [
  //         {
  //           name: "jomari",
  //           order: "",
  //           major_final_output: "jomari",
  //           performance_indicators: "jomari",
  //           target_of_accomplishment: "jomari",
  //           actual_accomplishments: "jomari",
  //           rating_q: "5",
  //           rating_e: "5",
  //           rating_t: "5",
  //           remarks: "jomari",
  //           evaluations: [],
  //         },
  //       ],
  //     },
  //   ],
  //   core_evaluations: [
  //     {
  //       subcategory_id: "0d46784e-a436-4a13-b3a9-d57c5318c28e",
  //       subcategory_name: "Instruction",
  //       evaluations: [
  //         {
  //           name: "hjomari",
  //           order: "",
  //           major_final_output: "hjomari",
  //           performance_indicators: "hjomari",
  //           target_of_accomplishment: "hjomari",
  //           actual_accomplishments: "hjomari",
  //           rating_q: "5",
  //           rating_e: "4",
  //           rating_t: "5",
  //           remarks: "hjomari",
  //           evaluations: [],
  //         },
  //       ],
  //     },
  //   ],
  //   support_evaluations: [
  //     {
  //       name: "sample",
  //       order: "",
  //       major_final_output: "sample",
  //       performance_indicators: "sample",
  //       target_of_accomplishment: "sample",
  //       actual_accomplishments: "sample",
  //       rating_q: "5",
  //       rating_e: "5",
  //       rating_t: "5",
  //       remarks: "sample",
  //       evaluations: [],
  //     },
  //   ],
  // };
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
