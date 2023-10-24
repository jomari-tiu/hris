"use client";

import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

import { useFetch } from "@/util/api";

function TopHabitualLateComers() {
  const [type, setType] = useState("specific date");
  const [from, setFrom] = useState("");
  const [end, setEnd] = useState("");
  const { data, isLoading } = useFetch(
    "top-habitual-latecomers",
    ["top-habitual-latecomers", type, from, end],
    `/api/top-habitual-latecomers?frequency=${
      type === "specific date" ? "" : type
    }&start_date=${from}&end_date=${end}`
  );
  return (
    <div className=" space-y-5 flex flex-col items-start h-full">
      <h5 className="inline-block font-bold text-red-2 relative after:content-[''] after:absolute after:w-full after:bottom-0 after:left-0 after:h-[2px] after:bg-yellow-400">
        Top Habitual Latecomers
      </h5>
      <ul className=" flex items-center justify-between gap-3 w-full">
        <li>
          <select
            className=" capitalize"
            defaultValue={"specific date"}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="yearly">yearly</option>
            <option value="specific date">specific date</option>
          </select>
        </li>
        {type === "specific date" && (
          <li className=" flex items-center gap-2">
            <input type="date" onChange={(e) => setFrom(e.target.value)} />
            <AiOutlineArrowRight className=" text-red-2" />
            <input type="date" onChange={(e) => setEnd(e.target.value)} />
          </li>
        )}
      </ul>
      <div className="max-h-[400px] overflow-auto w-full">
        <table className=" w-full font-medium">
          <tbody>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>{" "}
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
            <tr>
              <td>Johnson, Macey A.</td>
              <td>ACAD</td>
              <td>1hr 19mins</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopHabitualLateComers;
