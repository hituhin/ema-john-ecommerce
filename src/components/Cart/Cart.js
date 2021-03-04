import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total , product)=>total +product.price, 0);
    let shipping = 0.00;
           if(total >35){
              shipping = 0;
           }
            else if(total>15){
            shipping = 4.99; 
            }else if(total >0){
                shipping = 12.99
            }
    let tax = (total*.1).toFixed(2);
   
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered:{cart.length} </p>
            <p><small>Shipping Cost:{shipping}</small></p>
            <p><small>Vat + Tax : {tax}</small></p>
            <p>Total Price:{total + shipping + parseInt(tax)}</p>
        </div>
    );
};

export default Cart;