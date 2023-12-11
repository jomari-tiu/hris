"use client";

import React, { useState } from "react";

import { useQueryClient } from "react-query";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import LeaveForm, {
  LeaveDefaultValue,
  LeaveResponse,
} from "@/components/page-components/LeaveManagement/LeaveForm";
import PageTitle from "@/components/PageTitle";
import RestoreButton from "@/components/RestoreButton";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch, restore } from "@/util/api";

function LeaveMangement() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("leaves");
  const [modal, setModal] = useState(false);

  const emptyVal: LeaveDefaultValue = {
    id: undefined,
    employee_id: "",
    employee_name: "",
    leave_type_id: "",
    leave_type_name: "",
    status: "",
    date_filed: "",
    date_start: "",
    date_end: "",
    time_start: "",
    time_end: "",
    details_of_leave: "",
    disapproved_for: "",
    approved_for: "",
    approved_for_type: "",
    commutation: "",
  };

  const [defaultValue, setDefaultValue] = useState(emptyVal);

  const columns: TableColumnsType[] = [
    {
      title: "Name",
      cellKey: "last_name",
      textAlign: "left",
      render: (_, data) => <div>{data.employee.full_name}</div>,
    },
    {
      title: "Type",
      cellKey: "type",
      textAlign: "left",
      render: (value) => {
        return <div>SL</div>;
      },
    },
    {
      title: "Date Start",
      cellKey: "date_start",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
    {
      title: "Date End",
      cellKey: "date_end",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
    {
      title: "Credit",
      cellKey: "credit",
      textAlign: "left",
      render: (value) => {
        return <div>10</div>;
      },
    },
    {
      title: "States",
      cellKey: "status",
      textAlign: "left",
      render: (value) => {
        return <div>Late-filing</div>;
      },
    },
    {
      title: "Remarks",
      cellKey: "status",
      textAlign: "left",
    },
  ];

  const balancesColumns: TableColumnsType[] = [
    {
      title: "Name",
      cellKey: "last_name",
      textAlign: "left",
      render: (_, data) => <div>{data.employee.full_name}</div>,
    },
    {
      title: "Department",
      cellKey: "",
      textAlign: "left",
      render: (_, data) => <div>{data.employee.department_id}</div>,
    },
    {
      title: "Position",
      cellKey: "",
      textAlign: "left",
      render: (_, data) => <div>{data.employee.position_id}</div>,
    },
    {
      title: "Remaining VL",
      cellKey: "date_end",
      textAlign: "left",
      render: (value) => {
        return <div>{10}</div>;
      },
    },
    {
      title: "Remaining SL",
      cellKey: "date_end",
      textAlign: "left",
      render: (value) => {
        return <div>{5}</div>;
      },
    },
    {
      title: "Year",
      cellKey: "",
      textAlign: "left",
      render: (value) => {
        return <div>{2023}</div>;
      },
    },
  ];
  const { data, isLoading } = useFetch(
    "leaves-list",
    ["leaves-list", search, page, status],
    `/api/leaves?search=${search}&status=${status}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "leaves-list-archive",
    ["leaves-list-archive", search, page, status],
    `/api/leaves/archive?search=${search}&status=${status}&page=${page}`
  );

  const { setNotification } = useGlobalState();
  const queryClient = useQueryClient();
  const successRestore = () => {
    queryClient.invalidateQueries("leaves-list");
    queryClient.invalidateQueries("leaves-list-archive");
    setModal(false);
    setNotification(true, "success", `Leave successfully restored!`);
  };
  const errorRestore = (error: any) => {
    setNotification(true, "error", "Something went wrong");
  };
  const restoreHandler = (id: any) => {
    restore(successRestore, errorRestore, `/api/leaves/restore/${id}`);
  };
  return (
    <>
      <PageTitle title={["Leave Management"]} />
      <Tab
        tab={isTab}
        setTab={setTab}
        tabMenu={["leaves", "archive", "balances"]}
      />
      <div className=" flex items-center flex-wrap gap-3 justify-between">
        <div className=" flex items-center gap-2">
          <Search search={search} setSearch={setSearch} />
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="disapproved">Disapproved</option>
          </select>
        </div>
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
        isLoading={isTab === "leaves" ? isLoading : archiveLoading}
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
            : isTab === "balances"
            ? balancesColumns
            : columns
        }
        data={
          isTab === "leaves"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        onClickRow={(data: LeaveResponse) => {
          if (isTab === "leaves") {
            setDefaultValue({
              id: data?.id,
              employee_id: data?.employee_id,
              employee_name: `${data?.employee?.first_name} ${data?.employee?.last_name}`,
              leave_type_id: data?.leave_type_id,
              leave_type_name: data?.leave_type.name,
              status: data?.status,
              date_filed: data?.date_filed,
              date_start: data?.date_start,
              date_end: data?.date_end,
              time_start: data?.time_start,
              time_end: data?.time_end,
              details_of_leave: data?.details_of_leave,
              disapproved_for: data?.disapproved_for,
              approved_for: data?.approved_for,
              approved_for_type: data?.approved_for_type,
              commutation: data?.commutation,
            });
            setModal(true);
          }
        }}
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "leaves"
            ? data?.data?.data?.last_page
            : archive?.data?.data?.last_page
        }
      />
      <Modal
        show={modal}
        onClose={() => {
          setModal(false);
        }}
        width="regular"
      >
        <LeaveForm defaultValues={defaultValue} setModal={setModal} />
      </Modal>
    </>
  );
}

export default LeaveMangement;
