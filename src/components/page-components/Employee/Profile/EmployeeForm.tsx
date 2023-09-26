import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";

import Button from "@/components/Button";
import ControllerField from "@/components/ControllerField";
import Progress, { ProgressType } from "@/components/Progress";

function EmployeeForm() {
  const progressList: ProgressType = [
    { title: "Employee Info", tabNumber: 0 },
    { title: "Educational Background", tabNumber: 1 },
    { title: "Training/Seminars Attended", tabNumber: 2 },
  ];
  const [progress, setProgress] = useState<number>(0);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>();

  const submitHandler = (data: any) => {
    console.log(data);
  };
  return (
    <div className=" space-y-5">
      <p>Create - Employee</p>
      <Progress progressList={progressList} progressActive={progress} />

      <form onSubmit={handleSubmit(submitHandler)} className=" space-y-5">
        <ul className=" grid grid-cols-4 gap-x-3 gap-y-5">
          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"surname"}
              rules={{ required: "required" }}
              placeholder={"Surname"}
              type={"text"}
            />
          </li>
          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"first_name"}
              rules={{ required: "required" }}
              placeholder={"First Name"}
              type={"text"}
            />
          </li>
          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"middle_name"}
              placeholder={"Middle Name"}
              type={"text"}
            />
          </li>
          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"extension_name"}
              placeholder={"Extension Name (Optional)"}
              type={"text"}
            />
          </li>
          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"birth_date"}
              rules={{ required: "required" }}
              placeholder={"Birth Date"}
              type={"date"}
            />
          </li>

          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"birth_place"}
              rules={{ required: "required" }}
              placeholder={"Birth Place"}
              type={"text"}
            />
          </li>

          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"email"}
              placeholder={"Email (Optional)"}
              type={"text"}
            />
          </li>

          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"sex"}
              placeholder={"Sex"}
              type={"select"}
              selectOptions={["Male", "Female"]}
              rules={{ required: "required" }}
            />
          </li>
        </ul>
        <ul className=" grid grid-cols-3 gap-x-3 gap-y-5">
          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"civil_status"}
              placeholder={"Civil Status"}
              rules={{ required: "required" }}
              type={"text"}
            />
          </li>
          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"mobile_no"}
              placeholder={"Mobile Number"}
              rules={{ required: "required" }}
              type={"number"}
            />
          </li>
          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"telephone_no"}
              placeholder={"Telephone Number"}
              rules={{ required: "required" }}
              type={"number"}
            />
          </li>
          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"citizenship"}
              placeholder={"Citizenship"}
              rules={{ required: "required" }}
              type={"text"}
            />
          </li>
          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"date_hired"}
              placeholder={"Date Hired"}
              rules={{ required: "required" }}
              type={"date"}
            />
          </li>
          <li>
            <ControllerField
              control={control}
              errors={errors}
              name={"employee_id"}
              placeholder={"Employee ID"}
              rules={{ required: "required" }}
              type={"text"}
            />
          </li>
        </ul>
        <div className=" flex justify-end items-center">
          <Button type="submit" appearance={"primary"}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
