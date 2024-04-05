const addToCartFromListing = (product) => {
  if (product.quantity <= 1) {
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
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
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
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
