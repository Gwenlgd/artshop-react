import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import myAPI from "../../services/api";
import "./ShoppingCart.css";

function ShoppingCart() {
  const {
    cartItems,
    removeFromCart,
    handleRemoveOne,
    handleAddOne,
    resetCart,
  } = useContext(CartContext);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  if (!cartItems || cartItems.length === 0)
    return (
      <div className="display-no-cart">
        <div className="no-cart-message">
          <h3>No product in your shoppping cart</h3>
        </div>
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
    if (quantity <= 15) {
      return 70;
    }
    return 120;
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

  const handlePay = async () => {
    for (const item of cartItems) {
      const { data } = await myAPI.get("/products/" + item.id);
      console.log(item, data);
      const newQuantity = Math.max(data.quantity - item.quantity, 0);
      const newItem = { ...item, quantity: newQuantity };

      await myAPI.put("/products/" + item.id, newItem);
    }

    setOrderCompleted(true);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      navigate(`/thankyoupage`);
      resetCart();
    }, 2000);
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
        <div className="delivery-prices">
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Delivery Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1-2 pieces</td>
                <td>${calculateDeliveryCost(2)}</td>
              </tr>
              <tr>
                <td>3-5 pieces</td>
                <td>${calculateDeliveryCost(5)}</td>
              </tr>
              <tr>
                <td>6-8 pieces</td>
                <td>${calculateDeliveryCost(8)}</td>
              </tr>
              <tr>
                <td>9-15 pieces</td>
                <td>${calculateDeliveryCost(15)}</td>
              </tr>
              <tr>
                <td>+ 16 than pieces</td>
                <td>${calculateDeliveryCost(16)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="cart-total">
          <h2>Total Order</h2>
          <table>
            <tbody>
              <tr>
                <td>Total quantity:</td>
                <td>
                  {totalQuantity} {totalQuantity === 1 ? "piece" : "pieces"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Sous-total:</strong>
                </td>
                <td>{totalPrice.toFixed(2)}€</td>
              </tr>
              <tr>
                <td>Delivery:</td>
                <td>{deliveryCost}€</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Order:</strong>
                </td>
                <td>{(totalPrice + deliveryCost).toFixed(2)}€</td>
              </tr>
            </tbody>
          </table>
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
