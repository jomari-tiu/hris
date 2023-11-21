import React from "react";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
  title: string[];
};

function PageTitle({ title }: Props) {
  return (
    <div className=" flex items-center gap-2">
      {title.map((item, index) => (
        <span
          key={index}
          className="flex text-black items-center gap-2 font-bold"
        >
          {item} {title.length !== index + 1 && <IoIosArrowForward />}
        </span>
      ))}
    </div>
  );
}

export default PageTitle;
