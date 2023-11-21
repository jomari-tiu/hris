import React from "react";
import { CiSearch } from "react-icons/ci";

type Props = {
  search: string;
  setSearch: Function;
};

function Search({ search, setSearch }: Props) {
  return (
    <div className=" flex items-center gap-1 border border-gray-200 px-2 py-1 rounded-md bg-white-0 ">
      <CiSearch />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=" outline-none border-none"
        style={{ outlineColor: "transparent" }}
        placeholder="Search..."
      />
    </div>
  );
}

export default Search;
