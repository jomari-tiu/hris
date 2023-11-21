import React, { useEffect, useRef, useState } from "react";

import {
  ClockLoader,
  DotLoader,
  PulseLoader,
  ScaleLoader,
} from "react-spinners";

import { useFetch } from "@/util/api";

type Props = {
  value: {
    id: string;
    value: string;
  };
  setValue: Function;
  endpoint: string;
  label: string;
  displayValueKey: string;
};

function Dropdown({
  value,
  setValue,
  endpoint,
  label,
  displayValueKey,
}: Props) {
  const [show, setShow] = useState(false);
  const { isLoading, data } = useFetch(endpoint, [endpoint], endpoint);

  const onChangeHandler = (id: string, name: string) => {
    setShow(false);
    setValue({
      id: id,
      value: name,
    });
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
        onChange={() => {}}
        value={value.value}
        readOnly
        placeholder={label}
      />
      {show && (
        <ul className=" absolute top-[110%] left-0 border shadow-md rounded-md bg-ccbgsecondary w-full overflow-auto max-h-[20rem] z-10">
          {isLoading && (
            <li className=" py-2 flex justify-center">
              <PulseLoader color="#9ACC2F" size={10} />
            </li>
          )}
          {data?.data?.data.map((item: any, indx: number) => (
            <li
              key={indx}
              className=" px-2 py-1 border-b flex items-start cursor-pointer hover:bg-cchovergray "
              onClick={() => {
                onChangeHandler(item.id, item[displayValueKey]);
              }}
            >
              <label
                className=" ml-2 text-sm cursor-pointer"
                htmlFor={`department-${indx}`}
              >
                {item[displayValueKey]}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
