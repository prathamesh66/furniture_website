const axios = require("axios");

const API_BASE_URL = process.env.NEXT_PUBLIC_APIBASEPATH;

// Featured Products
const getFeaturedProducts = () => {
  return axios.get(`${API_BASE_URL}product/featured`).then((res) => res.data);
};

// New Arrivals
const getNewArrivalProducts = () => {
  return axios
    .get(`${API_BASE_URL}product/new-arrivals`)
    .then((res) => res.data);
};

// On Sale
const getOnSaleProducts = () => {
  return axios.get(`${API_BASE_URL}product/on-sale`).then((res) => res.data);
};

// Best Selling Products
const getBestSellingProducts = () => {
  return axios
    .get(`${API_BASE_URL}product/best-selling`)
    .then((res) => res.data);
};



const getProductsDetails = async (id) => {
  const url = `${API_BASE_URL}product/productDetails/${id}`;

  console.log("API BASE URL:", API_BASE_URL);
  console.log("PRODUCT ID:", id);
  console.log("DETAIL API URL:", url);

  const res = await axios.get(url);

  return res.data;
};




module.exports = {
  getFeaturedProducts,
  getNewArrivalProducts,
  getOnSaleProducts,
  getProductsDetails,
  getBestSellingProducts,
};
