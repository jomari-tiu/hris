"use client";

import React, { useEffect, useMemo, useState } from "react";

import { useFieldArray } from "react-hook-form";

import { IoIosRemoveCircle } from "react-icons/io";

import Button from "@/components/Button";
import ControllerField from "@/components/ControllerField";
import Layout from "@/components/Layout";

import LayoutColumn from "@/components/LayoutColumn";

import Modal from "@/components/Modal";

import SubCategoryForm from "./SubCategoryForm";

type props = {
  control: any;
  errors: any;
  watch: any;
  category_id: string;
  category_name: string;
};

const SubCategory = ({ control, errors, watch, category_name }: props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    rules: {
      required: "Required!",
    },
    name: `${category_name}_evaluations`, // This should match the name of your field in the form data
  });

  return (
    <>
      {fields.map((field, indx) => (
        <SubCategoryItem
          field={field}
          fields={fields}
          indx={indx}
          remove={remove}
          control={control}
          errors={errors}
          category_name={category_name}
          watch={watch}
          append={append}
          key={indx}
        />
      ))}
    </>
  );
};

export default SubCategory;

type SubCategoryItemType = {
  field: any;
  fields: any;
  indx: any;
  remove: any;
  control: any;
  errors: any;
  category_name: any;
  watch: any;
  append: any;
};

const SubCategoryItem = ({
  field,
  fields,
  indx,
  remove,
  control,
  errors,
  category_name,
  watch,
  append,
}: SubCategoryItemType) => {
  const [isModalSubCategoryForm, setModalSubCategoryForm] = useState(false);
  const q = watch(`${category_name}_evaluations[${indx}].rating_q`);
  const e = watch(`${category_name}_evaluations[${indx}].rating_e`);
  const t = watch(`${category_name}_evaluations[${indx}].rating_t`);
  const getAverage = useMemo(() => {
    const average = Number(q) + Number(e) + Number(t);
    return average / 3;
  }, [q, e, t]);

  return (
    <div className="p-5 border-2 border-dashed rounded-md space-y-5">
      {fields.length > 1 && (
        <div className=" w-full flex justify-end">
          <IoIosRemoveCircle
            className=" cursor-pointer hover:text-red-1 text-2xl text-red-2 text-end"
            onClick={() => remove(indx)}
          />
        </div>
      )}
      <ul className=" flex justify-between gap-5">
        <li className=" w-9/12">
          <LayoutColumn colNumber={3}>
            <ControllerField
              control={control}
              errors={errors}
              name={`${category_name}_evaluations[${indx}].name`}
              rules={{ required: "required" }}
              placeholder={"Sector Goals"}
              type={"text"}
            />
            <ControllerField
              control={control}
              errors={errors}
              name={`${category_name}_evaluations[${indx}].major_final_output`}
              rules={{ required: "required" }}
              placeholder={"Major Final Output"}
              type={"text"}
            />
            <ControllerField
              control={control}
              errors={errors}
              name={`${category_name}_evaluations[${indx}].performance_indicators`}
              rules={{ required: "required" }}
              placeholder={"Performance Indicators"}
              type={"text"}
            />
            <ControllerField
              control={control}
              errors={errors}
              name={`${category_name}_evaluations[${indx}].target_of_accomplishment`}
              rules={{ required: "required" }}
              placeholder={"Target Of Accomplishment"}
              type={"text"}
            />
            <ControllerField
              control={control}
              errors={errors}
              name={`${category_name}_valuations[${indx}].actual_accomplishments`}
              rules={{ required: "required" }}
              placeholder={"Actual Accomplishments"}
              type={"text"}
            />
            <ControllerField
              control={control}
              errors={errors}
              name={`${category_name}_evaluations[${indx}].remarks`}
              rules={{ required: "required" }}
              placeholder={"Remarks"}
              type={"text"}
            />
          </LayoutColumn>
        </li>
        <li className=" w-3/12 space-y-5">
          <ControllerField
            control={control}
            errors={errors}
            name={`${category_name}_evaluations[${indx}].rating_q`}
            rules={{ required: "required" }}
            placeholder={"Rating Q"}
            type={"select"}
            selectOptions={[0, 1, 2, 3, 4, 5]}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={`${category_name}_evaluations[${indx}].rating_e`}
            rules={{ required: "required" }}
            placeholder={"Rating E"}
            type={"select"}
            selectOptions={[0, 1, 2, 3, 4, 5]}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={`${category_name}_evaluations[${indx}].rating_t`}
            rules={{ required: "required" }}
            placeholder={"Rating T"}
            type={"select"}
            selectOptions={[0, 1, 2, 3, 4, 5]}
          />
          <aside>
            Average Rating: {isNaN(getAverage) ? 0 : getAverage?.toFixed(2)}
          </aside>
        </li>
      </ul>
      <aside className=" w-full flex justify-end gap-3">
        <Button
          appearance="primary"
          onClick={() => setModalSubCategoryForm(true)}
        >
          Add Sub-Category
        </Button>
        <Button
          appearance="primary"
          onClick={() => {
            append({
              name: "",
              order: "",
              degree: "",
              major_final_output: "",
              performance_indicators: "",
              target_of_accomplishment: "",
              actual_accomplishments: "",
              rating_q: "",
              rating_e: "",
              rating_t: "",
              remarks: "",
              evaluations: [],
            });
          }}
        >
          Add Item
        </Button>
      </aside>
      <Modal
        show={isModalSubCategoryForm}
        onClose={() => {
          setModalSubCategoryForm(false);
        }}
        width="narrow"
      >
        <SubCategoryForm setModal={setModalSubCategoryForm} />
      </Modal>
    </div>
  );
};
