import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import ControllerField from "@/components/ControllerField";
import LayoutColumn from "@/components/LayoutColumn";

import { employeeinfo } from "./Type";

type Props = {
  setOverAllFormData: Function;
  setProgress: Function;
  defaultValues: any;
};

function Info({ setOverAllFormData, setProgress, defaultValues }: Props) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultValues,
  });

  const NextHandler = (data: employeeinfo) => {
    setOverAllFormData({
      ...defaultValues,
      birth_date: data.birth_date,
      birth_place: data.birth_place,
      citizenship: data.citizenship,
      civil_status: data.civil_status,
      date_hired: data.date_hired,
      email: data.email,
      employee_id: data.employee_id,
      extension_name: data.extension_name,
      first_name: data.first_name,
      middle_name: data.middle_name,
      mobile_no: data.mobile_no,
      sex: data.sex,
      surname: data.surname,
      telephone_no: data.telephone_no,
    });
    setProgress(1);
  };

  return (
    <form onSubmit={handleSubmit(NextHandler)} className=" space-y-5">
      <LayoutColumn colNumber={4}>
        <ControllerField
          control={control}
          errors={errors}
          name={"surname"}
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
          name={"extension_name"}
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
          type={"text"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"sex"}
          placeholder={"Sex"}
          type={"select"}
          selectOptions={["Male", "Female"]}
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
          type={"text"}
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
          name={"telephone_no"}
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

      <div className=" flex justify-end items-center">
        <Button type="submit" appearance={"primary"}>
          Next
        </Button>
      </div>
    </form>
  );
}

export default Info;
