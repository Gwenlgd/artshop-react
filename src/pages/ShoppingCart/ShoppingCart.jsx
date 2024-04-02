import React, { useContext } from "react";
import { CartContext } from "./CartContext";

function ShoppingCart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((product) => (
          <li key={product.id}>
            {product.title} - {product.price}
            <button onClick={() => removeFromCart(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;
