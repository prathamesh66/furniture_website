import React from "react";
import NewSingleDetails from "../../components/newProduct-server/NewSingleDetails";
import { getProductsDetails } from "@/app/api-services/newProductApiService";

const ProductDetails = async ({ params }) => {
  const { id } = await params;

  const data = await getProductsDetails(id);

  return <div>{data && <NewSingleDetails data={data} />}</div>;
};

export default ProductDetails;
