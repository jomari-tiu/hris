import React from "react";
import { AiFillDelete, AiOutlineFolderView } from "react-icons/ai";
import { PuffLoader } from "react-spinners";

type Props = {
  onClick: () => void;
};

function ViewButton({ onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className=" bg-green-400 hover:bg-green-500 duration-150 h-7 cursor-pointer w-7 flex justify-center items-center rounded-full"
    >
      <AiOutlineFolderView className=" text-white" />
    </div>
  );
}

export default ViewButton;
