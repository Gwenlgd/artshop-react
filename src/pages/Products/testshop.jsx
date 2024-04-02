// ProductsListing.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Category from "../../components/Category/Category";
import "./products.css";
import CartContext from "../../CartContext";
import FetchAllProducts from "../../components/FetchAllProducts/FetchAllProducts";

function ProductsListing() {
  const { addToCart } = useContext(CartContext);

  // Your existing component code here

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log("Product added to cart:", product);
  };

  // Your existing JSX code here
}

export default ProductsListing;
