import React from "react";

type Props = {
  appearance: "primary" | "danger" | "default";
  className?: string;
  children: string | React.ReactNode;
  type?: "submit";
  onClick?: () => void;
};
function Button({ appearance, className, children, type, onClick }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        appearance === "primary" && " bg-red-2 hover:bg-red-1 text-white"
      } ${
        appearance === "default" && " bg-gray-100 hover:bg-gray-200"
      } duration-200 font-medium tracking-wider px-8 py-2 text-[.8rem] ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
