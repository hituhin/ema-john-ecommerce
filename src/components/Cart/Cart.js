import React from "react";
import "./Cart.css";

const Cart = (props) => {
  const cart = props.cart;
  //console.log(cart);
  // const total = cart.reduce(
  //   (total, product) => total + product.price * product.quentity,
  //   0
  // );
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price * product.quentity;
  }
  let shipping = 0.0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12.99;
  }
  let tax = (total * 0.1).toFixed(2);

  return (
    <div>
      <h4>Order Summary</h4>
      <p>Items Ordered:{cart.length} </p>
      <p>
        <small>Shipping Cost:{shipping}</small>
      </p>
      <p>
        <small>Vat + Tax : {tax}</small>
      </p>
      <p>Total Price:{total + shipping + parseInt(tax)}</p>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
