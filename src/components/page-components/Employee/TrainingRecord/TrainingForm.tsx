import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import LayoutColumn from "@/components/LayoutColumn";

type training = {
  title: string;
  description: string;
  conducted_by: string;
  period_from: string;
  period_to: string;
  hours: number;
  type_of_ld: string;
  id?: any;
};

type Props = {
  defaultValues: training;
};

function TrainingForm({ defaultValues }: Props) {
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

  const success = () => {};
  const error = () => {};

  const SubmitHandler = (data: any) => {
    console.log(data);
    setNotification(true, "success", "Sample");
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
        <div className=" flex justify-end items-center">
          <Button type="submit" appearance={"primary"}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TrainingForm;
