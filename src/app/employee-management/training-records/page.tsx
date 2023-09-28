"use client";

import React, { useState } from "react";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import UserForm from "@/components/page-components/AdminSettings/Users/UserForm";
import TrainingForm from "@/components/page-components/Employee/TrainingRecord/TrainingForm";
import PageTitle from "@/components/PageTitle";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";

function TrainingPage() {
  const [search, setSearch] = useState("");
  const [isTab, setTab] = useState("trainings");
  const [modal, setModal] = useState(false);
  const columns: TableColumnsType[] = [
    {
      title: "sample",
      cellKey: "cell1",
      render: (value, data) => {
        return <div>{value}</div>;
      },
    },
    {
      title: "sample1",
      cellKey: "cell2",
    },
    {
      title: "sample2",
      cellKey: "cell3",
    },
  ];

  const data = [
    {
      cell1: "jomari",
      cell2: "jomari2",
      cell3: "jomari2",
    },
    {
      cell1: "jomari",
      cell2: "jomari2",
      cell3: "jomari2",
    },
    {
      cell1: "jomari",
      cell2: "jomari2",
      cell3: "jomari2",
    },
  ];
  return (
    <>
      <PageTitle title={["Employee", "Training Records"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["trainings", "archive"]} />
      <div className=" flex items-center flex-wrap gap-3 justify-between">
        <Search search={search} setSearch={setSearch} />
        <Button appearance={"primary"} onClick={() => setModal(true)}>
          Add
        </Button>
      </div>
      <Table
        columns={columns}
        data={data}
        onClickRow={(data) => {
          alert(data);
        }}
      />
      <Modal
        show={modal}
        onClose={() => {
          setModal(false);
        }}
        width="narrow"
      >
        <TrainingForm
          defaultValues={{
            title: "",
            description: "",
            conducted_by: "",
            period_from: "",
            period_to: "",
            hours: 0,
            type_of_ld: "",
            id: undefined,
          }}
        />
      </Modal>
    </>
  );
}

export default TrainingPage;
