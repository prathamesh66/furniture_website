// "use client";

// import React from "react";
// import { Provider } from "react-redux";
// import { store } from "../../redux/reduxStore";
// import { ToastContainer } from "react-toastify";

// const CommonLayout = ({ children }) => {
//   return (
//     <>
//       <Provider store={store}>
//         <ToastContainer />
//         {children}
//       </Provider>
//     </>
//   );
// };

// export default CommonLayout;




"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/reduxStore";
import { setCart } from "../../redux/cartSlice";
import { ToastContainer } from "react-toastify";

const CommonLayout = ({ children }) => {
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("CART");

    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);

        store.dispatch(setCart(cartData));
      } catch (error) {
        console.log("Cart LocalStorage Error:", error);

        store.dispatch(setCart([]));
      }
    }

    setCartLoaded(true);
  }, []);

  return (
    <>
      <Provider store={store}>
        <ToastContainer />

        {cartLoaded && children}
      </Provider>
    </>
  );
};

export default CommonLayout;
;
