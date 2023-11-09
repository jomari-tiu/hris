import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { useQueryClient } from "react-query";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerField from "@/components/ControllerField";
import { usePost } from "@/util/api";

type PropsType = {
  setModal: Function;
  parentSubCategoryId: string;
  queryNameToRefresh: string;
};

type formType = { parent_id: string; name: string; weight: number };

const SubCategoryForm = ({
  setModal,
  parentSubCategoryId,
  queryNameToRefresh,
}: PropsType) => {
  const { setNotification } = useGlobalState();
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [isError, setError] = useState(false);

  const success = () => {
    setError(false);
    setModal(false);
    setNotification(true, "success", "Sub-Category Successfully Registered!");
  };

  const error = (error: any) => {
    setNotification(true, "error", error);
  };
  const { isLoading, mutate } = usePost(
    success,
    error,
    "/api/ipcr_subcategories",
    false,
    queryNameToRefresh
  );

  console.log(parentSubCategoryId);

  const SubmitHandler = () => {
    if (!name || !weight) {
      setError(true);
      return;
    }
    const Payload = {
      parent_id: parentSubCategoryId,
      name: name,
      weight: weight,
    };
    mutate(Payload);
  };

  return (
    <form className=" space-y-5 flex flex-col items-end">
      <h3 className=" w-full">Add Sub-Category</h3>
      <aside className=" w-full">
        <input
          type="text"
          value={name}
          className=" w-full"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        {isError && !name && <p className=" text-[#dd0000]">required!</p>}
      </aside>
      <aside className=" w-full">
        <input
          type="number"
          className=" w-full"
          value={weight}
          placeholder="Weight"
          onChange={(e) => setWeight(e.target.value)}
        />
        {isError && !weight && <p className=" text-[#dd0000]">required!</p>}
      </aside>
      <Button
        appearance="primary"
        onClick={SubmitHandler}
        className=" text-center"
        loading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
};

export default SubCategoryForm;
