"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Breadcrumb from "../common/Breadcrumb";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    users: 0,
    products: 0,
    categories: 0,
    orders: 0,
  });

  const [loading, setLoading] = useState(true);

  const getDashboardData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/dashboard/",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("admin_login")}`,
          },
        },
      );

      console.log("DASHBOARD RESPONSE:", response.data);

      if (response.data._status) {
        setDashboardData(response.data.dashboardData);
      }
    } catch (error) {
      console.log("DASHBOARD ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const dashboardCards = [
    {
      id: 1,
      h3: loading ? "..." : dashboardData.users,
      text: "Users",
      bg: "#5956D3",
    },
    {
      id: 2,
      h3: loading ? "..." : dashboardData.products,
      text: "Products",
      bg: "#2998FE",
    },
    {
      id: 3,
      h3: loading ? "..." : dashboardData.categories,
      text: "Categories",
      bg: "#FCB01E",
    },
    {
      id: 4,
      h3: loading ? "..." : dashboardData.orders,
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

        <div className="p-5 grid grid-cols-4 gap-5">
          {dashboardCards.map((value) => (
            <DashboardComponents key={value.id} value={value} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Dashboard;

function DashboardComponents({ value }) {
  const { h3, text, bg } = value;

  return (
    <div
      className="h-[200px] p-3 rounded-lg text-white"
      style={{ backgroundColor: bg }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[25px] font-semibold">{h3}</h3>

        <BiDotsVerticalRounded />
      </div>

      <div>
        <h2 className="text-[22px] font-semibold mt-2">{text}</h2>
      </div>
    </div>
  );
}
