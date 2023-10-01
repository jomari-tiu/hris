import React from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

type Pagination = {
  setTablePage: Function;
  tablePage: number;
  totalPage: number;
};

export default function Pagination({
  setTablePage,
  tablePage,
  totalPage,
}: Pagination) {
  const SelectPage = (page: number) => {
    const SelectedPage = Number(page) + 1;
    setTablePage(SelectedPage);
  };

  return (
    <div className=" w-full flex justify-end">
      <ul className=" flex items-center gap-3">
        <li>
          <button
            className="flex items-center"
            disabled={1 === tablePage && true}
            onClick={() => setTablePage((page: number) => page - 1)}
          >
            <RiArrowLeftSLine className="text-[24px] text-red-2 cursor-pointer" />
          </button>
        </li>

        <li className=" border-2 border-white flex items-center text-gray-400">
          {Array.from(Array(totalPage), (e, index) => {
            return (
              <div
                onClick={() => SelectPage(index)}
                key={index}
                className={`${
                  tablePage === index + 1 ? " text-red-2" : ""
                } font-bold h-8 w-8 1550px:w-5 1550px:h-5 480px:w-6 480px:h-6 text-[15px] flex justify-center items-center border-r border-white cursor-pointer`}
              >
                {index + 1}
              </div>
            );
          })}
        </li>

        <li>
          <button
            className="flex items-center"
            onClick={() => setTablePage((page: number) => page + 1)}
            disabled={tablePage === totalPage}
          >
            <RiArrowRightSLine className=" text-[24px] text-red-2 cursor-pointer" />
          </button>
        </li>
      </ul>
    </div>
  );
}
