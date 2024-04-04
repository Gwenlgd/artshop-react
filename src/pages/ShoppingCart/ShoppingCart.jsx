import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./ShoppingCart.css";

function ShoppingCart() {
  const { cartItems, removeFromCart, handleRemoveOne, handleAddOne } =
    useContext(CartContext);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  if (!cartItems || cartItems.length === 0)
    return (
      <div className="display-no-cart">
        <h3>No product in your shoppping cart</h3>
      </div>
    );

  function calculateDeliveryCost(quantity) {
    if (quantity <= 2) {
      return 10;
    }
    if (quantity <= 5) {
      return 25;
    }
    if (quantity <= 8) {
      return 58;
    }
    return 70;
  }

  const totalQuantity = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, product) => total + parseFloat(product.price) * product.quantity,
    0
  );

  const deliveryCost = calculateDeliveryCost(totalQuantity);

  const handlePay = () => {
    // Handle payment logic here
    // For demonstration purposes, let's set orderCompleted to true
    setOrderCompleted(true);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      navigate(`/thankyoupage`);
      resetCart();
    }, 2000);
  };

  const resetCart = () => {
    cartItems.forEach((product) => {
      cartItems.length = 0;
    });
    // cartItems.forEach((product) => {
    //   removeFromCart(product.id);
    // });
  };

  return (
    <div className="shopping-cart">
      <div className="display-cart">
        <h2> {totalQuantity === 1 ? "Your Item" : "Your Items"}</h2>
        <ul>
          {cartItems.map((product) => (
            <li key={product.id}>
              <div className="display-cart-view">
                <div className="display-image-cart">
                  <img src={product.image} alt="img" />
                </div>
                <div className="display-items-cart">
                  <div className="space">
                    <br />
                  </div>
                  <div className="product-infos-cart">
                    <h2>{product.title}</h2>
                    <h4>{product.category}</h4>
                    <p>{product.type}</p>
                    <p>{product.price}</p>
                  </div>
                  <div className="product-infos-cart-plus">
                    <p>{product.description.slice(0, 120) + "..."}</p>
                  </div>
                  <div className="buttons-quantity-cart">
                    <button onClick={() => handleRemoveOne(product.id)}>
                      -
                    </button>
                    <p>{product.quantity} </p>
                    <button onClick={() => handleAddOne(product.id)}>+</button>
                    {parseFloat(product.price) * parseInt(product.quantity)}€
                    <button onClick={() => removeFromCart(product.id)}>
                      Remove item
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </li>
          ))}
          <br />
        </ul>
      </div>
      <div className="display-tot">
        <h2>Your shopping Cart</h2>

        <div className="cart-total">
          <p>Total quantity: {totalQuantity} pieces </p>
          <strong>Sous-total:</strong> {totalPrice.toFixed(2)}€
          <p>Delivery: {deliveryCost}€</p>
          <p>
            <strong>Total Order:</strong>{" "}
            {(totalPrice + deliveryCost).toFixed(2)}€
          </p>
        </div>
        <div className="button-pay">
          <button onClick={handlePay}>Pay</button>
        </div>
      </div>
      {showMessage && (
        <div className="cart-message-shopping">
          Your order has been completed!
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
