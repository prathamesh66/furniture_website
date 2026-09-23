// import { createSlice } from "@reduxjs/toolkit";

// const getCartFromLocalStorage = () => {
//   if (typeof window !== "undefined") {
//     const cart = localStorage.getItem("CART");

//     return cart ? JSON.parse(cart) : [];
//   }

//   return [];
// };

// export let cartSlice = createSlice({
//   name: "cart",

//   initialState: {
//     cart: getCartFromLocalStorage(),
//   },

//   reducers: {
//     // Add To Cart
//     addToCart: (state, req) => {
//       let cartObj = req.payload;

//       let existingProduct = state.cart.find((item) => item._id === cartObj._id);

//       if (existingProduct) {
//         existingProduct.qty += 1;
//       } else {
//         state.cart = [
//           ...state.cart,
//           {
//             ...cartObj,
//             qty: 1,
//           },
//         ];
//       }

//       localStorage.setItem("CART", JSON.stringify(state.cart));
//     },

//     // Delete Cart
//     deleteCart: (state, req) => {
//       let id = req.payload;

//       state.cart = state.cart.filter((obj) => obj._id !== id);

//       localStorage.setItem("CART", JSON.stringify(state.cart));
//     },

//     // Change Quantity
//     changeQty: (state, req) => {
//       let { id, type } = req.payload;

//       let product = state.cart.find((obj) => obj._id === id);

//       if (!product) return;

//       if (type === "plus") {
//         product.qty += 1;
//       }

//       if (type === "minus" && product.qty > 1) {
//         product.qty -= 1;
//       }

//       localStorage.setItem("CART", JSON.stringify(state.cart));
//     },
//   },
// });

// export let { addToCart, deleteCart, changeQty } = cartSlice.actions;

// export default cartSlice.reducer;






import { createSlice } from "@reduxjs/toolkit";

export let cartSlice = createSlice({
  name: "cart",

  initialState: {
    cart: [],
  },

  reducers: {
    // Add To Cart
    addToCart: (state, req) => {
      let cartObj = req.payload;

      let existingProduct = state.cart.find(
        (item) => item._id === cartObj._id
      );

      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        state.cart = [
          ...state.cart,
          {
            ...cartObj,
            qty: 1,
          },
        ];
      }

      localStorage.setItem(
        "CART",
        JSON.stringify(state.cart)
      );
    },

    // Delete Cart
    deleteCart: (state, req) => {
      let id = req.payload;

      state.cart = state.cart.filter(
        (obj) => obj._id !== id
      );

      localStorage.setItem(
        "CART",
        JSON.stringify(state.cart)
      );
    },

    // Change Quantity
    changeQty: (state, req) => {
      let { id, type } = req.payload;

      let product = state.cart.find(
        (obj) => obj._id === id
      );

      if (!product) return;

      if (type === "plus") {
        product.qty += 1;
      }

      if (type === "minus" && product.qty > 1) {
        product.qty -= 1;
      }

      localStorage.setItem(
        "CART",
        JSON.stringify(state.cart)
      );
    },

    // Load Cart From LocalStorage
    setCart: (state, req) => {
      state.cart = req.payload;
    },
  },
});

export let {
  addToCart,
  deleteCart,
  changeQty,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
;
