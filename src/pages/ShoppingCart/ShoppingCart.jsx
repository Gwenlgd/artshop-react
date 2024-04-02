import React from "react";

// Summary of items added to the cart
// allowing users to adjust quantities, remove items, proceed to checkout
// display price of each product (depending of quantity) + total price
function ShoppingCart({ cartItems }) {
  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.title} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ShoppingCart;
