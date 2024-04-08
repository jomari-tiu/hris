import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import DialogBox from "@/components/DialogBox";
import { usePost, useRemove } from "@/util/api";

type Props = {
  defaultValues: any;
  setModal: Function;
};

function EmployeeStatusForm({ defaultValues, setModal }: Props) {
  const { setNotification } = useGlobalState();
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultValues,
  });

  const successDelete = () => {
    setModal(false);
    setNotification(true, "success", `Status successfully deleted!`);
  };
  const success = () => {
    setModal(false);
    setNotification(
      true,
      "success",
      `Status successfully ${defaultValues?.id ? "updated" : "registered"}!`
    );
  };
  const error = (error: any) => {
    setNotification(true, "error", error);
  };

  const { isLoading: DeleteLoading, mutate: Delete } = useRemove(
    successDelete,
    error,
    "/api/employment_statuses",
    "employment_statuses-list"
  );

  const { isLoading, mutate } = usePost(
    success,
    error,
    "/api/employment_statuses",
    defaultValues?.id ? defaultValues?.id : false,
    "employment_statuses-list"
  );

  const SubmitHandler = (data: any) => {
    delete data.deleted_at;
    delete data.user_id;
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
      <p>{id ? "Update" : "Create"} - Employee Status</p>
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
          name={"description"}
          rules={{ required: "required" }}
          placeholder={"Description"}
          type={"textarea"}
        />

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

export default EmployeeStatusForm;
