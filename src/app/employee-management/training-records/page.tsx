"use client";

import React, { useEffect, useState } from "react";

import { FaSort } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { useQueryClient } from "react-query";

import Button from "@/components/Button";
import { useGlobalState } from "@/components/Context/AppMangement";
import DateRangePicker from "@/components/DateRangePicker";
import { textDateFormat } from "@/components/helper";
import Modal from "@/components/Modal";
import UserForm from "@/components/page-components/AdminSettings/Users/UserForm";
import TrainingForm from "@/components/page-components/Employee/TrainingRecord/TrainingForm";
import PageTitle from "@/components/PageTitle";
import RestoreButton from "@/components/RestoreButton";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import Table, { TableColumnsType } from "@/components/Table";
import { useFetch, restore } from "@/util/api";
import { useDebounce } from "@/util/helpers";

function TrainingPage() {
  const [sort, setSort] = useState({
    sortByColumn: "period_from",
    sortBy: "DESC",
  });
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isTab, setTab] = useState("trainings");
  const [modal, setModal] = useState(false);

  const emptyVal = {
    title: "",
    description: "",
    conducted_by: "",
    period_from: "",
    period_to: "",
    hours: 0,
    type_of_ld: "",
    id: undefined,
    url: "",
  };

  const [defaultValue, setDefaultValue] = useState(emptyVal);

  useEffect(() => {
    console.log(sort);
  }, [sort]);

  const sortHandler = (columnName: string) => {
    setSort({
      sortByColumn: columnName,
      sortBy: sort.sortBy === "DESC" ? "ASC" : "DESC",
    });
  };

  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });

  const columns: TableColumnsType[] = [
    {
      title: "Title",
      cellKey: "title",
      textAlign: "left",
      render: (value) => value.toUpperCase(),
    },
    {
      title: "Description",
      cellKey: "description",
      textAlign: "left",
      render: (value) => value.toUpperCase(),
    },
    {
      title: "Conducted by",
      cellKey: "conducted_by",
      textAlign: "left",
      render: (value) => value.toUpperCase(),
    },
    {
      title: (
        <div className=" flex justify-between items-center">
          From
          {sort.sortByColumn === "period_from" && sort.sortBy === "DESC" && (
            <TiArrowSortedDown className=" text-xl" />
          )}
          {sort.sortByColumn === "period_from" && sort.sortBy === "ASC" && (
            <TiArrowSortedUp className=" text-xl" />
          )}
          {sort.sortByColumn !== "period_from" && (
            <FaSort className=" text-lg" />
          )}
        </div>
      ),
      titleOnClick: () => {
        sortHandler("period_from");
      },
      cellKey: "period_from",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
    {
      title: (
        <div className=" flex justify-between items-center">
          To
          {sort.sortByColumn === "period_to" && sort.sortBy === "DESC" && (
            <TiArrowSortedDown className=" text-xl" />
          )}
          {sort.sortByColumn === "period_to" && sort.sortBy === "ASC" && (
            <TiArrowSortedUp className=" text-xl" />
          )}
          {sort.sortByColumn !== "period_to" && <FaSort className=" text-lg" />}
        </div>
      ),
      titleOnClick: () => {
        sortHandler("period_to");
      },
      cellKey: "period_to",
      textAlign: "left",
      render: (value) => {
        return <div>{textDateFormat(value)}</div>;
      },
    },
    {
      title: "Hours",
      cellKey: "hours",
      textAlign: "left",
    },
  ];
  const { data, isLoading } = useFetch(
    "trainings-list",
    [
      "trainings-list",
      debounceSearch,
      page,
      dates.startDate,
      dates.endDate,
      sort.sortBy,
      sort.sortByColumn,
    ],
    `/api/trainings?search=${debounceSearch}&page=${page}&from=${dates.startDate}&to=${dates.endDate}&sortBy=${sort.sortBy}&sortByColumn=${sort.sortByColumn}`
  );

  const { data: archive, isLoading: archiveLoading } = useFetch(
    "trainings-list-archive",
    [
      "trainings-list-archive",
      debounceSearch,
      page,
      dates.startDate,
      dates.endDate,
      sort.sortBy,
      sort.sortByColumn,
    ],
    `/api/trainings/archive?search=${debounceSearch}&page=${page}&from=${dates.startDate}&to=${dates.endDate}&sortBy=${sort.sortBy}&sortByColumn=${sort.sortByColumn}`
  );

  const { setNotification } = useGlobalState();
  const queryClient = useQueryClient();
  const successRestore = () => {
    queryClient.invalidateQueries("trainings-list");
    queryClient.invalidateQueries("trainings-list-archive");
    setModal(false);
    setNotification(true, "success", `Position successfully restored!`);
  };
  const errorRestore = (error: any) => {
    setNotification(true, "error", "Something went wrong");
  };
  const restoreHandler = (id: any) => {
    restore(successRestore, errorRestore, `/api/trainings/restore/${id}`);
  };
  return (
    <>
      <PageTitle title={["Employee", "Training Records"]} />
      <Tab tab={isTab} setTab={setTab} tabMenu={["trainings", "archive"]} />
      <div className=" flex items-center flex-wrap gap-3 justify-between">
        <div className=" flex gap-5">
          <Search search={search} setSearch={setSearch} />
          <DateRangePicker dates={dates} setDate={setDates} />
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
        isLoading={isTab === "trainings" ? isLoading : archiveLoading}
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
          isTab === "trainings"
            ? data?.data?.data?.data
            : archive?.data?.data?.data
        }
        onClickRow={(data) => {
          if (isTab === "trainings") {
            setDefaultValue(data);
            setModal(true);
          }
        }}
        setPage={setPage}
        page={page}
        totalPage={
          isTab === "trainings"
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
        <TrainingForm setModal={setModal} defaultValues={defaultValue} />
      </Modal>
    </>
  );
}

export default TrainingPage;
