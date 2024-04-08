import React from "react";

type Props = {
  dates: {
    startDate: string;
    endDate: string;
  };
  setDate: Function;
};

const DateRangePicker = ({ dates, setDate }: Props) => {
  return (
    <ul className=" flex gap-2">
      <li>
        <p className=" text-sm">From</p>
        <input
          type="date"
          value={dates.startDate}
          onChange={(e) => {
            setDate({
              ...dates,
              startDate: e.target.value,
            });
          }}
        />
      </li>
      <li>
        <p className=" text-sm">To</p>
        <input
          type="date"
          value={dates.endDate}
          onChange={(e) => {
            setDate({
              ...dates,
              endDate: e.target.value,
            });
          }}
        />
      </li>
    </ul>
  );
};

export default DateRangePicker;
