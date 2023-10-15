"use client";
import React, { useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";

import { AiOutlineRollback } from "react-icons/ai";

import BackButton from "@/components/BackButton";

import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";

import Tab from "@/components/Tab";

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
  const [isTab, setTab] = useState("Personal Information");
  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultValue,
  });

  const UpdateHandler = (data: any) => {};
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
          <Info control={control} errors={errors} watch={watch} />
        )}
        {isTab === "Educational Background" && (
          <EducationForm control={control} errors={errors} />
        )}
        {isTab === "Training/Seminars" && (
          <TrainingForm control={control} errors={errors} />
        )}
        <div className=" flex justify-end">
          <Button appearance={"primary"} loading={false} type="submit">
            Update
          </Button>
        </div>
      </form>
    </section>
  );
}

export default ProfileDetail;
