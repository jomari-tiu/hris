"use client";

import React, { useState } from "react";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import EmployeeForm from "@/components/page-components/Employee/Profile/EmployeeForm";
import PageTitle from "@/components/PageTitle";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";

function page() {
  const [search, setSearch] = useState("");
  const [isTab, setTab] = useState("profile");
  const [modal, setModal] = useState(true);
  const columns: TableColumnsType[] = [
    {
      title: "sample",
      cellKey: "cell1",
      render: (value, data) => {
        return <div>{value}</div>;
      },
      textAlign: "center",
    },
    {
      title: "sample1",
      cellKey: "cell2",
      textAlign: "center",
    },
    {
      title: "sample2",
      cellKey: "cell3",
      textAlign: "center",
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
      <PageTitle>Employee {">"} Profile</PageTitle>
      <Tab tab={isTab} setTab={setTab} tabMenu={["profile", "archive"]} />
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
        width="regular"
      >
        <EmployeeForm />
      </Modal>
    </>
  );
}

export default page;
