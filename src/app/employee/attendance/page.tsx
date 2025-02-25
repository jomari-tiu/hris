"use client";

import React, { useState } from "react";

import { textDateFormat, timeTwelveFormat } from "@/components/helper";
import PageTitle from "@/components/PageTitle";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch } from "@/util/api";
import { useDebounce } from "@/util/helpers";

function AttendancesEmployeePage() {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("attendances");

  const columns: TableColumnsType[] = [
    {
      title: "Time In",
      cellKey: "time_in",
      textAlign: "left",
      render: (timeIn) => {
        const date = textDateFormat(timeIn.split(" ")[0]);
        const time = timeTwelveFormat(timeIn.split(" ")[1]);
        return (
          <div>
            {date} {time}
          </div>
        );
      },
    },
    {
      title: "Time Out",
      cellKey: "time_out",
      textAlign: "left",
      render: (timeOut) => {
        const date = textDateFormat(timeOut.split(" ")[0]);
        const time = timeTwelveFormat(timeOut.split(" ")[1]);
        return (
          <div>
            {date} {time}
          </div>
        );
      },
    },
  ];
  const { data, isLoading } = useFetch(
    "attendances-list",
    ["attendances-list", debounceSearch, page],
    `/api/attendances?search=${debounceSearch}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "attendances-list-archive",
    ["attendances-list-archive", debounceSearch, page],
    `/api/attendances/archive?search=${debounceSearch}&page=${page}`
  );

  return (
    <>
      <PageTitle title={["Attendance"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["attendances", "archive"]} />
      <div className=" flex items-center flex-wrap gap-3 justify-between">
        <Search search={search} setSearch={setSearch} />
      </div>
      <Table
        isLoading={isTab === "attendances" ? isLoading : archiveLoading}
        columns={columns}
        data={
          isTab === "attendances"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "attendances"
            ? data?.data?.data?.last_page
            : archive?.data?.data?.last_page
        }
      />
    </>
  );
}

export default AttendancesEmployeePage;
