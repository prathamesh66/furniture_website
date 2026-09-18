"use client"

import Breadcrumb from "../common/Breadcrumb";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Dashboard = () => {

  // let pageTitle = "Dashboard";

  const dashboardData = [
    {
      id: 1,
      h3: "26K",
      span: "(-12.4% ↓)",
      text: "Users",
      bg: "#5956D3",
    },
    {
      id: 2,
      h3: "$6,200",
      span: "(40.9% ↑)",
      text: "Product",
      bg: "#2998FE",
    },
    {
      id: 3,
      h3: "2.49%",
      span: "(84.7% ↑)",
      text: "Category",
      bg: "#FCB01E",
    },
    {
      id: 4,
      h3: "44K",
      span: "(-23.6% ↓)",
      text: "Orders",
      bg: "#E95353",
    },
  ];

  return (
    <>
      <section className="w-full">
        <div>
          <Breadcrumb path={"Dashboard"} link={"/dashboard"} />
        </div>

        <div className="p-5 grid grid-cols-3 gap-5">
          {dashboardData.map((value, index) => {
            return (
              <>
                <DashboardComponents key={index} value={value} />
              </>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Dashboard


function DashboardComponents({ value }) {

  let {h3, span, text, bg} = value

  return (
    <>
      <div
        className="h-[200px] p-3 rounded-lg text-white"
        style={{ backgroundColor: bg }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[25px] font-semibold"> {h3} </h3>
            <span className="text-[20px] font-semibold">{span}</span>
          </div>

          <div>
            <BiDotsVerticalRounded />
          </div>
        </div>

        <div>
          <h2 className="text-[22px] font-semibold mt-2">{text}</h2>
        </div>
      </div>
    </>
  );
}