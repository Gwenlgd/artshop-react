import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "./ShoppingCart.css";

function ShoppingCart() {
  const { cartItems, removeFromCart, handleRemoveOne, handleAddOne } =
    useContext(CartContext);

  if (!cartItems || cartItems.length === 0)
    return (
      <div className="display-no-cart">
        <h3>No product in your shoppping cart</h3>
      </div>
    );

  const totalPrice = cartItems.reduce(
    (total, product) => total + parseFloat(product.price) * product.quantity,
    0
  );

  return (
    <div className="shopping-cart">
      <h2>Your shopping Cart</h2>
      <div className="display-cart">
        <ul>
          {cartItems.map((product) => (
            <li key={product.id}>
              <br />
              <div className="display-items-cart">
                {product.title} - {product.quantity} -{" "}
                {parseFloat(product.price) * parseInt(product.quantity)}€
              </div>
              <div className="buttons-quantity-cart">
                <button onClick={() => handleAddOne(product.id)}>+</button>
                <button onClick={() => handleRemoveOne(product.id)}>-</button>
                <button onClick={() => removeFromCart(product.id)}>
                  Remove All
                </button>
              </div>
              <br />
            </li>
          ))}
          <br />
          <div className="cart-total">
            <strong>Total:</strong> {totalPrice.toFixed(2)}€
          </div>
        </ul>
      </div>
    </div>
  );
}

export default ShoppingCart;
