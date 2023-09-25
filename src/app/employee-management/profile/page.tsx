"use client";

import React from "react";

import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import Table, { TableColumnsType } from "@/components/Table";

function page() {
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
      <div className=" flex items-center flex-wrap gap-3 justify-between">
        <PageTitle>Profile</PageTitle>
        <Button appearance={"primary"}>ADD</Button>
      </div>
      <Table
        columns={columns}
        data={data}
        onClickRow={(data) => {
          alert(data);
        }}
      />
    </>
  );
}

export default page;
