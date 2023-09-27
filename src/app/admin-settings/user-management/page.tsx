"use client";

import React, { useState } from "react";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import UserForm from "@/components/page-components/AdminSettings/Users/UserForm";
import PageTitle from "@/components/PageTitle";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";

function UserPage() {
  const [search, setSearch] = useState("");
  const [isTab, setTab] = useState("profile");
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
      <PageTitle title={["Admin Settings", "User Management"]} />
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
        width="narrow"
      >
        <UserForm
          defaultValues={{
            name: "Jomari",
            email: "jomaritiu16@gmail.com",
          }}
        />
      </Modal>
    </>
  );
}

export default UserPage;
