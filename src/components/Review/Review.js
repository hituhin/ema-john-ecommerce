import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData/index";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";

const Review = () => {
  const [cart, setcart] = useState([]);

  const handleRemoveProduct = (productkey) => {
    // Set new products after removing a product
    const newcart = cart.filter((pd) => pd.key !== productkey);
    setcart(newcart);
    // Remove Product from database Also.
    removeFromDatabaseCart(productkey);
  };
  useEffect(() => {
    //  Get cart data from local Storage
    const saveCart = getDatabaseCart();
    //console.log(saveCart);
    const productsKey = Object.keys(saveCart);
    // Match get keys with database products keys
    const productCart = productsKey.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      // Set this keys value thats means (how many value of this key have) in quentity parameter
      product.quentity = saveCart[key];
      return product;
    });
    setcart(productCart);
  }, []);

  return (
    <div className="twins-container">
      <h4>Cart Items:{cart.length}</h4>
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            product={pd}
            key={pd.key}
            handleRemoveProduct={handleRemoveProduct}
          ></ReviewItem>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button className="order-btn">Place Order</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
