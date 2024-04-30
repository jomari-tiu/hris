"use client";

import React, { useState } from "react";

import { useQueryClient } from "react-query";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import Modal from "@/components/Modal";
import PageTitle from "@/components/PageTitle";
import RestoreButton from "@/components/RestoreButton";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch, restore } from "@/util/api";

import { useDebounce } from "@/util/helpers";

import AwardsAccomplishmentsForm from "./_components/AwardsAccomplishmentsForm";
import DataForm, { DataType } from "./_components/DataForm";

const columns: TableColumnsType[] = [
  {
    title: "Employee",
    cellKey: "employee",
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
  {
    title: "Frequency",
    cellKey: "frequency",
    textAlign: "left",
  },
];

const columnsData: TableColumnsType[] = [
  {
    title: "Employee",
    cellKey: "employee_name",
    textAlign: "left",
    render: (_, value) => {
      return (
        <div>
          {value?.employee.last_name} {value?.employee.first_name}{" "}
          {value?.employee.middle_name}
        </div>
      );
    },
  },
  {
    title: "Department",
    cellKey: "",
    render: (_, value) => <div>{value?.employee?.department?.name}</div>,
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

function AwardsAccomplishmentsPage() {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("lists");
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  const emptyValAward = {
    remarks: "",
    employee_name: "",
    employee_id: "",
    award_name: "",
    date_awarded: "",
    id: undefined,
  };

  const emptyValData: DataType = {
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
    "awards-list",
    ["awards-list", debounceSearch, page],
    `/api/awards?search=${debounceSearch}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "awards-list-archive",
    ["awards-list-archive", debounceSearch, page],
    `/api/awards/archive?search=${debounceSearch}&page=${page}`
  );

  const { data: awardsData, isLoading: dataLoading } = useFetch(
    "awards-list-data",
    ["awards-list-data", debounceSearch, page],
    `/api/awards/details?search=${debounceSearch}&page=${page}`
  );

  const { setNotification } = useGlobalState();
  const queryClient = useQueryClient();
  const successRestore = () => {
    queryClient.invalidateQueries("awards-list");
    queryClient.invalidateQueries("awards-list-archive");
    setModal(false);
    setNotification(true, "success", `Award successfully restored!`);
  };
  const errorRestore = (error: any) => {
    setNotification(true, "error", "Something went wrong");
  };
  const restoreHandler = (id: any) => {
    restore(successRestore, errorRestore, `/api/awards/restore/${id}`);
  };
  return (
    <>
      <PageTitle title={["Employee", "Awards and Accomplishments"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["lists", "archive", "data"]} />
      <div className=" flex items-center flex-wrap gap-3 justify-between">
        <Search search={search} setSearch={setSearch} />
        {isTab === "data" && (
          <Button
            appearance={"primary"}
            onClick={() => {
              setDefaultValueData(emptyValData);
              setModalData(true);
            }}
          >
            Add
          </Button>
        )}
      </div>
      <Table
        isLoading={isTab === "awards" ? isLoading : archiveLoading}
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
          isTab === "archive"
            ? archive?.data?.data?.data
            : isTab === "data"
            ? awardsData?.data?.data?.data
            : data?.data?.data?.data
        }
        onClickRow={(data) => {
          if (isTab === "data") {
            setDefaultValueData({
              employee_id: data?.employee?.id,
              employee_name: `${data?.employee.last_name} ${data?.employee.first_name} ${data?.employee.middle_name}`,
              department_id: data?.employee?.department?.id,
              department_name: data?.employee?.department?.name,
              award_name: data?.award_name,
              date_awarded: data?.date_awarded,
              id: data?.id,
            });
            setModalData(true);
          }
        }}
        noCursor={isTab !== "data"}
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "archive"
            ? archive?.data?.data?.last_page
            : isTab === "data"
            ? awardsData?.data?.data?.last_page
            : data?.data?.data?.last_page
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
