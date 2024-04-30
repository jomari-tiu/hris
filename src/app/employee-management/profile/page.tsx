"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { useQueryClient } from "react-query";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import DeleteButton from "@/components/DeleteButton";
import DialogBox from "@/components/DialogBox";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import EmployeeForm from "@/components/page-components/Employee/Profile/EmployeeForm/EmployeeForm";
import {
  employeeEducation,
  employeeTrainings,
  employeeinfo,
} from "@/components/page-components/Employee/Profile/EmployeeForm/Type";
import PageTitle from "@/components/PageTitle";
import RestoreButton from "@/components/RestoreButton";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import ViewButton from "@/components/ViewButton";
import {
  useFetch,
  restore,
  useRemove,
  useRemoveReason,
  usePost,
} from "@/util/api";
import { useDebounce } from "@/util/helpers";

function ProfilePage() {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("profile");
  const [modal, setModal] = useState(false);

  const router = useRouter();

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
    employment_status_id: "",
    employment_status_name: "",
    is_flexible: false,
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
        hours: "",
        type_of_Id: "",
        period_from: "",
        period_to: "",
        description: "",
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
    ["profile-list", debounceSearch, page],
    `/api/employees?search=${debounceSearch}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "profile-list-archive",
    ["profile-list-archive", debounceSearch, page],
    `/api/employees/archive?search=${debounceSearch}&page=${page}`
  );

  const { setNotification } = useGlobalState();
  const queryClient = useQueryClient();
  const successRestore = () => {
    queryClient.invalidateQueries("profile-list");
    queryClient.invalidateQueries("profile-list-archive");
    setModal(false);
    setNotification(true, "success", `Employee profile successfully restored!`);
  };
  const errorRestore = (error: any) => {
    setNotification(true, "error", "Something went wrong");
  };
  const restoreHandler = (id: any) => {
    restore(successRestore, errorRestore, `/api/employees/restore/${id}`);
  };

  const [deleteID, setDeleteID] = useState("");
  const { mutate: Delete, isLoading: deleteLoading } = usePost(
    () => {
      setNotification(true, "success", `Employee successfully deleted!`);
      setDeleteID("");
    },
    (error: any) => {
      setNotification(true, "error", error);
    },
    "/api/employees/delete-employee-profile",
    false,
    "profile-list"
  );

  const [deleteReason, setDeleteReason] = useState("");

  return (
    <>
      <DialogBox
        onConfirm={() => {
          Delete({
            id: deleteID,
            reason: deleteReason,
          });
        }}
        onClose={() => {
          setDeleteID("");
        }}
        show={deleteID !== ""}
        setShow={setDeleteID}
        loading={deleteLoading}
        reason={deleteReason}
        setReason={setDeleteReason}
      />
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
                {
                  title: "Action",
                  cellKey: "deleted_by_name",
                  textAlign: "left",
                },
              ]
            : [
                ...columns,
                {
                  title: "Action",
                  cellKey: "",
                  textAlign: "left",
                  render: (_, data) => (
                    <div className=" flex gap-2 items-center h-full ">
                      <ViewButton
                        onClick={() => {
                          router.push(
                            `/employee-management/profile/${data?.id}`
                          );
                        }}
                      />
                      <DeleteButton
                        loading={deleteLoading && data?.id === deleteID}
                        onClick={() => {
                          setDeleteID(data?.id);
                        }}
                      />
                    </div>
                  ),
                },
              ]
        }
        data={
          isTab === "profile"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
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
