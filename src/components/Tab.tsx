import React from "react";

type Props = {
  tab: string;
  setTab: Function;
  tabMenu: string[];
};

function Tab({ tab, setTab, tabMenu }: Props) {
  return (
    <div className=" w-full h-auto">
      <ul className="flex px-5 gap-5 border-b">
        {tabMenu.map((item, index) => (
          <li
            onClick={() => setTab(item)}
            key={index}
            className={` ${
              tab === item && "border-b-4 border-ccgreen2"
            } px-5 cursor-pointer py-2 -mb-[2.5px] text-black capitalize font-medium`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tab;
