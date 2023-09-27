import React from "react";

function SectionLabel({ children }: { children: string }) {
  return (
    <h4 className=" text-red-2 w-full flex items-center font-medium gap-4 mb-2">
      {children}
      <div className=" flex-1 border border-red-2"></div>
    </h4>
  );
}

export default SectionLabel;
