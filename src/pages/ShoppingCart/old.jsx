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
              <div className="display-cart-view">
                <div className="display-image-cart">
                  <img src={product.image} alt="img" />
                </div>
                <div className="display-items-cart">
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
              <br />
            </li>
          ))}
          <br />
          <hr />
          <div className="cart-total">
            <strong>Total:</strong> {totalPrice.toFixed(2)}€
          </div>
          <div className="button-pay">
            <button>Pay</button>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default ShoppingCart;
