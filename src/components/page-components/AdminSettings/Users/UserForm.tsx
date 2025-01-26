import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import ControllerFieldData from "@/components/ControllerFieldData";
import DialogBox from "@/components/DialogBox";
import { usePost, useRemove } from "@/util/api";

type user = {
  name: string;
  email: string;
  // role_id: string;
  // employee_id: string;
  // role_name: string;
  // employee_name: string;
  // full_name_formal?: string;
  id?: string;
};

type Props = {
  defaultValues: user;
  setModal: Function;
};

function UserForm({ defaultValues, setModal }: Props) {
  console.log(defaultValues);
  const { setNotification } = useGlobalState();
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<user>({
    defaultValues: defaultValues,
  });

  const successDelete = () => {
    setModal(false);
    setNotification(true, "success", `user Successfully deleted!`);
  };
  const success = () => {
    reset();
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
    delete data.employee_name;
    delete data.full_name_formal;
    delete data.role_name;
    mutate(data);
  };

  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div className=" space-y-5">
      <DialogBox
        onConfirm={() => {
          Delete(defaultValues?.id);
        }}
        show={deleteModal}
        setShow={setDeleteModal}
        loading={DeleteLoading}
        onClose={() => {
          setDeleteModal(false);
        }}
      />
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
        {/* <ControllerFieldData
          control={control}
          errors={errors}
          rules={{ required: "required" }}
          name={"role_id"}
          keyID="id"
          keyName="name"
          displayValue={watch("role_name")}
          displayValueKey={"role_name"}
          setDisplayValue={setValue}
          placeholder={"Role"}
          endpoint={"/api/options/roles"}
        /> */}
        {/* <ControllerFieldData
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
          endpoint={"/api/options/bind-employees"}
        /> */}
        <div className=" flex justify-end items-center">
          {defaultValues?.id && (
            <Button
              appearance={"primary"}
              loading={DeleteLoading}
              onClick={() => setDeleteModal(true)}
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
