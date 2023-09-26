import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  control: any;
  errors: any;
  name: string;
  rules?: any;
  placeholder: string;
  type:
    | "select"
    | "text"
    | "file"
    | "checkbox"
    | "number"
    | "radio"
    | "password"
    | "email"
    | "date";
  selectOptions?: string[];
};

function ControllerField({
  control,
  errors,
  name,
  rules,
  placeholder,
  type,
  selectOptions,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <aside>
          <label htmlFor={name} className=" text-[.9rem] text-red-2">
            {placeholder}
          </label>
          {type !== "select" && (
            <input
              id={name}
              type={type}
              //   placeholder={placeholder}
              {...field}
              className=" w-full"
            />
          )}
          {type === "select" && (
            <select id={name} {...field} className=" w-full">
              {selectOptions?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          )}
          {errors[name]?.message && (
            <span className=" text-[.9rem] text-red-2">
              {errors[name]?.message}
            </span>
          )}
        </aside>
      )}
    />
  );
}

export default ControllerField;
