"use client";

import React, { useState } from "react";

import Button from "@/components/Button";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import EmployeeForm from "@/components/page-components/Employee/Profile/EmployeeForm/EmployeeForm";
import PageTitle from "@/components/PageTitle";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch } from "@/util/api";

function ProfilePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("profile");
  const [modal, setModal] = useState(false);

  const [defaultValue, setDefaultValue] = useState({
    birth_date: "",
    department_id: "",
    position_id: "",
    birth_place: "",
    citizenship: "",
    civil_status: "",
    date_hired: "",
    email: "",
    employee_id: "",
    name_ext: "",
    first_name: "",
    middle_name: "",
    mobile_no: "",
    sex: "",
    last_name: "",
    tel_no: "",
    educational_backgrounds: [
      {
        level: "",
        school_name: "",
        degree: "",
        period_from: "",
        period_to: "",
        units_earned: "",
        year_graduated: "",
        academic_honors_received: "",
      },
    ],
    trainings: [
      {
        title: "",
        conducted_by: "",
        hours_no: "",
        type_id: "",
        from: "",
        to: "",
      },
    ],
  });

  const columns: TableColumnsType[] = [
    {
      title: "Name",
      cellKey: "first_name",
      render: (value, data) => {
        return (
          <div>
            {data.last_name} {data.first_name} {data.name_ext}{" "}
            {data.middle_name}
          </div>
        );
      },
      textAlign: "left",
    },
    {
      title: "Email",
      cellKey: "email",
      textAlign: "left",
    },
    {
      title: "Employee ID",
      cellKey: "employee_id",
      textAlign: "left",
    },
    {
      title: "Date Hired",
      cellKey: "date_hired",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
    {
      title: "Birth Date",
      cellKey: "birth_date",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
    {
      title: "Birth Place",
      cellKey: "birth_place",
      textAlign: "left",
    },
  ];
  const { data, isLoading } = useFetch(
    "profile-list",
    ["profile-list", search, page],
    `/api/employees?search=${search}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "profile-list-archive",
    ["profile-list-archive", search, page],
    `/api/employees/archive?search=${search}&page=${page}`
  );

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
        isLoading={isTab === "profile" ? isLoading : archiveLoading}
        columns={columns}
        data={
          isTab === "profile"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        onClickRow={(data) => {
          if (isTab === "profile") {
            setDefaultValue(data);
            setModal(true);
          }
        }}
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "profile"
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
        <EmployeeForm setModal={setModal} defaultValues={defaultValue} />
      </Modal>
    </>
  );
}

export default ProfilePage;
