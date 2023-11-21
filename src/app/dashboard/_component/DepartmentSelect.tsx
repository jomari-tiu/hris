import React, { useEffect, useRef, useState } from "react";

import {
  ClockLoader,
  DotLoader,
  PulseLoader,
  ScaleLoader,
} from "react-spinners";

import { useFetch } from "@/util/api";

type Props = {
  selectedIDs: {
    name: string;
    id: string;
  }[];
  setSelected: Function;
};

function DepartmentSelect({ selectedIDs, setSelected }: Props) {
  const [show, setShow] = useState(false);
  const { isLoading, data } = useFetch(
    "select-department",
    ["select-department"],
    "/api/options/departments"
  );

  const onChangeHandler = (id: string, name: string) => {
    if (selectedIDs.some((someItem) => someItem.id === id)) {
      const clone = selectedIDs.filter((filItem) => filItem.id !== id);
      setSelected(clone);
    } else {
      setSelected([
        ...selectedIDs,
        {
          id: id,
          name: name,
        },
      ]);
    }
  };
  const element = useRef<any>();
  useEffect(() => {
    const clickOutSide = (e: any) => {
      if (!element.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });
  return (
    <div className=" relative" ref={element}>
      <input
        type="text"
        onClick={() => setShow(true)}
        value={"Select Departments"}
        readOnly
        placeholder="Select Departments"
      />
      {show && (
        <ul className=" absolute top-[110%] left-0 border shadow-md rounded-md bg-ccbgsecondary w-full overflow-auto max-h-[20rem] z-10">
          {isLoading && (
            <li className=" py-2 flex justify-center">
              <PulseLoader color="#9ACC2F" size={10} />
            </li>
          )}
          <li className=" px-2 py-1 border-b flex items-start cursor-pointer hover:bg-cchovergray ">
            <input
              type="checkbox"
              id={`department-all`}
              checked={selectedIDs.length <= 0}
              onChange={() => setSelected([])}
              className=" mt-1"
            />
            <label
              className=" ml-2 text-sm cursor-pointer"
              htmlFor={`department-all`}
            >
              All Department
            </label>
          </li>
          {data?.data?.data.map(
            (item: { name: string; id: string }, indx: number) => (
              <li
                key={indx}
                className=" px-2 py-1 border-b flex items-start cursor-pointer hover:bg-cchovergray "
              >
                <input
                  type="checkbox"
                  id={`department-${indx}`}
                  checked={selectedIDs.some(
                    (someItem) => someItem.id === item.id
                  )}
                  onChange={() => onChangeHandler(item.id, item.name)}
                  className=" mt-1"
                />
                <label
                  className=" ml-2 text-sm cursor-pointer"
                  htmlFor={`department-${indx}`}
                >
                  {item.name}
                </label>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default DepartmentSelect;
