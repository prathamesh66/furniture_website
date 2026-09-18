import React from 'react'
import Productlist from '../components/product-server/ProductList';
import { getProducts } from '@/app/api-services/productApiService';

const  Product_Server = async () => {

 let data = await getProducts()

//  console.log("This is the Product Server Data All",data)

  return (
    <section>
      <Productlist data={data}/>
    </section>
  )
}

export default Product_Server;
