
// This is also we used 

// import axios from "axios"

// let getProducts=()=> {
//   return axios.get("https://dummyjson.com/products")
//   .then((res)=>res.data)
//   .then((finalRes)=> {
//     return finalRes
//   })
// }

// export { getProducts };


// this is also we used

const axios = require("axios");

let getProducts=()=> {
  return axios.get("https://dummyjson.com/products")
  .then((res)=>res.data)
  .then((finalRes)=> {
    return finalRes
  })
}

let getProductsDetails = (id) => {
  return axios
    .get(`https://dummyjson.com/products/${id}`)
    .then((res) => res.data)
    .then((finalRes) => {
      return finalRes;
    });
};


module.exports = { getProducts, getProductsDetails };