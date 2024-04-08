import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import ControllerFieldData from "@/components/ControllerFieldData";
import DialogBox from "@/components/DialogBox";
import { usePost, useRemove } from "@/util/api";

export type BalancesFormType = {
  employee_id: string;
  employee_name: string;
  remaining_vl: number;
  remaining_sl: number;
  year: number;
  id?: string;
};

type Props = {
  defaultValues: BalancesFormType;
  setModal: Function;
};

function BalancesForm({ defaultValues, setModal }: Props) {
  const { setNotification } = useGlobalState();
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BalancesFormType>({
    defaultValues: defaultValues,
  });

  const successDelete = () => {
    setModal(false);
    setNotification(true, "success", `Balance Successfully deleted!`);
  };
  const success = () => {
    setModal(false);
    setNotification(
      true,
      "success",
      `Balance Successfully ${defaultValues?.id ? "updated" : "registered"}!`
    );
  };
  const error = (error: any) => {
    setNotification(true, "error", error);
  };

  const { isLoading: DeleteLoading, mutate: Delete } = useRemove(
    successDelete,
    error,
    "/api/leave_balances",
    "leave-balances-list"
  );

  const { isLoading, mutate } = usePost(
    success,
    error,
    "/api/leave_balances",
    defaultValues?.id ? defaultValues?.id : false,
    "leave-balances-list"
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
      <p>{id ? "Update" : "Create"} - Balances</p>
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
          name={"remaining_vl"}
          rules={{ required: "required" }}
          placeholder={"Remaining Vacation Leave (VL)"}
          type={"number"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"remaining_sl"}
          rules={{ required: "required" }}
          placeholder={"Remaining Sick Leave (SL)"}
          type={"number"}
        />
        <ControllerField
          control={control}
          errors={errors}
          name={"year"}
          rules={{ required: "required" }}
          placeholder={"Year"}
          type={"number"}
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

export default BalancesForm;
