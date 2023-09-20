import React from "react";

type Props = {
  appearance: "primary" | "danger" | "default";
  className?: string;
  children: string;
  type?: "submit";
};
function Button({ appearance, className, children, type }: Props) {
  return (
    <button
      type={type}
      className={`${
        appearance === "primary" &&
        " bg-blue-2 hover:bg-blue duration-200 text-white"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
