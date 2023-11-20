"use client";

import React, { useEffect, useState } from "react";

import { useQueryClient } from "react-query";

import DepartmentSelect from "@/app/dashboard/_component/DepartmentSelect";
import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import ControllerFieldData from "@/components/ControllerFieldData";
import Dropdown from "@/components/Dropdown";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import PageTitle from "@/components/PageTitle";
import RestoreButton from "@/components/RestoreButton";
import Search from "@/components/Search";

import Tab from "@/components/Tab";

import Table, { TableColumnsType } from "@/components/Table";

import { useFetch, restore } from "@/util/api";

import IpcrForm from "./_components/IpcrForm";
import { ipcr } from "./_components/ipcrType";
import ModifyForm from "./_components/ModifyForm";
import SubCategoryForm from "./_components/SubCategoryForm";

function Ipcr() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("IPCR");
  const [modal, setModal] = useState(false);
  const [period, setPeriod] = useState({
    value: "",
    id: "",
  });
  const [isDepartmentIds, setDepartmentIds] = useState<
    { name: string; id: string }[]
  >([]);

  useEffect(() => {
    setPage(1);
    setSearch("");
    setPeriod({
      value: "",
      id: "",
    });
  }, [isTab]);

  const emptyVal: ipcr = {
    id: undefined,
    employee_name: "",
    employee_id: "",
    ipcr_period_id: "",
    ipcr_period_date_range: "",
    reviewed_by: "",
    reviewed_by_name: "",
    recommending_approval: "",
    recommending_approval_name: "",
    strategic_evaluations: [],
    core_evaluations: [],
    support_evaluations: [],
  };

  const [defaultValue, setDefaultValue] = useState<any>(emptyVal);

  const opcrColumns: any = [
    {
      title: "Department",
      cellKey: "department_name",
      textAlign: "left",
    },
    {
      title: "Department Head",
      cellKey: "",
      textAlign: "left",
      render: (_: any, data: any) => {
        return <div>{data?.department_head_employee?.full_name}</div>;
      },
    },
    {
      title: "Date Hired",
      cellKey: "",
      textAlign: "left",
      render: (_: any, data: any) => {
        return (
          <div>
            {textDateFormat(data?.department_head_employee?.date_hired)}
          </div>
        );
      },
    },
    {
      title: "Email",
      cellKey: "",
      textAlign: "left",
      render: (_: any, data: any) => {
        return <div>{data?.department_head_employee?.email}</div>;
      },
    },
    {
      title: "Citizenship",
      cellKey: "",
      textAlign: "left",
      render: (_: any, data: any) => {
        return <div>{data?.department_head_employee?.citizenship}</div>;
      },
    },
  ];

  const columns: TableColumnsType[] = [
    {
      title: "Name",
      cellKey: "",
      textAlign: "left",
      render: (_, data) => {
        return <div>{data?.employee?.full_name}</div>;
      },
    },
    {
      title: "Citizenship",
      cellKey: "",
      textAlign: "left",
      render: (_, data) => {
        return <div>{data?.employee?.citizenship}</div>;
      },
    },
    {
      title: "Birth Place",
      cellKey: "",
      textAlign: "left",
      render: (_, data) => {
        return <div>{data?.employee?.birth_place}</div>;
      },
    },
    {
      title: "Average Mean",
      cellKey: "",
      textAlign: "left",
      render: (_, data) => {
        let av =
          Number(data?.mean_score_core) +
          Number(data?.mean_score_strategic) +
          Number(data?.mean_score_support);
        av = av / 3;
        return <div>{av.toFixed(2)}</div>;
      },
    },
    {
      title: "Average Weight",
      cellKey: "",
      textAlign: "left",
      render: (_, data) => {
        let av =
          Number(data?.weighted_average_core) +
          Number(data?.weighted_average_strategic) +
          Number(data?.weighted_average_support);
        av = av / 3;
        return <div>{av.toFixed(2)}</div>;
      },
    },
  ];
  const { data, isLoading } = useFetch(
    "ipcr-list",
    [
      "ipcr-list",
      search,
      page,
      isDepartmentIds.map((item) => item.id),
      period.id,
    ],
    `/api/ipcr_evaluations?search=${search}&page=${page}&period_id=${
      period.id
    }&department_ids=${isDepartmentIds.map((item) => item.id)}`
  );

  const { data: opcr, isLoading: opcrLoading } = useFetch(
    "opcr-list",
    ["opcr-list", search, page, period.id],
    `/api/opcr?search=${search}&page=${page}&period_id=${period.id}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "ipcr-list-archive",
    [
      "ipcr-list-archive",
      search,
      page,
      isDepartmentIds.map((item) => item.id),
      period.id,
    ],
    `/api/ipcr_evaluations/archive?search=${search}&page=${page}&period_id=${
      period.id
    }&department_ids=${isDepartmentIds.map((item) => item.id)}`
  );

  const { setNotification } = useGlobalState();
  const queryClient = useQueryClient();
  const successRestore = () => {
    queryClient.invalidateQueries("ipcr-list");
    queryClient.invalidateQueries("ipcr-list-archive");
    setModal(false);
    setNotification(true, "success", `User successfully restored!`);
  };
  const errorRestore = (error: any) => {
    setNotification(true, "error", "Something went wrong");
  };
  const restoreHandler = (id: any) => {
    restore(successRestore, errorRestore, `/api/ipcr/restore/${id}`);
  };

  return (
    <>
      <PageTitle title={["Performance Management"]} />
      <Tab
        tab={isTab}
        setTab={setTab}
        tabMenu={["IPCR", "IPCR archive", "OPCR"]}
      />
      <div className=" flex items-center flex-wrap gap-3 justify-between">
        <aside className=" flex flex-wrap gap-2 items-center">
          <Search search={search} setSearch={setSearch} />
          {isTab !== "OPCR" && (
            <DepartmentSelect
              selectedIDs={isDepartmentIds}
              setSelected={setDepartmentIds}
            />
          )}
          <Dropdown
            value={period}
            setValue={setPeriod}
            endpoint={"/api/options/ipcr_periods"}
            label={"Period"}
            displayValueKey={"date_range"}
          />
        </aside>

        {isTab !== "OPCR" && (
          <aside className=" gap-2 flex items-center flex-wrap">
            <Button
              appearance={"primary"}
              onClick={() => {
                setDefaultValue(emptyVal);
                setModal(true);
              }}
            >
              Add
            </Button>
          </aside>
        )}
      </div>
      {isTab !== "OPCR" ? (
        <Table
          isLoading={isTab === "IPCR" ? isLoading : archiveLoading}
          columns={
            isTab === "IPCR archive"
              ? [
                  ...columns,
                  {
                    title: "Action",
                    cellKey: "date_period",
                    textAlign: "left",
                    render: (_, data) => (
                      <div className=" flex ">
                        <RestoreButton
                          onClick={() => restoreHandler(data?.id)}
                        />
                      </div>
                    ),
                  },
                ]
              : columns
          }
          data={
            isTab === "IPCR"
              ? data?.data?.data?.data
              : archive?.data?.data?.data
          }
          onClickRow={(data) => {
            if (isTab === "IPCR") {
              setDefaultValue({
                type: "modify",
                id: data?.id,
              });
              setModal(true);
            }
          }}
          setPage={setPage}
          page={page}
          totalPage={
            isTab === "IPCR"
              ? data?.data?.data?.last_page
              : archive?.data?.data?.last_page
          }
        />
      ) : (
        <Table
          isLoading={opcrLoading}
          columns={opcrColumns}
          data={opcr?.data?.data?.data}
          setPage={setPage}
          page={page}
          totalPage={opcr?.data?.data?.last_page}
        />
      )}
      <Modal
        show={modal}
        onClose={() => {
          setModal(false);
        }}
        width="wide"
        fromStart={true}
      >
        {defaultValue?.type === "modify" ? (
          <ModifyForm id={defaultValue?.id} setModal={setModal} />
        ) : (
          <IpcrForm setModal={setModal} defaultValues={defaultValue} />
        )}
      </Modal>
    </>
  );
}

export default Ipcr;
