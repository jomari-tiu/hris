import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Bar, Pie } from "react-chartjs-2";

import { IoIosMenu } from "react-icons/io";

import { useReactToPrint } from "react-to-print";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type PropsType = {
  chartData: {
    labels: string[];
    datasets: {
      id: number[];
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  type: "bar" | "pie";
  options: any;
  chartName: string;
};

const ChartComponent = ({ chartData, type, options, chartName }: PropsType) => {
  const [menu, setMenu] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    setData(chartData);
  }, [chartData]);

  const chartRef: any = useRef(null);

  const printRef: any = useRef(null);

  const downloadChartHandler = (name: string, fileType: string) => {
    if (fileType === "pdf") {
      downloadAsPDF();
      return;
    }
    const link = document.createElement("a");
    link.download = `${name}.${fileType}`;
    link.href = chartRef.current?.toBase64Image();
    link.click();
  };

  const plugins: any = [ChartDataLabels];

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const downloadAsPDF = () => {
    const chartContainer: any = document.getElementById(chartName);
    html2canvas(chartContainer, { logging: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf: any = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save(`${chartName}.pdf`);
    });
  };

  return (
    <div className=" flex flex-col w-full h-full">
      <div className=" w-full flex justify-end relative">
        <button
          className=" hover:bg-gray-100 duration-150"
          onClick={() => setMenu(!menu)}
        >
          <IoIosMenu />
        </button>
        {menu && (
          <ul className=" absolute top-[110%] right-0 bg-white-0 z-10 shadow-lg">
            <li
              className=" p-2 hover:bg-gray-100 duration-150 cursor-pointer"
              onClick={() => setFullScreen(!fullScreen)}
            >
              View in full screen
            </li>
            <li
              className=" p-2 pb-3 border-b hover:bg-gray-100 duration-150  cursor-pointer"
              onClick={handlePrint}
            >
              Print chart
            </li>
            <li
              className=" p-2  pt-3 hover:bg-gray-100 duration-150  cursor-pointer"
              onClick={() => downloadChartHandler(chartName, "png")}
            >
              Download PNG image
            </li>
            <li
              className=" p-2 hover:bg-gray-100 duration-150  cursor-pointer"
              onClick={() => downloadChartHandler(chartName, "jpg")}
            >
              Downlaod JPEG image
            </li>
            <li
              className=" p-2 hover:bg-gray-100 duration-150  cursor-pointer"
              onClick={(e) => downloadChartHandler(chartName, "pdf")}
            >
              Download PDF document
            </li>
            {/* <li
              className=" p-2 hover:bg-gray-100 duration-150  cursor-pointer"
              onClick={() => downloadChartHandler(chartName, "svg")}
            >
              Download SVG vector image
            </li>
            <li
              className=" p-2 hover:bg-gray-100 duration-150  cursor-pointer"
              onClick={() => downloadChartHandler(chartName, "csv")}
            >
              Download CSV
            </li> */}
          </ul>
        )}
      </div>

      <div className=" flex-1 h-full w-full " id={chartName}>
        {type === "bar" && (
          <div className=" w-full print:w-11/12">
            <Bar
              ref={chartRef}
              data={data}
              options={options}
              plugins={plugins}
            />
          </div>
        )}
        {type === "pie" && (
          <div className=" flex w-full items-center justify-center">
            <div className=" w-11/12 max-w-[20rem]">
              <Pie
                ref={chartRef}
                data={data}
                options={options}
                plugins={plugins}
              />
            </div>
          </div>
        )}
      </div>

      {fullScreen && (
        <section className="fixed top-0 left-0 bg-[#00000074] z-50 h-full w-full flex justify-center items-center">
          <div className=" w-10/12 h-[90%] bg-white-0 p-5 rounded-lg div2PDF relative">
            <button
              onClick={() => setFullScreen(!fullScreen)}
              className=" mb-5 absolute top-2 right-2 bg-ccgreen4 hover:bg-ccgreen2 duration-150 flex justify-center items-center rounded-full"
            >
              Close
            </button>

            {type === "bar" && (
              <Bar
                ref={chartRef}
                data={data}
                options={options}
                plugins={plugins}
              />
            )}

            {type === "pie" && (
              <div className=" flex h-full w-full items-center justify-center">
                <div className=" 1024px:w-10/12 w-[40rem] aspect-square">
                  <Pie
                    ref={chartRef}
                    data={data}
                    options={options}
                    plugins={plugins}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <section
        ref={printRef}
        className="flex flex-col items-center z-[-99] fixed top-0 left-0 w-full h-full bg-white-0  p-10"
      >
        <h4 className=" font-medium capitalize text-center mb-5">
          {chartName.replaceAll("-", " ")}
        </h4>
        {type === "bar" && (
          <div ref={printRef} className=" w-[50rem]">
            <Bar
              ref={chartRef}
              data={data}
              options={options}
              plugins={plugins}
            />
          </div>
        )}
        {type === "pie" && (
          <div className="w-[30rem]" ref={printRef}>
            <Pie
              ref={chartRef}
              data={data}
              options={options}
              plugins={plugins}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default ChartComponent;
