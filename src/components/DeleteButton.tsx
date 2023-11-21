import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { PuffLoader } from "react-spinners";

type Props = {
  onClick: () => void;
  loading?: boolean;
};

function DeleteButton({ onClick, loading }: Props) {
  return (
    <div
      onClick={onClick}
      className=" bg-ccred1 hover:bg-ccred2 duration-150 h-7 cursor-pointer w-7 flex justify-center items-center rounded-full"
    >
      {loading ? (
        <PuffLoader size={20} color={"white"} />
      ) : (
        <AiFillDelete className=" text-white" />
      )}
    </div>
  );
}

export default DeleteButton;
