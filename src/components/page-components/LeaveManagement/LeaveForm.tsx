import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import ControllerFieldData from "@/components/ControllerFieldData";
import LayoutColumn from "@/components/LayoutColumn";
import { usePost, useRemove } from "@/util/api";

export type LeaveDefaultValue = {
  employee_id: string;
  employee_name: string;
  leave_type_id: string;
  leave_type_name: string;
  date_filed: string;
  date_start: string;
  date_end: string;
  time_start: string;
  time_end: string;
  details_of_leave: string;
  status: string;
  disapproved_for: string;
  approved_for: string;
  approved_for_type: string;
  commutation: string;
  id?: any;
};

export type LeaveResponse = {
  id: string;
  employee_id: string;
  date_filed: string;
  date_start: string;
  date_end: string;
  time_start: string;
  time_end: string;
  leave_type_id: string;
  status: string;
  details_of_leave: string;
  disapproved_for: string;
  approved_for: string;
  approved_for_type: any;
  commutation: any;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  employee: {
    last_name: string;
    first_name: string;
    id: string;
  };
  leave_type: {
    name: string;
    id: string;
  };
};

type Props = {
  defaultValues: LeaveDefaultValue;
  setModal: Function;
};

function LeaveForm({ defaultValues, setModal }: Props) {
  const { setNotification } = useGlobalState();
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeaveDefaultValue>({
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
    "leaves-list"
  );

  const { isLoading, mutate } = usePost(
    success,
    error,
    "/api/leaves",
    defaultValues?.id ? defaultValues?.id : false,
    "leaves-list"
  );

  const SubmitHandler = (data: any) => {
    delete data.employee_name;
    delete data.leave_type_name;
    mutate(data);
  };

  return (
    <div className=" space-y-5">
      <p>{id ? "Update" : "Create"} - Leave</p>
      <form onSubmit={handleSubmit(SubmitHandler)} className=" space-y-5">
        <ControllerFieldData
          control={control}
          errors={errors}
          rules={{ required: "required" }}
          name={"employee_id"}
          placeholder={"Name"}
          displayValue={defaultValues?.employee_name}
          endpoint={"/api/employees"}
          keyName={"first_name"}
          FourData={true}
        />
        <LayoutColumn colNumber={3}>
          <ControllerFieldData
            control={control}
            errors={errors}
            rules={{ required: "required" }}
            name={"leave_type_id"}
            placeholder={"Leave Type"}
            displayValue={defaultValues?.leave_type_name}
            endpoint={"/api/leave_types"}
            FourData={true}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={"status"}
            rules={{ required: "required" }}
            placeholder={"Status"}
            type={"select"}
            selectOptions={["pending", "approved", "disapproved"]}
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
            name={"date_start"}
            rules={{ required: "required" }}
            placeholder={"Start Date"}
            type={"date"}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={"date_end"}
            rules={{ required: "required" }}
            placeholder={"End Date"}
            type={"date"}
          />
        </LayoutColumn>

        <LayoutColumn colNumber={2}>
          <ControllerField
            control={control}
            errors={errors}
            name={"time_start"}
            rules={{ required: "required" }}
            placeholder={"Start Time"}
            type={"text"}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={"time_end"}
            rules={{ required: "required" }}
            placeholder={"End Time"}
            type={"text"}
          />
        </LayoutColumn>
        <ControllerField
          control={control}
          errors={errors}
          name={"details_of_leave"}
          rules={{ required: "required" }}
          placeholder={"Details of Leave"}
          type={"textarea"}
        />
        {watch("status") === "disapproved" && (
          <ControllerField
            control={control}
            errors={errors}
            name={"disapproved_for"}
            rules={{ required: "required" }}
            placeholder={"Disapproved for"}
            type={"textarea"}
          />
        )}
        <LayoutColumn colNumber={2}>
          {watch("status") === "approved" && (
            <aside className=" space-y-2">
              <ControllerField
                control={control}
                errors={errors}
                name={"approved_for"}
                rules={{ required: "required" }}
                placeholder={"Approved for"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                name={"approved_for_type"}
                rules={{ required: "required" }}
                placeholder={""}
                type={"radio"}
                radioOptions={[
                  { label: "days with pay", value: 1 },
                  { label: "days without pay", value: 2 },
                  { label: "others (specify)", value: 3 },
                ]}
              />
            </aside>
          )}
          <aside className=" space-y-2">
            <ControllerField
              control={control}
              errors={errors}
              name={"commutation"}
              rules={{ required: "required" }}
              placeholder={"Commutation"}
              type={"radio"}
              radioOptions={[
                { label: "Not Requested", value: 0 },
                { label: "Requested", value: 1 },
              ]}
            />
          </aside>
        </LayoutColumn>

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
