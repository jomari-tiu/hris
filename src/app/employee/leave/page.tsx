"use client";

import React, { useState } from "react";

import { textDateFormat } from "@/components/helper";
import PageTitle from "@/components/PageTitle";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch } from "@/util/api";
import { useDebounce } from "@/util/helpers";

function LeaveEmloyeePage() {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("leaves");

  const columns: TableColumnsType[] = [
    {
      title: "Type",
      cellKey: "type",
      textAlign: "left",
    },
    {
      title: "Date Start",
      cellKey: "date_start",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
    {
      title: "Date End",
      cellKey: "date_end",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
    {
      title: "Credit",
      cellKey: "credit",
      textAlign: "left",
    },
    {
      title: "States",
      cellKey: "status",
      textAlign: "left",
    },
    {
      title: "Remarks",
      cellKey: "status",
      textAlign: "left",
    },
  ];

  const { data, isLoading } = useFetch(
    "leaves-list",
    ["leaves-list", debounceSearch, page, status],
    `/api/leaves?search=${debounceSearch}&status=${status}&page=${page}`
  );
  const { data: remainingVLSL } = useFetch(
    "remaining-vl-sl",
    ["remaining-vl-sl", debounceSearch, page, status],
    `/api/leave_balances/employee`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "leaves-list-archive",
    ["leaves-list-archive", debounceSearch, page, status],
    `/api/leaves/archive?search=${debounceSearch}&status=${status}&page=${page}`
  );

  return (
    <>
      <PageTitle title={["Leave Management", "Leaves"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["leaves", "archive"]} />
      <div className=" flex items-center flex-wrap gap-3 justify-between">
        <div className=" flex items-center gap-2">
          <Search search={search} setSearch={setSearch} />
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="disapproved">Disapproved</option>
          </select>
        </div>
        <ul className=" flex items-center flex-wrap gap-5">
          <li>
            <p>
              Remaining VL:{" "}
              <span>{remainingVLSL?.data?.data?.remaining_vl || 0}</span>
            </p>
          </li>
          <li>
            <p>
              Remaining SL:{" "}
              <span>{remainingVLSL?.data?.data?.remaining_sl || 0}</span>
            </p>
          </li>
        </ul>
      </div>
      <Table
        isLoading={isTab === "leaves" ? isLoading : archiveLoading}
        columns={columns}
        data={
          isTab === "leaves"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "leaves"
            ? data?.data?.data?.last_page
            : archive?.data?.data?.last_page
        }
      />
    </>
  );
}

export default LeaveEmloyeePage;
