"use client";

import React, { useMemo } from "react";

import { useFieldArray } from "react-hook-form";

import ControllerField from "@/components/ControllerField";
import Layout from "@/components/Layout";
import LayoutColumn from "@/components/LayoutColumn";

type props = {
  control: any;
  errors: any;
  watch: any;
};

const SubCategory = ({ control, errors, watch }: props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    rules: {
      required: "Required!",
    },
    name: "educational_backgrounds", // This should match the name of your field in the form data
  });
  const q = watch("rating_q");
  const e = watch("rating_e");
  const t = watch("rating_t");

  const getAverage = useMemo(() => {
    const average = Number(q) + Number(e) + Number(t);
    return average / 3;
  }, [q, e, t]);
  return (
    <>
      {fields.map((field, indx) => (
        <ul
          key={indx}
          className=" p-5 border border-dashed rounded-md flex justify-between gap-5"
        >
          <li className=" w-9/12">
            <LayoutColumn colNumber={3}>
              <ControllerField
                control={control}
                errors={errors}
                name={"name"}
                rules={{ required: "required" }}
                placeholder={"Sector Goals"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                name={"major_final_output"}
                rules={{ required: "required" }}
                placeholder={"Major Final Output"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                name={"performance_indicators"}
                rules={{ required: "required" }}
                placeholder={"Performance Indicators"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                name={"target_of_accomplishment"}
                rules={{ required: "required" }}
                placeholder={"Target Of Accomplishment"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                name={"actual_accomplishments"}
                rules={{ required: "required" }}
                placeholder={"Actual Accomplishments"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                name={"remarks"}
                rules={{ required: "required" }}
                placeholder={"Remarks"}
                type={"text"}
              />
            </LayoutColumn>
          </li>
          <li className=" w-3/12 space-y-5">
            <ControllerField
              control={control}
              errors={errors}
              name={"rating_q"}
              rules={{ required: "required" }}
              placeholder={"Rating Q"}
              type={"select"}
              selectOptions={[0, 1, 2, 3, 4, 5]}
            />
            <ControllerField
              control={control}
              errors={errors}
              name={"rating_e"}
              rules={{ required: "required" }}
              placeholder={"Rating E"}
              type={"select"}
              selectOptions={[0, 1, 2, 3, 4, 5]}
            />
            <ControllerField
              control={control}
              errors={errors}
              name={"rating_t"}
              rules={{ required: "required" }}
              placeholder={"Rating T"}
              type={"select"}
              selectOptions={[0, 1, 2, 3, 4, 5]}
            />
            <aside>
              Average Rating: {isNaN(getAverage) ? 0 : getAverage?.toFixed(2)}
            </aside>
          </li>
        </ul>
      ))}
    </>
  );
};

export default SubCategory;
