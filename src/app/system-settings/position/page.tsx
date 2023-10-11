"use client";

import React, { useState } from "react";

import { useQueryClient } from "react-query";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import DepartmentForm from "@/components/page-components/SystemSettings/Department/DepartmentForm";
import LeaveTypeForm from "@/components/page-components/SystemSettings/LeaveTypes/LeaveTypeForm";
import PositionForm from "@/components/page-components/SystemSettings/Position/PositionForm";
import PageTitle from "@/components/PageTitle";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch, restore } from "@/util/api";

function PositionPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("positions");
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
      title: "Department",
      cellKey: "description",
      textAlign: "left",
      render: (_, data) => <div>{data?.department?.name}</div>,
    },
  ];

  const { data, isLoading } = useFetch(
    "positions-list",
    ["positions-list", search, page],
    `/api/positions?search=${search}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "positions-list-archive",
    ["positions-list-archive", search, page],
    `/api/positions/archive?search=${search}&page=${page}`
  );

  const { setNotification } = useGlobalState();
  const queryClient = useQueryClient();
  const successRestore = () => {
    queryClient.invalidateQueries("positions-list");
    queryClient.invalidateQueries("positions-list-archive");
    setModal(false);
    setNotification(true, "success", `Position successfully restored!`);
  };
  const errorRestore = (error: any) => {
    setNotification(true, "error", "Something went wrong");
  };
  const restoreHandler = (id: any) => {
    restore(successRestore, errorRestore, `/api/positions/restore/${id}`);
  };
  return (
    <>
      <PageTitle title={["System Settings", "positions"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["positions", "archive"]} />
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
        isLoading={isTab === "positions" ? isLoading : archiveLoading}
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
          isTab === "positions"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        onClickRow={(data) => {
          if (isTab === "positions") {
            setDefaultValue(data);
            setModal(true);
          }
        }}
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "positions"
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
        <PositionForm setModal={setModal} defaultValues={defaultValue} />
      </Modal>
    </>
  );
}

export default PositionPage;
