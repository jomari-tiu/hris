import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import ControllerFieldData from "@/components/ControllerFieldData";
import DialogBox from "@/components/DialogBox";
import { usePost, useRemove } from "@/util/api";

type awards = {
  employee_name: string;
  employee_id: string;
  award_name: string;
  date_awarded: string;
  remarks: string;
  id?: string;
};

type Props = {
  defaultValues: awards;
  setModal: Function;
};

function AwardsAccomplishmentsForm({ defaultValues, setModal }: Props) {
  const { setNotification } = useGlobalState();
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<awards>({
    defaultValues: defaultValues,
  });

  const successDelete = () => {
    setModal(false);
    setNotification(true, "success", `Awards Successfully deleted!`);
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
    "awards-list"
  );

  const { isLoading, mutate } = usePost(
    success,
    error,
    "/api/awards",
    defaultValues?.id ? defaultValues?.id : false,
    "awards-list"
  );

  const SubmitHandler = (data: any) => {
    delete data.employee_name;
    delete data.id;
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
      <p>{id ? "Update" : "Create"} - Awards and Accomplishments</p>
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
        <ControllerField
          control={control}
          errors={errors}
          name={"remarks"}
          rules={{ required: "required" }}
          placeholder={"Remarks"}
          type={"text"}
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

export default AwardsAccomplishmentsForm;
