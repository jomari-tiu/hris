import React from "react";

type Props = {
  progressList: ProgressType;
  progressActive: number;
};

export type ProgressType = {
  title: string;
  tabNumber: number;
}[];

function Progress({ progressList, progressActive }: Props) {
  return (
    <ul className=" flex items-start gap-3 w-full border-b pb-5">
      {progressList
        .sort((a, b) => a.tabNumber - b.tabNumber)
        .map((item, index) => (
          <li key={index} style={{ width: 100 / progressList.length + "%" }}>
            <aside className=" flex items-center gap-3">
              <p
                className={` font-bold ${
                  index <= progressActive && "text-black"
                }`}
              >
                Step {index + 1}
              </p>
              {progressList.length !== index + 1 && (
                <div
                  className={` border  flex-1 ${
                    index < progressActive && "border-ccgreen3"
                  }`}
                ></div>
              )}
            </aside>
            {item.title}
          </li>
        ))}
      <li></li>
    </ul>
  );
}

export default Progress;
