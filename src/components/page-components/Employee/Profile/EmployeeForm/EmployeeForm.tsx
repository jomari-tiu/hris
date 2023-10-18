import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import Button from "@/components/Button";

import { useGlobalState } from "@/components/Context/AppMangement";

import Progress, { ProgressType } from "@/components/Progress";

import { usePost, useRemove } from "@/util/api";

import EducationForm from "./EducationForm";
import Info from "./Info";
import TrainingForm from "./TrainingForm";
import { employeeEducation, employeeTrainings, employeeinfo } from "./Type";

type Props = {
  defaultValues?: employeeinfo &
    employeeEducation & { trainings: employeeTrainings };
  setModal: Function;
};

function EmployeeForm({ defaultValues, setModal }: Props) {
  const { setNotification } = useGlobalState();

  const progressList: ProgressType = [
    { title: "Employee Info", tabNumber: 0 },
    { title: "Educational Background", tabNumber: 1 },
    { title: "Training/Seminars Attended", tabNumber: 2 },
  ];

  const [isProgress, setIsProgress] = useState(0);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultValues,
  });

  const success = () => {
    setModal(false);
    setNotification(
      true,
      "success",
      `Employee Successfully ${defaultValues?.id ? "updated" : "registered"}!`
    );
  };

  const successDelete = () => {
    setModal(false);
    setNotification(true, "success", `Employee Successfully deleted!`);
  };

  const error = (error: any) => {
    setNotification(true, "error", error);
  };

  const { isLoading, mutate } = usePost(
    success,
    error,
    "/api/employees",
    defaultValues?.id ? defaultValues?.id : false,
    "profile-list"
  );

  const { isLoading: DeleteLoading, mutate: Delete } = useRemove(
    successDelete,
    error,
    "/api/employees",
    "profile-list"
  );

  const NextHandler = (
    data: employeeinfo &
      employeeEducation & { trainings: employeeTrainings } & {
        deleted_at?: string;
        user_id?: string;
      }
  ) => {
    if (isProgress === 2) {
      delete data.department_name;
      delete data.position_name;
      mutate(data);
    } else {
      setIsProgress((value) => value + 1);
    }
  };

  const BackHandler = () => {
    setIsProgress((value) => value - 1);
  };

  return (
    <div className=" space-y-5">
      <p>{defaultValues?.id ? "Update" : "Create"} - Employee</p>
      <Progress progressList={progressList} progressActive={isProgress} />
      <form onSubmit={handleSubmit(NextHandler)}>
        {isProgress === 0 && (
          <Info
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}
        {isProgress === 1 && (
          <EducationForm control={control} errors={errors} />
        )}
        {isProgress === 2 && <TrainingForm control={control} errors={errors} />}
        <div className=" flex justify-end items-center space-x-2 mt-5">
          {defaultValues?.id && (
            <Button
              appearance={"primary"}
              loading={DeleteLoading}
              onClick={() => Delete(defaultValues?.id)}
            >
              Delete
            </Button>
          )}
          {isProgress > 0 && (
            <Button appearance={"default"} onClick={BackHandler}>
              Back
            </Button>
          )}
          <Button type="submit" appearance={"primary"} loading={isLoading}>
            {isProgress === 2 ? "Save" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
