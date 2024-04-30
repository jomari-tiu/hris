"use client";

import React, { useState } from "react";

import { useQueryClient } from "react-query";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import Modal from "@/components/Modal";
import PageTitle from "@/components/PageTitle";
import RestoreButton from "@/components/RestoreButton";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch, restore } from "@/util/api";

import { useDebounce } from "@/util/helpers";

import BalancesForm, { BalancesFormType } from "./_components/BalancesForm";

function BalancesPage() {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("balances");
  const [modal, setModal] = useState(false);

  const emptyVal = {
    employee_id: "",
    employee_name: "",
    remaining_vl: 0,
    remaining_sl: 0,
    year: 2023,
  };

  const [defaultValue, setDefaultValue] = useState<BalancesFormType>(emptyVal);

  const columns: TableColumnsType[] = [
    {
      title: "Name",
      cellKey: "name",
      textAlign: "left",
      render: (_, data) => (
        <div>
          {data?.employee?.last_name}, {data?.employee?.first_name},{" "}
          {data?.employee?.middle_name}
        </div>
      ),
    },
    {
      title: "Remaining VL",
      cellKey: "remaining_vl",
      textAlign: "left",
    },
    {
      title: "Remaining SL",
      cellKey: "remaining_sl",
      textAlign: "left",
    },
    {
      title: "Year",
      cellKey: "year",
      textAlign: "left",
    },
  ];
  const { data, isLoading } = useFetch(
    "leave-balances-list",
    ["leave-balances-list", debounceSearch, page],
    `/api/leave_balances?search=${debounceSearch}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "leave-balances-list-archive",
    ["leave-balances-list-archive", debounceSearch, page],
    `/api/leave_balances/archive?search=${debounceSearch}&page=${page}`
  );

  const { setNotification } = useGlobalState();
  const queryClient = useQueryClient();
  const successRestore = () => {
    queryClient.invalidateQueries("leave-balances-list");
    queryClient.invalidateQueries("leave-balances-list-archive");
    setModal(false);
    setNotification(true, "success", `User successfully restored!`);
  };
  const errorRestore = (error: any) => {
    setNotification(true, "error", "Something went wrong");
  };
  const restoreHandler = (id: any) => {
    restore(successRestore, errorRestore, `/api/leave_balances/restore/${id}`);
  };
  return (
    <>
      <PageTitle title={["Leave Management", "Balances"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["balances", "archive"]} />
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
        isLoading={isTab === "balances" ? isLoading : archiveLoading}
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
            : columns
        }
        data={
          isTab === "balances"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        onClickRow={(data) => {
          if (isTab === "balances") {
            setDefaultValue({
              employee_id: data?.employee?.id,
              employee_name: `${data?.employee?.last_name}, ${data?.employee?.first_name}, ${data?.employee?.middle_name}`,
              remaining_vl: data?.remaining_vl,
              remaining_sl: data?.remaining_sl,
              year: data?.year,
              id: data?.id,
            });
            setModal(true);
          }
        }}
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "balances"
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
        <BalancesForm setModal={setModal} defaultValues={defaultValue} />
      </Modal>
    </>
  );
}

export default BalancesPage;
