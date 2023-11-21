import React, { useEffect, useState } from "react";
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
    const SelectedPage = Number(page);
    setTablePage(SelectedPage);
  };

  const getPreviousAndNextNumbers = (number: number) => {
    const result = [];

    for (let i = number - 3; i <= number + 3; i++) {
      if (i >= 1 && i <= totalPage) {
        result.push(i);
      }
    }
    return result;
  };

  const [currentPages, setCurrentPages] = useState([1]);

  useEffect(() => {
    const activePage = getPreviousAndNextNumbers(tablePage);
    setCurrentPages(activePage);
  }, [tablePage, totalPage]);

  return (
    <div className=" w-full flex justify-end">
      <ul className=" flex items-center gap-3">
        <li>
          <button
            className="flex items-center"
            disabled={1 === tablePage && true}
            onClick={() => setTablePage((page: number) => page - 1)}
          >
            <RiArrowLeftSLine className="text-[24px] text-black cursor-pointer" />
          </button>
        </li>

        <li className=" border-2 border-white flex items-center text-gray-400 ">
          {currentPages.map((item) => (
            <div
              onClick={() => SelectPage(item)}
              key={item}
              className={`${
                tablePage === item ? " text-black" : ""
              } font-bold h-8 aspect-square 1550px:h-5 480px:h-6 text-[15px] flex justify-center items-center border-r border-white cursor-pointer`}
            >
              {item}
            </div>
          ))}
        </li>

        <li>
          <button
            className="flex items-center"
            onClick={() => setTablePage((page: number) => page)}
            disabled={tablePage === totalPage}
          >
            <RiArrowRightSLine className=" text-[24px] text-black cursor-pointer" />
          </button>
        </li>
      </ul>
    </div>
  );
}
