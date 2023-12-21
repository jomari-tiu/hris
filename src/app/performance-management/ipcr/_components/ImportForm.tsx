import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { LuImport } from "react-icons/lu";

import { RotateLoader } from "react-spinners";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import Dropdown from "@/components/Dropdown";
import { usePost, useRemove } from "@/util/api";

type user = {
  name: string;
  email: string;
  id?: string;
};

type Props = {
  setModal: Function;
};

function ImportIPCRForm({ setModal }: Props) {
  const [period, setPeriod] = useState({
    value: "",
    id: "",
  });

  const { setNotification } = useGlobalState();

  const success = () => {
    setModal(false);
    setNotification(true, "success", `Successfully Imported!`);
  };

  const error = (error: any) => {
    setNotification(true, "error", error);
  };

  const { isLoading: xlsxLoading, mutate: xlsxMutate } = usePost(
    success,
    error,
    "/api/ipcr/import-xlsx",
    false,
    "ipcr"
  );

  const { isLoading: datLoading, mutate: datMutate } = usePost(
    success,
    error,
    "/api/ipcr/import-dat",
    false,
    "ipcr-list"
  );

  const dragOverHandler = (event: any) => {
    event.preventDefault();
  };

  const dropHandler = (event: any, typeEvent: string) => {
    if (!period.id) {
      setNotification(true, "warning", `Please select period first!`);
      return;
    }
    event.preventDefault();
    const file =
      typeEvent === "drop"
        ? event.dataTransfer.files[0]
        : event.target.files[0];

    if (!file) {
      return;
    }

    if (file.length > 1) {
      setNotification(true, "warning", `Can't import multiple file!`);
      return;
    }
    const filearray = file.name.split(".");
    const extension = filearray[filearray.length - 1];
    const payload: any = {
      file: file,
    };

    const formData: any = new FormData();
    const arrayData: any = [];
    const keys = Object.keys(payload);
    keys.forEach((key) => {
      arrayData.push({
        key: key,
        keyData: payload[key],
      });
    });
    arrayData.map(({ key, keyData }: any) => {
      formData.append(key, keyData);
    });
    if (extension === "xlsx") {
      xlsxMutate(formData);
    } else if (extension === "dat") {
      datMutate(formData);
    } else {
      setNotification(true, "warning", `Invalid File, Must be xlsx only!`);
      return;
    }
  };

  return (
    <div className=" space-y-5">
      <h3>Import IPCR</h3>
      <Dropdown
        value={period}
        setValue={setPeriod}
        endpoint={"/api/options/ipcr_periods"}
        label={"Select Period"}
        displayValueKey={"date_range"}
      />
      <div>
        <p className=" mb-1">Import Excel</p>
        <aside
          onDragOver={dragOverHandler}
          onDrop={(e) => dropHandler(e, "drop")}
          className=" bg-ccbgsecondary w-full space-y-3 aspect-[2/1] border-2 border-ccgreen border-dashed rounded-md flex flex-col items-center justify-center"
        >
          {xlsxLoading || datLoading ? (
            <RotateLoader color="#84bd38" className="mb-5" />
          ) : (
            <LuImport className=" text-[4rem] text-ccgreen" />
          )}

          <p>
            Drag and drop file or{" "}
            <label
              htmlFor="uploadFile"
              className="  text-red-1 underline cursor-pointer"
            >
              Browse
            </label>
            <input
              id="uploadFile"
              type="file"
              className=" absolute opacity-0 z-[-9999]"
              multiple={false}
              onChange={(e) => dropHandler(e, "onChange")}
            />
          </p>
        </aside>
      </div>
    </div>
  );
}

export default ImportIPCRForm;
