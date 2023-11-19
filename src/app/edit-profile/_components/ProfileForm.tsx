"use client";

import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import PageTitle from "@/components/PageTitle";
import { usePost, useRemove } from "@/util/api";

type profile = {
  id?: string;
  name: string;
  password?: string;
  password_confirmation?: string;
  current_password?: string;
};

type Props = {
  defaultValues: profile;
};

function ProfileForm({ defaultValues }: Props) {
  const { setNotification } = useGlobalState();
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<profile>({
    defaultValues: defaultValues,
  });

  const success = () => {
    setNotification(true, "success", `Profile Successfully Updated!`);
  };
  const error = (error: any) => {
    setNotification(true, "error", error);
  };

  const { isLoading, mutate } = usePost(
    success,
    error,
    "/api/update-profile",
    defaultValues?.id ? defaultValues?.id : false,
    "user-profile"
  );

  const SubmitHandler = (data: any) => {
    mutate({
      name: data.name,
      password: data.password,
      password_confirmation: data.password_confirmation,
      current_password: data.current_password,
    });
  };

  return (
    <div className=" space-y-5">
      <PageTitle title={["Update Profile"]} />
      <form onSubmit={handleSubmit(SubmitHandler)} className=" space-y-5">
        <ControllerField
          control={control}
          errors={errors}
          rules={{ required: "required" }}
          name={"name"}
          placeholder={"Name"}
          type={"text"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"password"}
          rules={{ required: "required" }}
          placeholder={"Password"}
          type={"password"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"password_confirmation"}
          rules={{ required: "required" }}
          placeholder={"Password Confirmation"}
          type={"password"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"current_password"}
          rules={{ required: "required" }}
          placeholder={"Current Password"}
          type={"password"}
        />
        <div className=" flex justify-end items-center">
          <Button type="submit" appearance={"primary"} loading={isLoading}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
