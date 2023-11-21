import React from "react";
import Link from "next/link";
import { AiOutlineRollback } from "react-icons/ai";

function BackButton({ url }: { url: string }) {
  return (
    <Link href={url}>
      <AiOutlineRollback className=" text-black hover:text-red duration-150 text-4xl" />
    </Link>
  );
}

export default BackButton;
