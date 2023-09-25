import React from "react";

type Props = {
  appearance: "primary" | "danger" | "default";
  className?: string;
  children: string | React.ReactNode;
  type?: "submit";
};
function Button({ appearance, className, children, type }: Props) {
  return (
    <button
      type={type}
      className={`${
        appearance === "primary" && " bg-red-2 hover:bg-red-1 text-white"
      } ${
        appearance === "default" && " bg-gray-100 hover:bg-gray-200"
      } duration-200 font-medium tracking-wider px-5 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
