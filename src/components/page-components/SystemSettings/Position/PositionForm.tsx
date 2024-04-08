import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import ControllerFieldData from "@/components/ControllerFieldData";
import DialogBox from "@/components/DialogBox";
import { usePost, useRemove } from "@/util/api";

type Props = {
  defaultValues: {
    name: string;
    description: string;
    department_name: string;
    department_id: string;
    id?: string;
  };
  setModal: Function;
};

function PositionForm({ defaultValues, setModal }: Props) {
  const { setNotification } = useGlobalState();
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultValues,
  });

  const successDelete = () => {
    setModal(false);
    setNotification(true, "success", `Leave type successfully deleted!`);
  };
  const success = () => {
    setModal(false);
    setNotification(
      true,
      "success",
      `Leave type successfully ${defaultValues?.id ? "updated" : "registered"}!`
    );
  };
  const error = (error: any) => {
    setNotification(true, "error", error);
  };

  const { isLoading: DeleteLoading, mutate: Delete } = useRemove(
    successDelete,
    error,
    "/api/positions",
    "positions-list"
  );

  const { isLoading, mutate } = usePost(
    success,
    error,
    "/api/positions",
    defaultValues?.id ? defaultValues?.id : false,
    "positions-list"
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
      <p>{id ? "Update" : "Create"} - Position</p>
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

export default PositionForm;
