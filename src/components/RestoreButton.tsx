import React from "react";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { PuffLoader } from "react-spinners";

type Props = {
  onClick: () => void;
  loading?: boolean;
};

function RestoreButton({ onClick, loading }: Props) {
  return (
    <div
      onClick={onClick}
      className=" bg-blue hover:bg-blue-2 duration-150 h-7 cursor-pointer w-7 flex justify-center items-center rounded-full"
    >
      {loading ? (
        <PuffLoader size={20} color={"white"} />
      ) : (
        <FaTrashRestoreAlt className=" text-white" />
      )}
    </div>
  );
}

export default RestoreButton;
