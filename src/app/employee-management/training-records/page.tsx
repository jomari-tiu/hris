"use client";

import React, { useState } from "react";

import Button from "@/components/Button";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import UserForm from "@/components/page-components/AdminSettings/Users/UserForm";
import TrainingForm from "@/components/page-components/Employee/TrainingRecord/TrainingForm";
import PageTitle from "@/components/PageTitle";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch } from "@/util/api";

function TrainingPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("trainings");
  const [modal, setModal] = useState(false);

  const emptyVal = {
    title: "",
    description: "",
    conducted_by: "",
    period_from: "",
    period_to: "",
    hours: 0,
    type_of_ld: "",
    id: undefined,
  };

  const [defaultValue, setDefaultValue] = useState(emptyVal);

  const columns: TableColumnsType[] = [
    {
      title: "Title",
      cellKey: "title",
      textAlign: "left",
    },
    {
      title: "Description",
      cellKey: "description",
      textAlign: "left",
    },
    {
      title: "Conducted by",
      cellKey: "conducted_by",
      textAlign: "left",
    },
    {
      title: "From",
      cellKey: "period_from",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
    {
      title: "To",
      cellKey: "period_to",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
    {
      title: "Hours",
      cellKey: "hours",
      textAlign: "left",
    },
  ];
  const { data, isLoading } = useFetch(
    "trainings-list",
    ["trainings-list", search, page],
    `/api/trainings?search=${search}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "trainings-list-archive",
    ["trainings-list-archive", search, page],
    `/api/trainings/archive?search=${search}&page=${page}`
  );
  return (
    <>
      <PageTitle title={["Employee", "Training Records"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["trainings", "archive"]} />
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
        isLoading={isTab === "trainings" ? isLoading : archiveLoading}
        columns={columns}
        data={
          isTab === "trainings"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        onClickRow={(data) => {
          if (isTab === "trainings") {
            setDefaultValue(data);
            setModal(true);
          }
        }}
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "trainings"
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
        <TrainingForm defaultValues={defaultValue} setModal={setModal} />
      </Modal>
    </>
  );
}

export default TrainingPage;
