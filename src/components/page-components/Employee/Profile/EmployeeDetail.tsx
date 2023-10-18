"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";

import { AiOutlineRollback } from "react-icons/ai";

import BackButton from "@/components/BackButton";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";

import PageTitle from "@/components/PageTitle";

import Tab from "@/components/Tab";
import { usePost } from "@/util/api";

import EducationForm from "./EmployeeForm/EducationForm";
import Info from "./EmployeeForm/Info";
import TrainingForm from "./EmployeeForm/TrainingForm";
import {
  employeeEducation,
  employeeTrainings,
  employeeinfo,
} from "./EmployeeForm/Type";

type Props = {
  defaultValue:
    | (employeeinfo & employeeEducation & { trainings: employeeTrainings })
    | null;
};

function ProfileDetail({ defaultValue }: Props) {
  const { setNotification } = useGlobalState();

  const [isTab, setTab] = useState("Personal Information");
  const [api, setApi] = useState("/api/employees");

  useEffect(() => {
    if (isTab === "Personal Information") {
      setApi("/api/employees");
    }
    if (isTab === "Educational Background") {
      setApi("/api/employees/education");
    }
    if (isTab === "Training/Seminars/") {
      setApi("/api/employees/training");
    }
  }, [isTab]);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultValue,
  });

  const success = () => {
    setNotification(
      true,
      "success",
      `Employee's ${isTab} Successfully Updated!`
    );
  };

  const error = (error: any) => {
    setNotification(true, "error", error);
  };

  const { isLoading, mutate } = usePost(
    success,
    error,
    api,
    defaultValue?.id ? defaultValue?.id : false,
    "profile-list"
  );

  const UpdateHandler = (
    data: employeeinfo &
      employeeEducation & { trainings: employeeTrainings | undefined }
  ) => {
    if (isTab === "Personal Information") {
      delete data.trainings;
      delete data.educational_backgrounds;
      delete data.department_name;
      delete data.position_name;
      mutate(data);
      return;
    }
    if (isTab === "Educational Background") {
      const payload = {
        educational_backgrounds: data.educational_backgrounds,
      };
      mutate(payload);
      return;
    }
    if (isTab === "Training/Seminars") {
      const payload = {
        trainings: data.trainings,
      };
      mutate(payload);
      return;
    }
  };
  return (
    <section className=" space-y-5">
      <BackButton url={"/employee-management/profile"} />

      <PageTitle title={["Employee", "Profile"]} />
      <Tab
        tab={isTab}
        setTab={setTab}
        tabMenu={[
          "Personal Information",
          "Educational Background",
          "Training/Seminars",
        ]}
      />
      <form onSubmit={handleSubmit(UpdateHandler)} className=" space-y-5">
        {isTab === "Personal Information" && (
          <Info
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}
        {isTab === "Educational Background" && (
          <EducationForm control={control} errors={errors} />
        )}
        {isTab === "Training/Seminars" && (
          <TrainingForm control={control} errors={errors} />
        )}
        <div className=" flex justify-end">
          <Button appearance={"primary"} loading={isLoading} type="submit">
            Update
          </Button>
        </div>
      </form>
    </section>
  );
}

export default ProfileDetail;
