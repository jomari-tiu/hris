import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { IoIosRemoveCircle } from "react-icons/io";

import Button from "@/components/Button";
import ControllerField from "@/components/ControllerField";
import LayoutColumn from "@/components/LayoutColumn";
import SectionLabel from "@/components/SectionLabel";

import { employeeEducation } from "./Type";

type Props = {
  setOverAllFormData: Function;
  setProgress: Function;
  defaultValues: any;
};

function TrainingForm({
  setOverAllFormData,
  setProgress,
  defaultValues,
}: Props) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    rules: {
      required: "Required!",
    },
    name: "trainings", // This should match the name of your field in the form data
  });

  const SaveHandler = (data: employeeEducation) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(SaveHandler)} className=" space-y-10">
      <ul className=" space-y-10">
        {fields.map((field, index) => (
          <li key={field.id}>
            {fields.length > 1 && (
              <div className=" w-full flex justify-end">
                <IoIosRemoveCircle
                  className=" cursor-pointer hover:text-red-1 text-2xl text-red-2 text-end"
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
                  name={`trainings[${index}].hours_no`}
                  rules={{ required: "required" }}
                  placeholder={"No. of Hours"}
                  type={"number"}
                />
                <ControllerField
                  control={control}
                  errors={errors}
                  name={`trainings[${index}].type_id`}
                  rules={{ required: "required" }}
                  placeholder={"Type of I.D"}
                  type={"text"}
                />
                <ControllerField
                  control={control}
                  errors={errors}
                  name={`trainings[${index}].from`}
                  rules={{ required: "required" }}
                  placeholder={"From"}
                  type={"date"}
                />
                <ControllerField
                  control={control}
                  errors={errors}
                  name={`trainings[${index}].to`}
                  rules={{ required: "required" }}
                  placeholder={"To"}
                  type={"date"}
                />
              </LayoutColumn>
            </div>
          </li>
        ))}
      </ul>
      <Button
        onClick={() =>
          append({
            title: "",
            conducted_by: "",
            hours_no: "",
            type_id: "",
            from: "",
            to: "",
          })
        }
        appearance={"primary"}
      >
        Add Training/Seminar
      </Button>
      <div className=" flex justify-end items-center space-x-2">
        <Button
          appearance={"default"}
          onClick={() => {
            setProgress(1);
          }}
        >
          Back
        </Button>
        <Button type="submit" appearance={"primary"}>
          SAVE
        </Button>
      </div>
    </form>
  );
}

export default TrainingForm;
