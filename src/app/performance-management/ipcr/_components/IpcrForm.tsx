import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import ControllerFieldData from "@/components/ControllerFieldData";
import LayoutColumn from "@/components/LayoutColumn";
import Modal from "@/components/Modal";
import PageTitle from "@/components/PageTitle";
import Tab from "@/components/Tab";

import { useFetch, usePost, useRemove } from "@/util/api";

import SubCategory from "./SubCategory";
import SubCategoryForm from "./SubCategoryForm";

type ipcr = {
  id?: string;
  employee_name?: string;
  employee_id: string;
  ipcr_period_id: string;
  ipcr_period_date_range?: string;
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
  // const { data: ipcrCategory, isLoading: ipcrLoading } = useFetch(
  //   "ipcr-category",
  //   ["ipcr-category"],
  //   `/api/options/ipcr_categories`
  // );

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
    // mutate(data);
    console.log(data);
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
            keyID="id"
            keyName="full_name_formal"
            displayValue={watch("employee_name")}
            displayValueKey={"employee_name"}
            setDisplayValue={setValue}
            placeholder={"Employee"}
            endpoint={"/api/options/employees"}
          />
          <ControllerFieldData
            control={control}
            errors={errors}
            rules={{ required: "required" }}
            displayValue={watch("reviewed_by_name")}
            displayValueKey={"reviewed_by_name"}
            name={"reviewed_by"}
            keyID="id"
            keyName="full_name_formal"
            setDisplayValue={setValue}
            placeholder={"Reviewed By"}
            endpoint={"/api/options/employees"}
          />
          <ControllerFieldData
            control={control}
            errors={errors}
            rules={{ required: "required" }}
            displayValue={watch("recommending_approval_name")}
            displayValueKey={"recommending_approval_name"}
            name={"recommending_approval"}
            keyID="id"
            keyName="full_name_formal"
            setDisplayValue={setValue}
            placeholder={"Recommending Approval"}
            endpoint={"/api/options/employees"}
          />

          <ControllerFieldData
            control={control}
            errors={errors}
            rules={{ required: "required" }}
            name={"ipcr_period_id"}
            keyID="id"
            keyName="date_range"
            displayValue={watch("ipcr_period_date_range")}
            displayValueKey={"ipcr_period_date_range"}
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

        <aside className=" w-full space-y-5">
          <div className=" w-full flex items-center gap-4">
            <p className=" text-red-2 font-bold">
              Strategic Functions {`(40%)`}
            </p>
            <div className=" flex-1 h-[2px] bg-red-2"></div>
          </div>
          <SubCategory
            watch={watch}
            category_id={"12312"}
            category_name={"strategic"}
            control={control}
            errors={errors}
          />
        </aside>
        <aside className=" w-full space-y-5">
          <div className=" w-full flex items-center gap-4">
            <p className=" text-red-2 font-bold">Core Functions {`(40%)`}</p>
            <div className=" flex-1 h-[2px] bg-red-2"></div>
          </div>
          <SubCategory
            watch={watch}
            category_id={"4443"}
            category_name={"core"}
            control={control}
            errors={errors}
          />
        </aside>

        <aside className=" w-full space-y-5">
          <div className=" w-full flex items-center gap-4">
            <p className=" text-red-2 font-bold">Support Functions {`(20%)`}</p>
            <div className=" flex-1 h-[2px] bg-red-2"></div>
          </div>
          <SubCategory
            watch={watch}
            category_id={"76564"}
            category_name={"support"}
            control={control}
            errors={errors}
          />
        </aside>

        {/* {dummy.map((item, indx) => (
          <aside key={indx} className=" w-full space-y-5">
            <div className=" w-full flex items-center gap-4">
              <p className=" text-red-2 font-bold">
                {item.name} {`(40%)`}
              </p>
              <div className=" flex-1 h-[2px] bg-red-2"></div>
            </div>
            <SubCategory
              watch={watch}
              category_id={item.id}
              category_name={item.name}
              control={control}
              errors={errors}
            />
          </aside>
        ))} */}

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
