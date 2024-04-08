import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import LayoutColumn from "@/components/LayoutColumn";
import { usePost, useRemove } from "@/util/api";

type training = {
  title: string;
  description: string;
  conducted_by: string;
  period_from: string;
  period_to: string;
  hours: number;
  type_of_ld: string;
  url: string;
  id?: any;
};

type Props = {
  defaultValues: training;
  setModal: Function;
};

function TrainingForm({ defaultValues, setModal }: Props) {
  const { setNotification } = useGlobalState();
  const id = defaultValues?.id;
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<training>({
    defaultValues: defaultValues,
  });

  const successDelete = () => {
    setModal(false);
    setNotification(true, "success", `Training Successfully deleted!`);
  };
  const success = () => {
    setModal(false);
    setNotification(
      true,
      "success",
      `Training Successfully ${defaultValues?.id ? "updated" : "registered"}!`
    );
  };
  const error = (error: any) => {
    setNotification(true, "error", error);
  };

  const { isLoading: DeleteLoading, mutate: Delete } = useRemove(
    successDelete,
    error,
    "/api/trainings",
    "trainings-list"
  );

  const { isLoading, mutate } = usePost(
    success,
    error,
    "/api/trainings",
    defaultValues?.id ? defaultValues?.id : false,
    "trainings-list"
  );

  const SubmitHandler = (data: any) => {
    delete data.deleted_at;
    delete data.user_id;
    mutate(data);
  };

  return (
    <div className=" space-y-5">
      <p>{id ? "Update" : "Create"} - Training</p>
      <form onSubmit={handleSubmit(SubmitHandler)} className=" space-y-5">
        <ControllerField
          control={control}
          errors={errors}
          rules={{ required: "required" }}
          name={"title"}
          placeholder={"Title"}
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
        <LayoutColumn colNumber={2}>
          <ControllerField
            control={control}
            errors={errors}
            name={"conducted_by"}
            rules={{ required: "required" }}
            placeholder={"Conducted By"}
            type={"text"}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={"type_of_ld"}
            rules={{ required: "required" }}
            placeholder={"Type of ID"}
            type={"text"}
          />
        </LayoutColumn>
        <LayoutColumn colNumber={3}>
          <ControllerField
            control={control}
            errors={errors}
            name={"period_from"}
            rules={{ required: "required" }}
            placeholder={"Date From"}
            type={"date"}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={"period_to"}
            rules={{ required: "required" }}
            placeholder={"Date To"}
            type={"date"}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={"hours"}
            rules={{ required: "required" }}
            placeholder={"Hours"}
            type={"number"}
          />
        </LayoutColumn>
        <ControllerField
          control={control}
          errors={errors}
          name={"url"}
          placeholder={"Certificate URL/Link"}
          type={"text"}
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

export default TrainingForm;
