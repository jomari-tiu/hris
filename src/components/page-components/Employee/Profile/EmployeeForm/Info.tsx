import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import ControllerField from "@/components/ControllerField";
import ControllerFieldData from "@/components/ControllerFieldData";

import LayoutColumn from "@/components/LayoutColumn";

import { employeeinfo, employeeEducation, employeeTrainings } from "./Type";

type Props = {
  control: any;
  errors: any;
  watch: any;
};

function Info({ control, errors, watch }: Props) {
  return (
    <div className=" space-y-5">
      <LayoutColumn colNumber={3}>
        <ControllerFieldData
          control={control}
          errors={errors}
          rules={{ required: "required" }}
          name={"department_id"}
          displayValue={watch("department_name")}
          placeholder={"Department"}
          endpoint={"/api/options/departments"}
        />
        <ControllerFieldData
          control={control}
          errors={errors}
          rules={{ required: "required" }}
          name={"position_id"}
          placeholder={"Position"}
          displayValue={watch("position_name")}
          endpoint={"/api/options/positions"}
          parentFilter={`?department_id=${watch("department_id")}`}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"is_flexible"}
          rules={{ required: "required" }}
          placeholder={"Flexible Schedule"}
          type={"checkbox"}
        />
      </LayoutColumn>
      <LayoutColumn colNumber={4}>
        <ControllerField
          control={control}
          errors={errors}
          name={"last_name"}
          rules={{ required: "required" }}
          placeholder={"Surname"}
          type={"text"}
        />

        <ControllerField
          control={control}
          errors={errors}
          name={"first_name"}
          rules={{ required: "required" }}
          placeholder={"First Name"}
          type={"text"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"middle_name"}
          placeholder={"Middle Name"}
          type={"text"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"name_ext"}
          placeholder={"Extension Name (Optional)"}
          type={"text"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"birth_date"}
          rules={{ required: "required" }}
          placeholder={"Birth Date"}
          type={"date"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"birth_place"}
          rules={{ required: "required" }}
          placeholder={"Birth Place"}
          type={"text"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"email"}
          placeholder={"Email (Optional)"}
          type={"email"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"sex"}
          placeholder={"Sex"}
          type={"select"}
          selectOptions={["male", "female"]}
          rules={{ required: "required" }}
        />
      </LayoutColumn>
      <LayoutColumn colNumber={3}>
        <ControllerField
          control={control}
          errors={errors}
          name={"civil_status"}
          placeholder={"Civil Status"}
          rules={{ required: "required" }}
          type={"select"}
          selectOptions={["married", "single", "widowed", "separated"]}
        />

        <ControllerField
          control={control}
          errors={errors}
          name={"mobile_no"}
          placeholder={"Mobile Number"}
          rules={{ required: "required" }}
          type={"number"}
        />

        <ControllerField
          control={control}
          errors={errors}
          name={"tel_no"}
          placeholder={"Telephone Number"}
          rules={{ required: "required" }}
          type={"number"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"citizenship"}
          placeholder={"Citizenship"}
          rules={{ required: "required" }}
          type={"text"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"date_hired"}
          placeholder={"Date Hired"}
          rules={{ required: "required" }}
          type={"date"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"employee_id"}
          placeholder={"Employee ID"}
          rules={{ required: "required" }}
          type={"text"}
        />
      </LayoutColumn>
    </div>
  );
}

export default Info;
