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
    <table
      className={`${className} w-full bg-white-0 rounded-md overflow-hidden shadow-md`}
    >
      <thead className=" bg-red-2 text-red">
        <tr>
          {columns.map((item, index) => (
            <th key={index} className=" p-4 text-center uppercase">
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
              onClickRow && " cursor-pointer hover:bg-red"
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
  );
}

export default Table;
