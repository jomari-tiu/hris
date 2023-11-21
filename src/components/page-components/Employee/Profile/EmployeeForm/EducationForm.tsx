import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IoIosRemoveCircle } from "react-icons/io";

import Button from "@/components/Button";
import ControllerField from "@/components/ControllerField";
import LayoutColumn from "@/components/LayoutColumn";

import { employeeEducation, employeeTrainings, employeeinfo } from "./Type";

type Props = {
  control: any;
  errors: any;
};

function EducationForm({ control, errors }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    rules: {
      required: "Required!",
    },
    name: "educational_backgrounds", // This should match the name of your field in the form data
  });

  return (
    <div className=" space-y-10">
      <div className=" space-y-10">
        {/* <SectionLabel>Elementary</SectionLabel> */}
        {fields.map((field, indx) => (
          <div className=" w-full" key={indx}>
            {fields.length > 1 && (
              <div className=" w-full flex justify-end">
                <IoIosRemoveCircle
                  className=" cursor-pointer hover:text-red-1 text-2xl text-black text-end"
                  onClick={() => remove(indx)}
                />
              </div>
            )}
            <LayoutColumn colNumber={4}>
              <ControllerField
                control={control}
                errors={errors}
                name={`educational_backgrounds[${indx}].level`}
                rules={{ required: "required" }}
                placeholder={"Level"}
                type={"select"}
                selectOptions={[
                  "Elementary",
                  "Secondary",
                  "Vocational/Trade Course",
                  "College",
                  "Graduate Studies",
                ]}
              />
              <ControllerField
                control={control}
                errors={errors}
                name={`educational_backgrounds[${indx}].school_name`}
                rules={{ required: "required" }}
                placeholder={"School Name"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                rules={{ required: "required" }}
                name={`educational_backgrounds[${indx}].degree`}
                placeholder={"Degree"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                rules={{ required: "required" }}
                name={`educational_backgrounds[${indx}].units_earned`}
                placeholder={"Unit Earned"}
                type={"number"}
              />
            </LayoutColumn>
            <LayoutColumn colNumber={4}>
              <ControllerField
                control={control}
                errors={errors}
                key={1}
                name={`educational_backgrounds[${indx}].year_graduated`}
                rules={{ required: "required" }}
                placeholder={"Year Graduated"}
                type={"number"}
              />
              <ControllerField
                key={2}
                control={control}
                errors={errors}
                name={`educational_backgrounds[${indx}].academic_honors_received`}
                rules={{ required: "required" }}
                placeholder={"Scholarship/Academic Honors Received"}
                type={"text"}
              />
              <ControllerField
                control={control}
                key={3}
                errors={errors}
                name={`educational_backgrounds[${indx}].period_from`}
                rules={{ required: "required" }}
                placeholder={"Year From"}
                type={"date"}
              />
              <ControllerField
                control={control}
                errors={errors}
                key={4}
                name={`educational_backgrounds[${indx}].period_to`}
                rules={{ required: "required" }}
                placeholder={"Year To"}
                type={"date"}
              />
            </LayoutColumn>
          </div>
        ))}
      </div>

      <Button
        onClick={() =>
          append({
            level: "",
            school_name: "",
            degree: "",
            period_from: "",
            period_to: "",
            units_earned: "",
            year_graduated: "",
            academic_honors_received: "",
          })
        }
        appearance={"primary"}
      >
        Add Educational Backgrounds
      </Button>
    </div>
  );
}

export default EducationForm;
