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
      className=" bg-ccgreen4 hover:bg-ccgreen2 duration-150 h-7 cursor-pointer w-7 flex justify-center items-center rounded-full"
    >
      <AiOutlineFolderView className=" text-gray-500" />
    </div>
  );
}

export default ViewButton;
