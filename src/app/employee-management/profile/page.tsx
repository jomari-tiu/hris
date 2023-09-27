"use client";

import React, { useState } from "react";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import EmployeeForm from "@/components/page-components/Employee/Profile/EmployeeForm/EmployeeForm";
import PageTitle from "@/components/PageTitle";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";

function ProfilePage() {
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
      <PageTitle title={["Employee", "Profile"]} />
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
        width="wide"
      >
        <EmployeeForm
        // defaultValues={{
        //   birth_date: "123",
        //   birth_place: "123",
        //   citizenship: "123",
        //   civil_status: "123",
        //   date_hired: "123",
        //   email: "123",
        //   employee_id: "123",
        //   extension_name: "123",
        //   first_name: "123",
        //   middle_name: "123",
        //   mobile_no: "123",
        //   sex: "123",
        //   surname: "123",
        //   telephone_no: "123",
        //   elementary_basic_education: "123",
        //   elementary_from: "123",
        //   elementary_highest_level: "123",
        //   elementary_name_of_school: "123",
        //   elementary_scholar_honor_received: "123",
        //   elementary_to: "123",
        //   elementary_year_graduated: "123",
        //   secondary_basic_education: "123",
        //   secondary_from: "123",
        //   secondary_highest_level: "123",
        //   secondary_name_of_school: "123",
        //   secondary_scholar_honor_received: "123",
        //   secondary_to: "123",
        //   secondary_year_graduated: "123",
        //   vacational_basic_education: "123",
        //   vacational_from: "123",
        //   vacational_highest_level: "123",
        //   vacational_name_of_school: "123",
        //   vacational_scholar_honor_received: "123",
        //   vacational_to: "123",
        //   vacational_year_graduated: "123",
        //   trainings: [
        //     {
        //       title: "123",
        //       conducted_by: "123",
        //       hours_no: "123",
        //       type_id: "123",
        //       from: "123",
        //       to: "123",
        //     },
        //   ],
        // }}
        />
      </Modal>
    </>
  );
}

export default ProfilePage;
