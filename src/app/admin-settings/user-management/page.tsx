"use client";

import React, { useState } from "react";

import { useQueryClient } from "react-query";

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
import { useDebounce } from "@/util/helpers";

function UserPage() {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("users");
  const [modal, setModal] = useState(false);

  const emptyVal = {
    name: "",
    email: "",
    // role_id: "",
    // employee_id: "",
    // role_name: "",
    // employee_name: "",
    id: undefined,
  };

  const [defaultValue, setDefaultValue] = useState(emptyVal);

  const columns: TableColumnsType[] = [
    {
      title: "Name",
      cellKey: "name",
      textAlign: "left",
      render: (value) => value.toUpperCase(),
    },
    {
      title: "Email",
      cellKey: "email",
      textAlign: "left",
      render: (value) => value.toUpperCase(),
    },
    {
      title: "Emp ID",
      cellKey: "emp_id",
      textAlign: "left",
    },
    // {
    //   title: "Role",
    //   cellKey: "role_name",
    //   textAlign: "left",
    //   render: (value) => value.toUpperCase(),
    // },
  ];

  const { data, isLoading } = useFetch(
    "users-list",
    ["users-list", debounceSearch, page],
    `/api/users?search=${debounceSearch}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "users-list-archive",
    ["users-list-archive", debounceSearch, page],
    `/api/users/archive?search=${debounceSearch}&page=${page}`
  );

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
      <PageTitle title={["Admin Settings", "User Management"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["users", "archive"]} />
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
            setDefaultValue({
              name: data?.name,
              email: data?.email,
              // role_id: data?.role?.id,
              // employee_id: data?.employee?.id,
              // role_name: data?.role?.name,
              // employee_name: data?.employee?.full_name,
              id: data?.id,
            });
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
        width="narrow"
      >
        <UserForm setModal={setModal} defaultValues={defaultValue} />
      </Modal>
    </>
  );
}

export default UserPage;
