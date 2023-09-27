import React from "react";

type Props = {
  columns: TableColumnsType[];
  data: any[];
  onClickRow?: (selectedItem: any, data?: any) => void;
  className?: string;
};

export type TableColumnsType = {
  title: string;
  cellKey: string;
  textAlign?: "right" | "left" | "center";
  render?: (value: any, data?: any) => React.ReactNode;
};

function Table({ columns, data, className, onClickRow }: Props) {
  return (
    <div className=" w-full overflow-auto">
      <table
        className={`${className} w-full min-w-[800px] bg-white-0 border border-gray-200`}
      >
        <thead className=" bg-gray-100 text-gray-400">
          <tr>
            {columns.map((item, index) => (
              <th key={index} className=" p-4 text-start uppercase">
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              onClick={() => {
                onClickRow && onClickRow(item, data);
              }}
              className={`${
                onClickRow && " cursor-pointer hover:bg-gray-100"
              } duration-200 `}
            >
              {columns.map((col, indexCol) => (
                <td
                  key={indexCol}
                  className={`border-t p-4`}
                  style={{
                    textAlign: col.textAlign,
                  }}
                >
                  {col.render
                    ? col.render(item[col.cellKey], data)
                    : item[col.cellKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
