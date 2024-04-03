// const addToCart = (product) => {
//   const existingProductIndex = cartItems.findIndex(
//     (item) => item.id === product.id
//   );
//   if (existingProductIndex !== -1) {
//     const updatedCartItems = [...cartItems];
//     updatedCartItems[existingProductIndex].quantity += 1;
//     setCartItems(updatedCartItems);
//   } else {
//     setCartItems([...cartItems, { ...product, quantity: 1 }]);
//   }
// };
const addToCart = (product, fromProductListingPage) => {
  if (fromProductListingPage) {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  } else {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += product.quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product }]);
    }
  }
};
// const addToCart = (product) => {
//   if (product.quantity < 1) {
//     console.error("Quantity must be at least 1.");
//     return;
//   }

//   const existingProductIndex = cartItems.findIndex(
//     (item) => item.id === product.id
//   );

//   if (existingProductIndex !== -1) {
//     const updatedCartItems = [...cartItems];
//     updatedCartItems[existingProductIndex].quantity += product.quantity;
//     setCartItems(updatedCartItems);
//   } else {
//     setCartItems([...cartItems, { ...product }]);
//   }
// };
