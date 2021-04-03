import React, { useState, useEffect } from "react";
import fakeData from "../../fakeData";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import "./Shop.css";
import { Link } from "react-router-dom";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKey = Object.keys(saveCart);
    const previousCart = productKey.map((pdKey) => {
      const product = fakeData.find((pd) => pd.key === pdKey);
      product.quentity = saveCart[pdKey];
      return product;
    });
    setCart(previousCart);
  }, []);
  const handleAddProduct = (product) => {
    const addedProduct = product.key;
    // Same Product count on multiple time
    const sameProduct = cart.find((pd) => pd.key === addedProduct);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quentity + 1;
      sameProduct.quentity = count;
      const other = cart.filter((pd) => pd.key !== addedProduct);
      newCart = [...other, sameProduct];
    } else {
      product.quentity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    // Store in local Storage
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="twins-container">
      <div className="product-container">
        {products.map((pd) => (
          <Product
            showAddToCart={true}
            key={pd.key}
            handleAddProduct={handleAddProduct}
            product={pd}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="order-btn"> Review Order </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
