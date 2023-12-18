import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import ControllerFieldData from "@/components/ControllerFieldData";
import { usePost, useRemove } from "@/util/api";

export type DataType = {
  employee_name: string;
  employee_id: string;
  department_name: string;
  department_id: string;
  award_name: string;
  date_awarded: string;
  id?: any;
};

type Props = {
  defaultValues: DataType;
  setModal: Function;
};

function DataForm({ defaultValues, setModal }: Props) {
  const { setNotification } = useGlobalState();
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DataType>({
    defaultValues: defaultValues,
  });

  const successDelete = () => {
    setModal(false);
    setNotification(true, "success", `user Successfully deleted!`);
  };
  const success = () => {
    setModal(false);
    setNotification(
      true,
      "success",
      `user Successfully ${defaultValues?.id ? "updated" : "registered"}!`
    );
  };
  const error = (error: any) => {
    setNotification(true, "error", error);
  };

  const { isLoading: DeleteLoading, mutate: Delete } = useRemove(
    successDelete,
    error,
    "/api/awards",
    "awards-list-data"
  );

  const { isLoading, mutate } = usePost(
    success,
    error,
    "/api/awards",
    defaultValues?.id ? defaultValues?.id : false,
    "awards-list-data"
  );

  const SubmitHandler = (data: any) => {
    delete data.department_name;
    delete data.employee_name;
    mutate(data);
  };

  return (
    <div className=" space-y-5">
      <p>{id ? "Update" : "Create"} - Data</p>
      <form onSubmit={handleSubmit(SubmitHandler)} className=" space-y-2">
        <ControllerFieldData
          control={control}
          errors={errors}
          rules={{ required: "required" }}
          name={"employee_id"}
          keyID="id"
          keyName="full_name_formal"
          displayValue={watch("employee_name")}
          displayValueKey={"employee_name"}
          setDisplayValue={setValue}
          placeholder={"Employee"}
          endpoint={"/api/options/employees"}
        />
        <ControllerFieldData
          control={control}
          errors={errors}
          rules={{ required: "required" }}
          name={"department_id"}
          displayValue={watch("department_name")}
          displayValueKey={"department_name"}
          setDisplayValue={setValue}
          placeholder={"Department"}
          endpoint={"/api/options/departments"}
        />

        <ControllerField
          control={control}
          errors={errors}
          name={"award_name"}
          rules={{ required: "required" }}
          placeholder={"Awards / Accomplishments"}
          type={"text"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"date_awarded"}
          rules={{ required: "required" }}
          placeholder={"Date"}
          type={"date"}
        />
        <div className=" flex justify-end items-center">
          {defaultValues?.id && (
            <Button
              appearance={"primary"}
              loading={DeleteLoading}
              onClick={() => Delete(defaultValues?.id)}
            >
              Delete
            </Button>
          )}
          <Button type="submit" appearance={"primary"} loading={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DataForm;
