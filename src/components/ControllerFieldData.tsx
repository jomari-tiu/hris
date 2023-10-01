"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Controller } from "react-hook-form";

import { useFetch } from "@/util/api";

type Props = {
  control: any;
  errors: any;
  name: string;
  rules?: any;
  placeholder: string;
  endpoint: string;
  parentID?: string | number;
};

function ControllerFieldData({
  control,
  errors,
  name,
  rules,
  placeholder,
  endpoint,
  parentID,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Field
          field={field}
          name={name}
          endpoint={endpoint}
          placeholder={placeholder}
          errors={errors}
          parentID={parentID}
        />
      )}
    />
  );
}

export default ControllerFieldData;

const Field = ({
  field,
  name,
  endpoint,
  placeholder,
  errors,
  parentID,
}: any) => {
  const [open, setOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const { isLoading, isError, data } = useFetch(
    name,
    [name, field.value, parentID],
    `${endpoint}${parentID ? `?department_id=${parentID}` : ""}`
  );
  return (
    <aside>
      <label htmlFor={name} className=" text-[.9rem] text-red-2">
        {placeholder}
      </label>

      <div className=" relative">
        <input
          id={name}
          placeholder={isLoading ? "Loading..." : ""}
          type="text"
          autoComplete="off"
          onFocus={() => setOpen(true)}
          {...field}
          value={displayValue}
          disabled={isLoading || parentID === "" || parentID === null}
          className=" w-full"
        />
        {open && (
          <ul className=" absolute top-[110%] left-0 bg-white w-full shadow-md max-h-[10rem] overflow-auto">
            {data?.data?.data.map((item: any, indx: number) => (
              <li
                key={indx}
                className=" px-2 py-1 hover:bg-red-2 hover:text-white duration-150 cursor-pointer"
                onClick={() => {
                  field.onChange(item.id);
                  setDisplayValue(item.name);
                  setOpen(false);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {errors[name]?.message && (
        <span className=" text-[.9rem] text-red-2">
          {errors[name]?.message}
        </span>
      )}
    </aside>
  );
};
