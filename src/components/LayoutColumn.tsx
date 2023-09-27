import React from "react";

function LayoutColumn({
  children,
  colNumber,
}: {
  children: React.ReactNode;
  colNumber: 2 | 3 | 4;
}) {
  let column = "grid-cols-2  640px:grid-cols-1";
  if (colNumber === 3) {
    column =
      "grid-cols-3  820px:grid-cols-2 640px:grid-cols-1  480px:grid-cols-1";
  }
  if (colNumber === 4) {
    column =
      "grid-cols-4  820px:grid-cols-3 1024px:grid-cols-3 640px:grid-cols-2 480px:grid-cols-1";
  }
  return <div className={` grid ${column} gap-x-3 gap-y-5`}>{children}</div>;
}

export default LayoutColumn;
