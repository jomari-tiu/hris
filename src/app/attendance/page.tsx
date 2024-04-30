"use client";

import React, { useState } from "react";

import { LuImport } from "react-icons/lu";

import { useQueryClient } from "react-query";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import DeleteButton from "@/components/DeleteButton";
import { textDateFormat, timeTwelveFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import AttendanceForm from "@/components/page-components/Attendance/AttendanceForm";
import PageTitle from "@/components/PageTitle";
import RestoreButton from "@/components/RestoreButton";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import ViewButton from "@/components/ViewButton";
import { useFetch, restore, useRemove } from "@/util/api";
import { useDebounce } from "@/util/helpers";

function AttendancesPage() {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("attendances");
  const [modal, setModal] = useState(false);

  const emptyVal = {
    name: "",
    email: "",
  };

  const [defaultValue, setDefaultValue] = useState(emptyVal);

  const columns: TableColumnsType[] = [
    {
      title: "Name",
      cellKey: "",
      textAlign: "left",
      render: (_, data) => (
        <div>
          {data?.employee?.first_name} {data?.employee?.last_name}
        </div>
      ),
    },
    {
      title: "Email",
      cellKey: "",
      textAlign: "left",
      render: (_, data) => <div>{data?.employee?.email}</div>,
    },
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

  const { setNotification } = useGlobalState();
  const queryClient = useQueryClient();
  const successRestore = () => {
    queryClient.invalidateQueries("attendances-list");
    queryClient.invalidateQueries("attendances-list-archive");
    setModal(false);
    setNotification(true, "success", `User successfully restored!`);
  };
  const errorRestore = (error: any) => {
    setNotification(true, "error", "Something went wrong");
  };
  const restoreHandler = (id: any) => {
    restore(successRestore, errorRestore, `/api/attendances/restore/${id}`);
  };

  const [deleteID, setDeleteID] = useState("");
  const { mutate: Delete, isLoading: deleteLoading } = useRemove(
    () => {
      queryClient.invalidateQueries("attendances-list");
      setNotification(true, "success", `Attendace successfully deleted!`);
    },
    (error: any) => {
      setNotification(true, "error", error);
    },
    "/api/attendances",
    "attendances-list"
  );

  return (
    <>
      <PageTitle title={["Attendance"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["attendances", "archive"]} />
      <div className=" flex items-center flex-wrap gap-3 justify-between">
        <Search search={search} setSearch={setSearch} />
        <Button
          appearance={"primary"}
          className="flex items-center gap-2"
          onClick={() => {
            setDefaultValue(emptyVal);
            setModal(true);
          }}
        >
          <LuImport />
          Import
        </Button>
      </div>
      <Table
        isLoading={isTab === "attendances" ? isLoading : archiveLoading}
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
            : [
                ...columns,
                {
                  title: "Action",
                  cellKey: "",
                  textAlign: "left",
                  render: (_, data) => (
                    <div className=" flex ">
                      <DeleteButton
                        loading={deleteLoading && data?.id === deleteID}
                        onClick={() => {
                          setDeleteID(data?.id);
                          Delete(data?.id);
                        }}
                      />
                    </div>
                  ),
                },
              ]
        }
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
      <Modal
        show={modal}
        onClose={() => {
          setModal(false);
        }}
        width="narrow"
      >
        <AttendanceForm setModal={setModal} />
      </Modal>
    </>
  );
}

export default AttendancesPage;
