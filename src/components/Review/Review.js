import React, { useEffect, useState } from "react";
import { getDatabaseCart } from "../../utilities/databaseManager";
import fakeData from "../../fakeData/index";

const Review = () => {
  const [Cart, setCart] = useState([]);
  useEffect(() => {
    //  Get cart data from local Storage
    const saveCart = getDatabaseCart();
    const productsKey = Object.keys(saveCart);
    // Match get keys with database products keys
    const productCart = productsKey.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      // Set this keys value thats means (how many value of this key have) in quentity parameter
      product.quentity = saveCart[key];
      return product;
    });
    setCart(productCart);
  }, []);

  return (
    <div>
      <h4>Cart Items:{Cart.length}</h4>
    </div>
  );
};

export default Review;
