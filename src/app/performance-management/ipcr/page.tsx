"use client";

import React, { useState } from "react";

import { useQueryClient } from "react-query";

import DepartmentSelect from "@/app/dashboard/_component/DepartmentSelect";
import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import UserForm from "@/components/page-components/AdminSettings/Users/UserForm";
import PageTitle from "@/components/PageTitle";
import RestoreButton from "@/components/RestoreButton";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch, restore } from "@/util/api";

import IpcrForm from "./_components/IpcrForm";

function Ipcr() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("IPCR");
  const [modal, setModal] = useState(false);

  const emptyVal = {
    id: undefined,
    employee_name: undefined,
    employee_id: "",
    ipcr_period_id: "",
    ipcr_period_name: undefined,
    reviewed_by: "",
    reviewed_by_name: "",
    recommending_approval: "",
    recommending_approval_name: "",
    evaluations: [
      {
        category_id: "",
        name: "",
        order: "",
        major_final_output: "",
        performance_indicators: "",
        target_of_accomplishment: "",
        actual_accomplishments: "",
        rating_q: "",
        rating_e: "",
        rating_t: "",
        remarks: "",
        evaluations: undefined,
      },
    ],
  };

  const [defaultValue, setDefaultValue] = useState(emptyVal);

  const columns: TableColumnsType[] = [
    {
      title: "Name",
      cellKey: "name",
      textAlign: "left",
    },
    {
      title: "Email",
      cellKey: "email",
      textAlign: "left",
    },
  ];
  const { data, isLoading } = useFetch(
    "users-list",
    ["users-list", search, page],
    `/api/users?search=${search}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "users-list-archive",
    ["users-list-archive", search, page],
    `/api/users/archive?search=${search}&page=${page}`
  );

  const [isDepartmentIds, setDepartmentIds] = useState<
    { name: string; id: string }[]
  >([]);

  const { setNotification } = useGlobalState();
  const queryClient = useQueryClient();
  const successRestore = () => {
    queryClient.invalidateQueries("users-list");
    queryClient.invalidateQueries("users-list-archive");
    setModal(false);
    setNotification(true, "success", `User successfully restored!`);
  };
  const errorRestore = (error: any) => {
    setNotification(true, "error", "Something went wrong");
  };
  const restoreHandler = (id: any) => {
    restore(successRestore, errorRestore, `/api/users/restore/${id}`);
  };
  return (
    <>
      <PageTitle title={["Performance Management"]} />
      <Tab
        tab={isTab}
        setTab={setTab}
        tabMenu={["IPCR", "IPCR archive", "OPCR"]}
      />
      <div className=" flex items-center flex-wrap gap-3 justify-between">
        <aside className=" flex flex-wrap gap-2 items-center">
          <Search search={search} setSearch={setSearch} />
          <DepartmentSelect
            selectedIDs={isDepartmentIds}
            setSelected={setDepartmentIds}
          />
        </aside>

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
        isLoading={isTab === "users" ? isLoading : archiveLoading}
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
          isTab === "users" ? data?.data?.data?.data : archive?.data?.data?.data
        }
        onClickRow={(data) => {
          if (isTab === "users") {
            setDefaultValue(data);
            setModal(true);
          }
        }}
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "users"
            ? data?.data?.data?.last_page
            : archive?.data?.data?.last_page
        }
      />
      <Modal
        show={modal}
        onClose={() => {
          setModal(false);
        }}
        width="wide"
      >
        <IpcrForm setModal={setModal} defaultValues={defaultValue} />
      </Modal>
    </>
  );
}

export default Ipcr;
