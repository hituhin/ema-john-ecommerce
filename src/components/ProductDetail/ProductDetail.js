import React from "react";
import { useParams } from "react-router";
import fakeData from "../../fakeData/index";
import Product from "../Product/Product";

const ProductDetail = () => {
  let { Productkey } = useParams();
  const product = fakeData.find((pd) => pd.key === Productkey);
  console.log(product);
  return (
    <div>
      <h1>Here is your product Details</h1>
      <h3>{Productkey} your Product detaile Comming soon !</h3>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
