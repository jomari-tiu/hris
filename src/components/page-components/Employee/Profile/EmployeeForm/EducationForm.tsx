import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import ControllerField from "@/components/ControllerField";
import LayoutColumn from "@/components/LayoutColumn";
import SectionLabel from "@/components/SectionLabel";

import { employeeEducation } from "./Type";

type Props = {
  setOverAllFormData: Function;
  setProgress: Function;
  defaultValues: any;
};

function EducationForm({
  setOverAllFormData,
  setProgress,
  defaultValues,
}: Props) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultValues,
  });

  const NextHandler = (data: employeeEducation) => {
    setOverAllFormData({
      ...defaultValues,
      elementary_basic_education: data.elementary_basic_education,
      elementary_from: data.elementary_from,
      elementary_highest_level: data.elementary_highest_level,
      elementary_name_of_school: data.elementary_name_of_school,
      elementary_scholar_honor_received: data.elementary_scholar_honor_received,
      elementary_to: data.elementary_to,
      elementary_year_graduated: data.elementary_year_graduated,
      secondary_basic_education: data.secondary_basic_education,
      secondary_from: data.secondary_from,
      secondary_highest_level: data.secondary_highest_level,
      secondary_name_of_school: data.secondary_name_of_school,
      secondary_scholar_honor_received: data.secondary_scholar_honor_received,
      secondary_to: data.secondary_to,
      secondary_year_graduated: data.secondary_year_graduated,
      vacational_basic_education: data.vacational_basic_education,
      vacational_from: data.vacational_from,
      vacational_highest_level: data.vacational_highest_level,
      vacational_name_of_school: data.vacational_name_of_school,
      vacational_scholar_honor_received: data.vacational_scholar_honor_received,
      vacational_to: data.vacational_to,
      vacational_year_graduated: data.vacational_year_graduated,
    });
    setProgress(2);
  };

  return (
    <form onSubmit={handleSubmit(NextHandler)} className=" space-y-10">
      <div className=" space-y-3">
        <SectionLabel>Elementary</SectionLabel>
        <LayoutColumn colNumber={3}>
          <ControllerField
            key={1}
            control={control}
            errors={errors}
            name={"elementary_name_of_school"}
            rules={{ required: "required" }}
            placeholder={"Name of School"}
            type={"text"}
          />
          <ControllerField
            key={2}
            control={control}
            errors={errors}
            name={"elementary_basic_education"}
            rules={{ required: "required" }}
            placeholder={"Basic Education/Degree/Course"}
            type={"text"}
          />
          <ControllerField
            key={3}
            control={control}
            errors={errors}
            rules={{ required: "required" }}
            name={"elementary_highest_level"}
            placeholder={"Highest Level/Units Earned"}
            type={"text"}
          />
        </LayoutColumn>
        <LayoutColumn colNumber={4}>
          <ControllerField
            control={control}
            errors={errors}
            key={1}
            name={"elementary_year_graduated"}
            rules={{ required: "required" }}
            placeholder={"Year Graduated"}
            type={"number"}
          />
          <ControllerField
            key={2}
            control={control}
            errors={errors}
            name={"elementary_scholar_honor_received"}
            rules={{ required: "required" }}
            placeholder={"Scholarship/Academic Honors Received"}
            type={"text"}
          />
          <ControllerField
            control={control}
            key={3}
            errors={errors}
            name={"elementary_from"}
            rules={{ required: "required" }}
            placeholder={"Year From"}
            type={"date"}
          />
          <ControllerField
            control={control}
            errors={errors}
            key={4}
            name={"elementary_to"}
            rules={{ required: "required" }}
            placeholder={"Year To"}
            type={"date"}
          />
        </LayoutColumn>
      </div>

      <div className=" space-y-3">
        <SectionLabel>Secondary</SectionLabel>
        <LayoutColumn colNumber={3}>
          <ControllerField
            control={control}
            errors={errors}
            key={1}
            name={"secondary_name_of_school"}
            rules={{ required: "required" }}
            placeholder={"Name of School"}
            type={"text"}
          />
          <ControllerField
            control={control}
            errors={errors}
            key={2}
            name={"secondary_basic_education"}
            rules={{ required: "required" }}
            placeholder={"Basic Education/Degree/Course"}
            type={"text"}
          />
          <ControllerField
            control={control}
            key={3}
            errors={errors}
            rules={{ required: "required" }}
            name={"secondary_highest_level"}
            placeholder={"Highest Level/Units Earned"}
            type={"text"}
          />
        </LayoutColumn>
        <LayoutColumn colNumber={4}>
          <ControllerField
            control={control}
            errors={errors}
            key={1}
            name={"secondary_year_graduated"}
            rules={{ required: "required" }}
            placeholder={"Year Graduated"}
            type={"number"}
          />
          <ControllerField
            key={2}
            control={control}
            errors={errors}
            name={"secondary_scholar_honor_received"}
            rules={{ required: "required" }}
            placeholder={"Scholarship/Academic Honors Received"}
            type={"text"}
          />
          <ControllerField
            control={control}
            errors={errors}
            key={3}
            name={"secondary_from"}
            rules={{ required: "required" }}
            placeholder={"Year From"}
            type={"date"}
          />
          <ControllerField
            control={control}
            key={4}
            errors={errors}
            name={"secondary_to"}
            rules={{ required: "required" }}
            placeholder={"Year To"}
            type={"date"}
          />
        </LayoutColumn>
      </div>

      <div className=" space-y-3">
        <SectionLabel>Vocational/Trade Course</SectionLabel>
        <LayoutColumn colNumber={3}>
          <ControllerField
            control={control}
            errors={errors}
            key={1}
            name={"vacational_name_of_school"}
            rules={{ required: "required" }}
            placeholder={"Name of School"}
            type={"text"}
          />
          <ControllerField
            key={2}
            control={control}
            errors={errors}
            name={"vacational_basic_education"}
            rules={{ required: "required" }}
            placeholder={"Basic Education/Degree/Course"}
            type={"text"}
          />
          <ControllerField
            control={control}
            key={3}
            errors={errors}
            name={"vacational_highest_level"}
            rules={{ required: "required" }}
            placeholder={"Highest Level/Units Earned"}
            type={"text"}
          />
        </LayoutColumn>
        <LayoutColumn colNumber={4}>
          <ControllerField
            control={control}
            key={1}
            errors={errors}
            name={"vacational_year_graduated"}
            rules={{ required: "required" }}
            placeholder={"Year Graduated"}
            type={"number"}
          />
          <ControllerField
            control={control}
            key={2}
            errors={errors}
            name={"vacational_scholar_honor_received"}
            rules={{ required: "required" }}
            placeholder={"Scholarship/Academic Honors Received"}
            type={"text"}
          />
          <ControllerField
            control={control}
            errors={errors}
            key={3}
            name={"vacational_from"}
            placeholder={"Year From"}
            rules={{ required: "required" }}
            type={"date"}
          />
          <ControllerField
            control={control}
            key={4}
            errors={errors}
            name={"vacational_to"}
            rules={{ required: "required" }}
            placeholder={"Year To"}
            type={"date"}
          />
        </LayoutColumn>
      </div>

      <div className=" flex justify-end items-center space-x-2">
        <Button
          appearance={"default"}
          onClick={() => {
            setProgress(0);
          }}
        >
          Back
        </Button>
        <Button type="submit" appearance={"primary"}>
          Next
        </Button>
      </div>
    </form>
  );
}

export default EducationForm;
