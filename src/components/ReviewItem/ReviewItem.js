import React from "react";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  //console.log(props);
  const { name, quentity, key, price } = props.product;
  return (
    <div className="review-items">
      <h4 className="product-name">Product Name:{name}</h4>
      <p>Quentity: {quentity}</p>
      <p>
        <small>{price}</small>
      </p>
      <br />
      <button
        className="main-btn"
        onClick={() => props.handleRemoveProduct(key)}
      >
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
