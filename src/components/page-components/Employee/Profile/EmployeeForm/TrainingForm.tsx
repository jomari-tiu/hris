import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { IoIosRemoveCircle } from "react-icons/io";

import Button from "@/components/Button";
import ControllerField from "@/components/ControllerField";
import LayoutColumn from "@/components/LayoutColumn";
import SectionLabel from "@/components/SectionLabel";

import { usePost } from "@/util/api";

import { employeeEducation, employeeTrainings, employeeinfo } from "./Type";

type Props = {
  control: any;
  errors: any;
};

function TrainingForm({ control, errors }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    rules: {
      required: "Required!",
    },
    name: "trainings", // This should match the name of your field in the form data
  });

  return (
    <div className=" space-y-10">
      <ul className=" space-y-10">
        {fields.map((field, index) => (
          <li key={field.id}>
            {fields.length > 1 && (
              <div className=" w-full flex justify-end">
                <IoIosRemoveCircle
                  className=" cursor-pointer hover:text-red-1 text-2xl text-black text-end"
                  onClick={() => remove(index)}
                />
              </div>
            )}
            <div className=" space-y-3">
              <LayoutColumn colNumber={2}>
                <ControllerField
                  control={control}
                  errors={errors}
                  name={`trainings[${index}].title`}
                  rules={{ required: "required" }}
                  placeholder={
                    "Title of Learning and Development Interventions/Training Program"
                  }
                  type={"text"}
                />
                <ControllerField
                  control={control}
                  errors={errors}
                  name={`trainings[${index}].conducted_by`}
                  rules={{ required: "required" }}
                  placeholder={"Conducted/Sponsor By"}
                  type={"text"}
                />
              </LayoutColumn>
              <LayoutColumn colNumber={4}>
                <ControllerField
                  control={control}
                  errors={errors}
                  name={`trainings[${index}].hours`}
                  rules={{ required: "required" }}
                  placeholder={"No. of Hours"}
                  type={"number"}
                />
                <ControllerField
                  control={control}
                  errors={errors}
                  name={`trainings[${index}].type_of_Id`}
                  rules={{ required: "required" }}
                  placeholder={"Type of I.D"}
                  type={"text"}
                />
                <ControllerField
                  control={control}
                  errors={errors}
                  name={`trainings[${index}].period_from`}
                  rules={{ required: "required" }}
                  placeholder={"From"}
                  type={"date"}
                />
                <ControllerField
                  control={control}
                  errors={errors}
                  name={`trainings[${index}].period_to`}
                  rules={{ required: "required" }}
                  placeholder={"To"}
                  type={"date"}
                />
              </LayoutColumn>
              <ControllerField
                control={control}
                errors={errors}
                name={`trainings[${index}].description`}
                rules={{ required: "required" }}
                placeholder={"Description"}
                type={"textarea"}
              />
            </div>
          </li>
        ))}
      </ul>
      <Button
        onClick={() =>
          append({
            title: "",
            conducted_by: "",
            hours: "",
            type_of_Id: "",
            period_from: "",
            period_to: "",
          })
        }
        appearance={"primary"}
      >
        Add Training/Seminar
      </Button>
    </div>
  );
}

export default TrainingForm;
