import React from "react";
import { HashLoader, MoonLoader, PuffLoader } from "react-spinners";

type Props = {
  appearance: "primary" | "danger" | "default";
  className?: string;
  children: string | React.ReactNode;
  type?: "submit";
  onClick?: () => void;
  loading?: boolean;
};
function Button({
  appearance,
  className,
  children,
  type,
  onClick,
  loading,
}: Props) {
  return (
    <>
      {type === "submit" ? (
        <button
          type={type}
          onClick={onClick}
          className={`${
            appearance === "primary" && " bg-ccgreen hover:bg-ccgreen5 text-white"
          }
      ${
        appearance === "default" && " bg-gray-100 hover:bg-gray-200"
      } duration-200 font-medium tracking-wider px-8 py-2 text-[.8rem] ${className}`}
        >
          {loading ? (
            <PuffLoader
              size={20}
              color={appearance === "primary" ? "white" : ""}
            />
          ) : (
            children
          )}
        </button>
      ) : (
        <div
          onClick={onClick}
          className={`${
            appearance === "primary" &&
            " bg-ccgreen hover:bg-ccgreen5 text-white inline-block"
          } ${
            appearance === "default" && " bg-gray-100 hover:bg-gray-200"
          } duration-200 cursor-pointer rounded-md font-medium tracking-wider px-8 py-2 text-[.8rem] ${className}`}
        >
          {loading ? (
            <PuffLoader
              size={20}
              color={appearance === "primary" ? "white" : ""}
            />
          ) : (
            children
          )}
        </div>
      )}
    </>
  );
}

export default Button;
