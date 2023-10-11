"use client";

import React, { useState } from "react";
import { useQueryClient } from "react-query";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import LeaveTypeForm from "@/components/page-components/SystemSettings/LeaveTypes/LeaveTypeForm";
import PageTitle from "@/components/PageTitle";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch, restore } from "@/util/api";

function LeaveTypePage() {
  const { setNotification } = useGlobalState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("leave types");
  const [modal, setModal] = useState(false);

  const emptyVal = {};

  const [defaultValue, setDefaultValue] = useState(emptyVal);

  const columns: TableColumnsType[] = [
    {
      title: "Name",
      cellKey: "name",
      textAlign: "left",
    },
    {
      title: "Description",
      cellKey: "description",
      textAlign: "left",
    },
    {
      title: "Date Period",
      cellKey: "date_period",
      textAlign: "left",
    },
  ];

  const { data, isLoading } = useFetch(
    "leave_types-list",
    ["leave_types-list", search, page],
    `/api/leave_types?search=${search}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "leave_types-list-archive",
    ["leave_types-list-archive", search, page],
    `/api/leave_types/archive?search=${search}&page=${page}`
  );

  const queryClient = useQueryClient();
  const successRestore = () => {
    queryClient.invalidateQueries("leave_types-list");
    queryClient.invalidateQueries("leave_types-list-archive");
    setModal(false);
    setNotification(true, "success", `Leave type successfully restored!`);
  };
  const errorRestore = (error: any) => {
    setNotification(true, "error", "Something went wrong");
  };
  const restoreHandler = (id: any) => {
    restore(successRestore, errorRestore, `/api/leave_types/restore/${id}`);
  };
  return (
    <>
      <PageTitle title={["System Settings", "Leave Types"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["leave types", "archive"]} />
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
        isLoading={isTab === "leave types" ? isLoading : archiveLoading}
        columns={
          isTab === "archive"
            ? [
                ...columns,
                {
                  title: "Action",
                  cellKey: "date_period",
                  textAlign: "left",
                  render: (_, data) => (
                    <div className=" flex ">
                      <Button
                        appearance={"primary"}
                        onClick={() => restoreHandler(data?.id)}
                      >
                        Restore
                      </Button>
                    </div>
                  ),
                },
              ]
            : columns
        }
        data={
          isTab === "leave types"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        onClickRow={(data) => {
          if (isTab === "leave types") {
            setDefaultValue(data);
            setModal(true);
          }
        }}
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "leave types"
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
        <LeaveTypeForm setModal={setModal} defaultValues={defaultValue} />
      </Modal>
    </>
  );
}

export default LeaveTypePage;
