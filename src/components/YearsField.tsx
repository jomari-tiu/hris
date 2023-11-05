import React, { useEffect, useRef, useState } from "react";
import { eachYearOfInterval, format, parse, startOfDay } from "date-fns";

type props = {
  onChange: (value: number) => void;
};

function YearsField({ onChange }: props) {
  const date = new Date();
  let today = startOfDay(date);
  const [toggle, setToggle] = useState(false);
  const [currenYear, setCurrentYear] = useState(format(today, "yyyy"));

  let Years: any = eachYearOfInterval({
    start: new Date(1970, 6, 10),
    end: today,
  });
  const YearsSort = Years.map((year: Date) => format(year, "yyyy")).sort(
    (a: number, b: number) => b - a
  );

  const element = useRef<any>();
  useEffect(() => {
    const clickOutSide = (e: any) => {
      if (!element.current.contains(e.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  return (
    <>
      <div ref={element} className=" relative inline-block z-10">
        <input
          type="text"
          value={currenYear}
          onClick={() => setToggle(true)}
          onChange={() => {}}
        />
        {toggle && (
          <ul className="absolute top-full left-0 w-full bg-white shadow-md max-h-[200px] overflow-auto">
            {YearsSort.map((year: string, index: any) => (
              <li
                key={index}
                style={{
                  width: "100%",
                  marginBottom: "0",
                }}
                className={`py-1 px-2 text-[12px] cursor-pointer hover:bg-red-2 hover:text-white ${
                  currenYear === year
                    ? " bg-red-2 text-white"
                    : "text-[#757575]"
                }`}
                onClick={() => {
                  setCurrentYear(year);
                  onChange(Number(year));
                  setToggle(false);
                }}
              >
                {year}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default YearsField;
