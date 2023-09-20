import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  control: any;
  errors: any;
  errorKey: string;
};

function FieldController({ control, errorKey, errors }: Props) {
  return (
    <Controller
      name="username"
      control={control}
      rules={{
        required: "required",
      }}
      render={({ field }) => (
        <>
          <input
            type="text"
            placeholder="Username"
            {...field}
            className=" w-full"
          />
          <span>{errors[errorKey].message}</span>
        </>
      )}
    />
  );
}

export default FieldController;
