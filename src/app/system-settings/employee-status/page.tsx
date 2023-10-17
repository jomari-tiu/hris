"use client";

import React, { useState } from "react";

import { useQueryClient } from "react-query";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import DepartmentForm from "@/components/page-components/SystemSettings/Department/DepartmentForm";
import EmployeeStatusForm from "@/components/page-components/SystemSettings/EmployeeStatus/EmployeeStatusForm";
import LeaveTypeForm from "@/components/page-components/SystemSettings/LeaveTypes/LeaveTypeForm";
import PositionForm from "@/components/page-components/SystemSettings/Position/PositionForm";
import PageTitle from "@/components/PageTitle";
import RestoreButton from "@/components/RestoreButton";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch, restore } from "@/util/api";

function EmployeeStatusPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("employee status");
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
  ];

  const { data, isLoading } = useFetch(
    "employment_statuses-list",
    ["employment_statuses-list", search, page],
    `/api/employment_statuses?search=${search}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "employment_statuses-list-archive",
    ["employment_statuses-list-archive", search, page],
    `/api/employment_statuses/archive?search=${search}&page=${page}`
  );

  const { setNotification } = useGlobalState();
  const queryClient = useQueryClient();
  const successRestore = () => {
    queryClient.invalidateQueries("employment_statuses-list");
    queryClient.invalidateQueries("employment_statuses-list-archive");
    setModal(false);
    setNotification(true, "success", `Employee Status successfully restored!`);
  };
  const errorRestore = (error: any) => {
    setNotification(true, "error", "Something went wrong");
  };
  const restoreHandler = (id: any) => {
    restore(
      successRestore,
      errorRestore,
      `/api/employment_statuses/restore/${id}`
    );
  };

  return (
    <>
      <PageTitle title={["System Settings", "Employee Status"]} />
      <Tab
        tab={isTab}
        setTab={setTab}
        tabMenu={["employee status", "archive"]}
      />
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
        isLoading={isTab === "employee status" ? isLoading : archiveLoading}
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
                      <RestoreButton onClick={() => restoreHandler(data?.id)} />
                    </div>
                  ),
                },
              ]
            : columns
        }
        data={
          isTab === "employee status"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        onClickRow={(data) => {
          if (isTab === "employee status") {
            setDefaultValue(data);
            setModal(true);
          }
        }}
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "employee status"
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
        <EmployeeStatusForm setModal={setModal} defaultValues={defaultValue} />
      </Modal>
    </>
  );
}

export default EmployeeStatusPage;
