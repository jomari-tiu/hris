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

import AwardsAccomplishmentsForm from "./_components/AwardsAccomplishmentsForm";
import DataForm, { DataType } from "./_components/DataForm";

const columns: TableColumnsType[] = [
  {
    title: "Employee",
    cellKey: "employee_name",
    textAlign: "left",
  },
  {
    title: "Department",
    cellKey: "department_name",
    textAlign: "left",
  },
  {
    title: "Award",
    cellKey: "award_name",
    textAlign: "left",
  },

  {
    title: "Frequency",
    cellKey: "frequency",
    textAlign: "left",
  },
  {
    title: "Date Awarded",
    cellKey: "date_awarded",
    textAlign: "left",
  },
];

const columnsData: TableColumnsType[] = [
  {
    title: "Employee",
    cellKey: "employee_name",
    textAlign: "left",
  },
  {
    title: "Department",
    cellKey: "department_name",
    textAlign: "left",
  },
  {
    title: "Award",
    cellKey: "award_name",
    textAlign: "left",
  },
  {
    title: "Date Awarded",
    cellKey: "date_awarded",
    textAlign: "left",
  },
];

const sampleData = [
  {
    id: 1,
    employee_name: "Gerhold, Tristian B.",
    employee_id: "qweqwasd",
    department_name: "Admin/Non-Teaching",
    department_id: "qweqe",
    award_name: "Employee of the month",
    frequency: "3",
    date_awarded: "2022-12-12",
  },
  {
    id: 2,
    employee_name: "Huels, Gaetano",
    employee_id: "12312",
    department_name: "Criminal Justice Education",
    department_id: "123qwe",
    award_name: "Leadership Awards",
    frequency: "1",
    date_awarded: "2022-12-12",
  },
];

const sampleDAwardData: DataType[] = [
  {
    id: 1,
    employee_name: "Gerhold, Tristian B.",
    employee_id: "qweqwasd",
    department_name: "Admin/Non-Teaching",
    department_id: "qweqe",
    award_name: "Employee of the month",
    date_awarded: "2022-12-12",
  },
  {
    id: 2,
    employee_name: "Huels, Gaetano",
    employee_id: "12312",
    department_name: "Criminal Justice Education",
    department_id: "123qwe",
    award_name: "Leadership Awards",
    date_awarded: "2022-12-12",
  },
];

function AwardsAccomplishmentsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("lists");
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  const emptyValAward = {
    employee_name: "",
    employee_id: "",
    award_name: "",
    frequency: "",
    date: "",
    id: undefined,
  };

  const emptyValData = {
    employee_name: "",
    employee_id: "",
    department_name: "",
    department_id: "",
    award_name: "",
    date_awarded: "",
    id: undefined,
  };

  const [defaultValue, setDefaultValue] = useState(emptyValAward);

  const [defaultValueData, setDefaultValueData] = useState(emptyValData);

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

  const { data: awardsData, isLoading: dataArchive } = useFetch(
    "users-list-archive",
    ["users-list-archive", search, page],
    `/api/users/archive?search=${search}&page=${page}`
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
      <PageTitle title={["Employee", "Awards and Accomplishments"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["lists", "archive", "data"]} />
      <div className=" flex items-center flex-wrap gap-3 justify-between">
        <Search search={search} setSearch={setSearch} />
        <Button
          appearance={"primary"}
          onClick={() => {
            if (isTab === "lists") {
              setDefaultValue(emptyValAward);
              setModal(true);
            }
            if (isTab === "data") {
              setDefaultValueData(emptyValData);
              setModalData(true);
            }
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
            : isTab === "data"
            ? columnsData
            : columns
        }
        data={
          // isTab === "users" ? data?.data?.data?.data : archive?.data?.data?.data
          isTab === "data" ? sampleDAwardData : sampleData
        }
        onClickRow={(data) => {
          if (isTab === "data") {
            setDefaultValueData(data);
            setModalData(true);
          }
        }}
        noCursor={isTab !== "data"}
        setPage={setPage}
        page={page}
        totalPage={
          1
          // isTab === "users"
          //   ? data?.data?.data?.last_page
          //   : archive?.data?.data?.last_page
        }
      />
      <Modal
        show={modal}
        onClose={() => {
          setModal(false);
        }}
        width="narrow"
      >
        <AwardsAccomplishmentsForm
          setModal={setModal}
          defaultValues={defaultValue}
        />
      </Modal>

      <Modal
        show={modalData}
        onClose={() => {
          setModalData(false);
        }}
        width="narrow"
      >
        <DataForm setModal={setModalData} defaultValues={defaultValueData} />
      </Modal>
    </>
  );
}

export default AwardsAccomplishmentsPage;
