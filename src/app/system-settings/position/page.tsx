"use client";

import React, { useState } from "react";

import { useQueryClient } from "react-query";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import Modal from "@/components/Modal";
import PositionForm from "@/components/page-components/SystemSettings/Position/PositionForm";
import PageTitle from "@/components/PageTitle";
import RestoreButton from "@/components/RestoreButton";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch, restore } from "@/util/api";
import { useDebounce } from "@/util/helpers";

function PositionPage() {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("positions");
  const [modal, setModal] = useState(false);

  const emptyVal = {
    name: "",
    description: "",
    department_id: "",
    department_name: "",
  };

  const [defaultValue, setDefaultValue] = useState<any>(emptyVal);

  const columns: TableColumnsType[] = [
    {
      title: "Name",
      cellKey: "name",
      textAlign: "left",
    },
    {
      title: "Description",
      cellKey: "description",
      textAlign: "left",
    },
    {
      title: "Department",
      cellKey: "description",
      textAlign: "left",
      render: (_, data) => <div>{data?.department?.name}</div>,
    },
  ];

  const { data, isLoading } = useFetch(
    "positions-list",
    ["positions-list", debounceSearch, page],
    `/api/positions?search=${debounceSearch}&page=${page}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "positions-list-archive",
    ["positions-list-archive", debounceSearch, page],
    `/api/positions/archive?search=${debounceSearch}&page=${page}`
  );

  const { setNotification } = useGlobalState();
  const queryClient = useQueryClient();
  const successRestore = () => {
    queryClient.invalidateQueries("positions-list");
    queryClient.invalidateQueries("positions-list-archive");
    setModal(false);
    setNotification(true, "success", `Position successfully restored!`);
  };
  const errorRestore = (error: any) => {
    setNotification(true, "error", "Something went wrong");
  };
  const restoreHandler = (id: any) => {
    restore(successRestore, errorRestore, `/api/positions/restore/${id}`);
  };
  return (
    <>
      <PageTitle title={["System Settings", "positions"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["positions", "archive"]} />
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
        isLoading={isTab === "positions" ? isLoading : archiveLoading}
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
          isTab === "positions"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        onClickRow={(data) => {
          if (isTab === "positions") {
            setDefaultValue({
              id: data?.id,
              name: data?.name,
              description: data?.description,
              department_id: data?.department?.id,
              department_name: data?.department?.name,
            });
            setModal(true);
          }
        }}
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "positions"
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
        <PositionForm setModal={setModal} defaultValues={defaultValue} />
      </Modal>
    </>
  );
}

export default PositionPage;
