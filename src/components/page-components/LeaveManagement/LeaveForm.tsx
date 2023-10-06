import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import LayoutColumn from "@/components/LayoutColumn";
import { usePost, useRemove } from "@/util/api";

export type Leave = {
  name: string;
  leave_type: string;
  date_filed: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  reason: string;
  status: string;
  id?: any;
};

type Props = {
  defaultValues: Leave;
  setModal: Function;
};

function LeaveForm({ defaultValues, setModal }: Props) {
  const { setNotification } = useGlobalState();
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Leave>({
    defaultValues: defaultValues,
  });

  const successDelete = () => {
    setModal(false);
    setNotification(true, "success", `Leave Successfully deleted!`);
  };
  const success = () => {
    setModal(false);
    setNotification(
      true,
      "success",
      `Leave Successfully ${defaultValues?.id ? "updated" : "registered"}!`
    );
  };
  const error = (error: any) => {
    setNotification(true, "error", error);
  };

  const { isLoading: DeleteLoading, mutate: Delete } = useRemove(
    successDelete,
    error,
    "/api/leaves",
    "Leaves-list"
  );

  const { isLoading, mutate } = usePost(
    success,
    error,
    "/api/leaves",
    defaultValues?.id ? defaultValues?.id : false,
    "leaves-list"
  );

  const SubmitHandler = (data: any) => {
    delete data.deleted_at;
    delete data.user_id;
    mutate(data);
  };

  return (
    <div className=" space-y-5">
      <p>{id ? "Update" : "Create"} - Leave</p>
      <form onSubmit={handleSubmit(SubmitHandler)} className=" space-y-5">
        <ControllerField
          control={control}
          errors={errors}
          rules={{ required: "required" }}
          name={"name"}
          placeholder={"Name"}
          type={"text"}
        />
        <LayoutColumn colNumber={3}>
          <ControllerField
            control={control}
            errors={errors}
            name={"leave_type"}
            rules={{ required: "required" }}
            placeholder={"Leave Type"}
            type={"text"}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={"status"}
            rules={{ required: "required" }}
            placeholder={"Status"}
            type={"text"}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={"date_filed"}
            rules={{ required: "required" }}
            placeholder={"Date Filed"}
            type={"date"}
          />
        </LayoutColumn>

        <LayoutColumn colNumber={2}>
          <ControllerField
            control={control}
            errors={errors}
            name={"start_date"}
            rules={{ required: "required" }}
            placeholder={"Start Date"}
            type={"date"}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={"end_date"}
            rules={{ required: "required" }}
            placeholder={"End Date"}
            type={"date"}
          />
        </LayoutColumn>

        <LayoutColumn colNumber={2}>
          <ControllerField
            control={control}
            errors={errors}
            name={"start_time"}
            rules={{ required: "required" }}
            placeholder={"Start Time"}
            type={"text"}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={"end_time"}
            rules={{ required: "required" }}
            placeholder={"End Time"}
            type={"text"}
          />
        </LayoutColumn>
        <ControllerField
          control={control}
          errors={errors}
          name={"reason"}
          rules={{ required: "required" }}
          placeholder={"Reason"}
          type={"textarea"}
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
          <Button type="submit" loading={isLoading} appearance={"primary"}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LeaveForm;
