import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import ControllerFieldData from "@/components/ControllerFieldData";
import LayoutColumn from "@/components/LayoutColumn";
import PageTitle from "@/components/PageTitle";
import Tab from "@/components/Tab";
import { usePost, useRemove } from "@/util/api";

import SubCategory from "./SubCategory";

type ipcr = {
  id?: string;
  employee_name?: string;
  employee_id: string;
  ipcr_period_id: string;
  ipcr_period_name?: string;
  reviewed_by: string;
  reviewed_by_name: string;
  recommending_approval: string;
  recommending_approval_name: string;
  evaluations?: evaluations[];
};

type evaluations = {
  category_id: string;
  name: string;
  order: number;
  major_final_output: string;
  performance_indicators: string;
  target_of_accomplishment: string;
  actual_accomplishments: string;
  rating_q: number;
  rating_e: number;
  rating_t: number;
  remarks: string;
  evaluations?: evaluations[];
};

type Props = {
  defaultValues: ipcr;
  setModal: Function;
};

function IpcrForm({ defaultValues, setModal }: Props) {
  const dummy = [
    {
      id: "adsa",
      name: "Strategic Functions",
    },
    {
      id: "12312312",
      name: "Core Functions",
    },
  ];
  const { setNotification } = useGlobalState();
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ipcr>({
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
      <p>{id ? "Update" : "Create"} - IPCR</p>
      <form onSubmit={handleSubmit(SubmitHandler)} className=" space-y-5">
        <Tab
          tab={"Employee Information"}
          setTab={() => {}}
          tabMenu={["Employee Information"]}
        />
        <LayoutColumn colNumber={4}>
          <ControllerFieldData
            control={control}
            errors={errors}
            rules={{ required: "required" }}
            name={"employee_id"}
            keyID="employee_id"
            keyName="last_name"
            displayValue={watch("employee_name")}
            displayValueKey={"employee_name"}
            setDisplayValue={setValue}
            placeholder={"Employee"}
            endpoint={"/api/employees"}
            FourData={true}
          />
          <ControllerFieldData
            control={control}
            errors={errors}
            rules={{ required: "required" }}
            displayValue={watch("reviewed_by_name")}
            displayValueKey={"reviewed_by_name"}
            name={"reviewed_by"}
            keyID="employee_id"
            keyName="last_name"
            setDisplayValue={setValue}
            placeholder={"Reviewed By"}
            endpoint={"/api/employees"}
            FourData={true}
          />
          <ControllerFieldData
            control={control}
            errors={errors}
            rules={{ required: "required" }}
            displayValue={watch("recommending_approval_name")}
            displayValueKey={"recommending_approval_name"}
            name={"recommending_approval"}
            keyID="employee_id"
            keyName="last_name"
            setDisplayValue={setValue}
            placeholder={"Recommending Approval"}
            endpoint={"/api/employees"}
            FourData={true}
          />

          <ControllerFieldData
            control={control}
            errors={errors}
            rules={{ required: "required" }}
            name={"ipcr_period_id"}
            displayValue={watch("ipcr_period_name")}
            displayValueKey={"ipcr_period_name"}
            setDisplayValue={setValue}
            placeholder={"Period"}
            endpoint={"/api/options/ipcr_periods"}
          />
        </LayoutColumn>

        <Tab
          tab={"Performance Rating"}
          setTab={() => {}}
          tabMenu={["Performance Rating"]}
        />

        {dummy.map((item, indx) => (
          <aside key={indx} className=" w-full space-y-5">
            <div className=" w-full flex items-center gap-4">
              <p className=" text-red-2 font-bold">
                {item.name} {`(40%)`}
              </p>
              <div className=" flex-1 h-[2px] bg-red-2"></div>
            </div>
            <SubCategory watch={watch} control={control} errors={errors} />
          </aside>
        ))}

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

export default IpcrForm;
