import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Category from "../../components/Category/Category";
import "./products.css";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import myAPI from "../../services/api";
import FetchAllProducts from "../../components/FetchAllProducts/FetchAllProducts";

// !! NEED TO ADD
// price
// searchbar

function ProductsListing() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    FetchAllProducts(setProducts, setFilteredProducts);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div className="products-list">
      <Category
        categories={[...new Set(products.map((product) => product.category))]}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />
      <h2 className="text-center">{selectedCategory}</h2>
      <p>{filteredProducts.length} products</p>
      <div className="products-list-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <div className="product-image">image</div>
              <div className="product-infos">
                <div className="product-text">
                  <h3>{product.title}</h3>
                  <p>{product.category}</p>
                </div>
                <div className="product-price-type">
                  <p>{product.price}</p>
                  <p>{product.type}</p>
                </div>
              </div>
            </Link>
            <div className="button-buy">
              <button onClick={() => handleAddToCart(product)}>Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsListing;
