import React from "react";

import NewProductList from "../components/newProduct-server/NewProductList";
import { getFeaturedProducts, getNewArrivalProducts, getOnSaleProducts } from "@/app/api-services/newProductApiService";

const ProductServer = async () => {
  const featured = await getFeaturedProducts();
  const newArrivals = await getNewArrivalProducts();
  const onSale = await getOnSaleProducts();

  return (
    <section>
      <NewProductList
        featured={featured}
        newArrivals={newArrivals}
        onSale={onSale}
      />
    </section>
  );
};

export default ProductServer;
