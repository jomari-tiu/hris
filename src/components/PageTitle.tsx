import React from "react";

type Props = {
  children: string;
};

function PageTitle({ children }: Props) {
  return <h2 className=" font-bold">{children}</h2>;
}

export default PageTitle;
