import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Category from "../../components/Category/Category";
import "./products.css";

// !! NEED TO ADD
// price
// searchbar

function ProductsListing() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  async function fetchAllProducts() {
    try {
      const { data } = await axios.get(
        "https://pro-mana.adaptable.app/products"
      );
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllProducts();
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

  return (
    <div className="products-list">
      <Category
        categories={[
          "",
          ...new Set(products.map((product) => product.category)),
        ]}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />
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
                <div className="product-price">1000€</div>{" "}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsListing;
