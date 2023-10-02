import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import { usePost, useRemove } from "@/util/api";

type user = {
  name: string;
  email: string;
  id?: string;
};

type Props = {
  defaultValues: user;
  setModal: Function;
};

function UserForm({ defaultValues, setModal }: Props) {
  const { setNotification } = useGlobalState();
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<user>({
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
    "/api/users",
    "users-list"
  );

  const { isLoading, mutate } = usePost(
    success,
    error,
    "/api/users",
    defaultValues?.id ? defaultValues?.id : false,
    "users-list"
  );

  const SubmitHandler = (data: any) => {
    delete data.deleted_at;
    delete data.user_id;
    mutate(data);
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

export default UserForm;
