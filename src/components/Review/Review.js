import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData/index";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import happyImage from "../../images/giphy.gif";

const Review = () => {
  const [cart, setcart] = useState([]);
  const [orderPlaced, setorderPlaced] = useState(false);
  const handlePlaceOrder = () => {
    setcart([]);
    setorderPlaced(true);
    processOrder();
  };
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

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt="" />;
  }

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
        {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handlePlaceOrder} className="order-btn">
            Place Order
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
