import React from "react";

function SectionLabel({ children }: { children: string }) {
  return (
    <h4 className=" text-black w-full flex items-center font-medium gap-4 mb-2">
      {children}
      <div className=" flex-1 border border-ccgreen3"></div>
    </h4>
  );
}

export default SectionLabel;
