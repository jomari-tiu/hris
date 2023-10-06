"use client";

import React, { useState } from "react";

import Button from "@/components/Button";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import EmployeeForm from "@/components/page-components/Employee/Profile/EmployeeForm/EmployeeForm";
import {
  employeeEducation,
  employeeTrainings,
  employeeinfo,
  employeeinfoResponse,
} from "@/components/page-components/Employee/Profile/EmployeeForm/Type";
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

  const emptyVal = {
    id: "",
    birth_date: "",
    department_id: "",
    department_name: "",
    position_name: "",
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
  };

  const [defaultValue, setDefaultValue] = useState<
    employeeinfo & employeeEducation & { trainings: employeeTrainings }
  >(emptyVal);

  const columns: TableColumnsType[] = [
    {
      title: "Name",
      cellKey: "first_name",
      render: (value, data) => {
        return (
          <div>
            {data?.last_name} {data?.first_name} {data?.name_ext}{" "}
            {data?.middle_name}
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
        isLoading={isTab === "profile" ? isLoading : archiveLoading}
        columns={columns}
        data={
          isTab === "profile"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        onClickRow={(
          data: employeeinfoResponse &
            employeeEducation & { trainings: employeeTrainings }
        ) => {
          if (isTab === "profile") {
            setDefaultValue({
              id: data?.id,
              birth_date: data?.birth_date,
              department_id: data?.department?.id,
              position_id: data?.position?.id,
              department_name: data?.department?.name,
              position_name: data?.position?.name,
              birth_place: data?.birth_place,
              citizenship: data?.citizenship,
              civil_status: data?.civil_status,
              date_hired: data?.date_hired,
              email: data?.email,
              employee_id: data?.employee_id,
              name_ext: data?.name_ext,
              first_name: data?.first_name,
              middle_name: data?.middle_name,
              mobile_no: data?.mobile_no,
              sex: data?.sex,
              last_name: data?.last_name,
              tel_no: data?.tel_no,

              educational_backgrounds: data?.educational_backgrounds.map(
                (item) => {
                  return {
                    level: item?.level,
                    school_name: item?.school_name,
                    degree: item?.degree,
                    period_from: item?.period_from,
                    period_to: item?.period_to,
                    units_earned: item?.units_earned,
                    year_graduated: item?.year_graduated,
                    academic_honors_received: item?.academic_honors_received,
                  };
                }
              ),
              trainings: data?.trainings.map((item) => {
                return {
                  title: item?.title,
                  conducted_by: item?.conducted_by,
                  hours_no: item?.hours_no,
                  type_id: item?.type_id,
                  from: item?.from,
                  to: item?.to,
                };
              }),
            });
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
