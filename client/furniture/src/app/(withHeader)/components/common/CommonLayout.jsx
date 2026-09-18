"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../redux/reduxStore';
import { ToastContainer } from 'react-toastify';

const CommonLayout = ({children}) => {
  return (
    <>
      <Provider store={store}>

      <ToastContainer/>

        {children}
         
      </Provider>
    </>
  );
};

export default CommonLayout;
