import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // const removeFromCart = (productToRemove) => {
  //   const updatedCartItems = cartItems.filter(
  //     (product) => product.id !== productToRemove.id
  //   );
  //   setCartItems(updatedCartItems);
  // };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(
      (product) => product.id !== productId
    );
    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// export default CartContext;
export { CartProvider, CartContext };
