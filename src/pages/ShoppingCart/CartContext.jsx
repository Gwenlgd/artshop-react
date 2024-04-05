import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.parse(cart);
    } else return [];
  });

  const addToCartFromListing = (product) => {
    if (product.quantity <= 1) {
      alert("Quantity must be greater than 1 to add to cart");
      return;
    }

    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += 1;
      setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cartItems, { ...product, quantity: 1 }])
      );
    }
  };

  const addToCartFromDetails = (product) => {
    if (product.quantity <= 1) {
      alert("Quantity must be greater than 1 to add to cart");
      return;
    }
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += product.quantity;
      setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    } else {
      setCartItems([...cartItems, { ...product }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cartItems, { ...product }])
      );
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(
      (product) => product.id !== productId
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveOne = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const handleAddOne = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  function resetCart() {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        removeFromCart,
        handleRemoveOne,
        handleAddOne,
        cartItemCount,
        addToCartFromDetails,
        addToCartFromListing,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// export default CartContext;
export { CartProvider, CartContext };
