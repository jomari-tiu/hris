import React from "react";

type Props = {
  children: any;
};

function PageTitle({ children }: Props) {
  return <p className=" text-red-2 font-bold">{children}</p>;
}

export default PageTitle;
