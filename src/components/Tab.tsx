import React from "react";

type Props = {
  tab: string;
  setTab: Function;
  tabMenu: string[];
};

function Tab({ tab, setTab, tabMenu }: Props) {
  return (
    <ul className="flex px-5 gap-5 border-b">
      {tabMenu.map((item, index) => (
        <li
          onClick={() => setTab(item)}
          key={index}
          className={` ${
            tab === item && "border-b-4 border-gold"
          } px-5 cursor-pointer py-2 -mb-[2.5px] text-red-2 capitalize font-medium`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default Tab;
