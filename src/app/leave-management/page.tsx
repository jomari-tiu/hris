"use client";

import React, { useState } from "react";

import Button from "@/components/Button";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import UserForm from "@/components/page-components/AdminSettings/Users/UserForm";
import TrainingForm from "@/components/page-components/Employee/TrainingRecord/TrainingForm";
import LeaveForm, {
  Leave,
} from "@/components/page-components/LeaveManagement/LeaveForm";
import PageTitle from "@/components/PageTitle";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch } from "@/util/api";

function LeaveMangement() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("leaves");
  const [modal, setModal] = useState(false);

  const emptyVal: Leave = {
    name: "",
    leave_type: "",
    status: "",
    date_filed: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    reason: "",
    id: undefined,
  };

  const [defaultValue, setDefaultValue] = useState(emptyVal);

  const columns: TableColumnsType[] = [
    {
      title: "Name",
      cellKey: "name",
      textAlign: "left",
    },
    {
      title: "Leave Type",
      cellKey: "leave_type",
      textAlign: "left",
    },
    {
      title: "Status",
      cellKey: "status",
      textAlign: "left",
    },
    {
      title: "Date Filed",
      cellKey: "date_field",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
    {
      title: "Start Date",
      cellKey: "start_date",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
    {
      title: "End Date",
      cellKey: "End_date",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
  ];
  const { data, isLoading } = useFetch(
    "leaves-list",
    ["leaves-list", search, page],
    `/api/leaves?search=${search}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "leaves-list-archive",
    ["leaves-list-archive", search, page],
    `/api/leaves/archive?search=${search}&page=${page}`
  );
  return (
    <>
      <PageTitle title={["Leave Management"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["leaves", "archive"]} />
      <div className=" flex items-center flex-wrap gap-3 justify-between">
        <Search search={search} setSearch={setSearch} />
        <Button
          appearance={"primary"}
          onClick={() => {
            setDefaultValue(emptyVal);
            setModal(true);
          }}
        >
          Add
        </Button>
      </div>
      <Table
        isLoading={isTab === "leaves" ? isLoading : archiveLoading}
        columns={columns}
        data={
          isTab === "leaves"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        onClickRow={(data) => {
          if (isTab === "leaves") {
            setDefaultValue(data);
            setModal(true);
          }
        }}
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "leaves"
            ? data?.data?.data?.last_page
            : archive?.data?.data?.last_page
        }
      />
      <Modal
        show={modal}
        onClose={() => {
          setModal(false);
        }}
        width="narrow"
      >
        <LeaveForm defaultValues={defaultValue} setModal={setModal} />
      </Modal>
    </>
  );
}

export default LeaveMangement;
