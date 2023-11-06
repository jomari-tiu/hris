import React, { useState } from "react";

import Button from "@/components/Button";

type PropsType = {
  setModal: Function;
};

const SubCategoryForm = ({ setModal }: PropsType) => {
  const [option, setOption] = useState("Select Sub-Category");
  return (
    <div className=" flex flex-col gap-5">
      <h3>Add SubCategory</h3>
      <select
        name=""
        id=""
        defaultValue={option}
        onChange={(e) => setOption(e.target.value)}
      >
        <option value="Select Sub-Category">Select Sub-Category</option>
        <option value="Create Sub-Category">Create Sub-Category</option>
      </select>
      {option === "Select Sub-Category" && (
        <select name="" id="">
          <option>Instruction</option>
          <option>Research, Extensions, Production</option>
          <option>Administrative Function</option>
        </select>
      )}
      {option === "Create Sub-Category" && (
        <>
          <input type="text" placeholder="Name" />
          <input type="number" placeholder="Weight" />
        </>
      )}
      <Button appearance="primary" className=" text-center">
        Submit
      </Button>
    </div>
  );
};

export default SubCategoryForm;
