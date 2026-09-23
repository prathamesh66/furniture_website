
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_APIBASEPATH;

// ==========================================
// MY ORDERS
// ==========================================

export const getMyOrders = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}user/myOrders`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_login")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("MY ORDERS API ERROR:", error);

    return {
      _status: false,
      _message: "Something went wrong",
      _data: [],
    };
  }
};


export const deleteMyOrder = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}user/myOrders/${id}`, {
      headers: { Authorization: `Bearer ${Cookies.get("user_login")}` },
    });
    return response.data;
  } catch (error) {
    console.log("DELETE ORDER API ERROR:", error);
    return { _status: false, _message: "Something went wrong" };
  }
};



export const getOrderDetails = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}user/myOrders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_login")}`,
        },
      }
    );

    console.log("ORDER DETAILS API RESPONSE:", response.data);

    return response.data;

  } catch (error) {

    console.log("ORDER DETAILS API ERROR:", error);

    return {
      _status: false,
      _message: "Something went wrong",
      _data: null,
    };
  }
};

