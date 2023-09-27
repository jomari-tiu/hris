import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import ControllerField from "@/components/ControllerField";

type user = {
  name: string;
  email: string;
  id?: string;
};

type Props = {
  defaultValues: user;
};

function UserForm({ defaultValues }: Props) {
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<user>({
    defaultValues: defaultValues,
  });

  const SubmitHandler = (data: any) => {
    console.log(data);
  };

  return (
    <div className=" space-y-5">
      <p>{id ? "Update" : "Create"} - User</p>
      <form onSubmit={handleSubmit(SubmitHandler)} className=" space-y-2">
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
          name={"email"}
          rules={{ required: "required" }}
          placeholder={"Email"}
          type={"email"}
        />
        <div className=" flex justify-end items-center">
          <Button type="submit" appearance={"primary"}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
