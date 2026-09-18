import { getProductsDetails } from '@/app/api-services/productApiService'
import React from 'react'
import SingleDetails from '../../components/product-server/SingleDetails'

const Product_Server_ProductDetails = async ({params}) => {

    let {id} = await params

    let data = await getProductsDetails(id)

    // console.log("This is the ProductServerData Single",data)

  return ( 
    <div>
      {data && <SingleDetails data={data} />}
  </div>
  )
   
} 

export default Product_Server_ProductDetails;
