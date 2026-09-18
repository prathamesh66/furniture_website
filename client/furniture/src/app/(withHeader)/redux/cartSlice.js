import { createSlice } from "@reduxjs/toolkit";

const getCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("CART");

    return cart ? JSON.parse(cart) : [];
  }

  return [];
};

export let cartSlice = createSlice({
  name: "cart",

  initialState: {
    cart: getCartFromLocalStorage(),
  },

  reducers: {
    // Add To Cart
    addToCart: (state, req) => {
      let cartObj = req.payload;

      let existingProduct = state.cart.find((item) => item.id === cartObj.id);

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

      localStorage.setItem("CART", JSON.stringify(state.cart));
    },

    // Delete Cart
    deleteCart: (state, req) => {
      let id = req.payload;

      state.cart = state.cart.filter((obj) => obj.id !== id);

      localStorage.setItem("CART", JSON.stringify(state.cart));
    },

    // Change Quantity
    changeQty: (state, req) => {
      let { id, type } = req.payload;

      let product = state.cart.find((obj) => obj.id === id);

      if (!product) return;

      if (type === "plus") {
        product.qty += 1;
      }

      if (type === "minus" && product.qty > 1) {
        product.qty -= 1;
      }

      localStorage.setItem("CART", JSON.stringify(state.cart));
    },
  },
});

export let { addToCart, deleteCart, changeQty } = cartSlice.actions;

export default cartSlice.reducer;
