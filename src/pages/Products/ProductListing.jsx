import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Category from "../../components/Category/Category";
import "./products.css";
import FetchAllProducts from "../../components/FetchProducts/FetchAllProducts";
import { CartContext } from "../ShoppingCart/CartContext";

function ProductsListing() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const { addToCartFromListing } = useContext(CartContext);

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

  const handleAddToCartFromListing = (product) => {
    addToCartFromListing(product);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div className="products-list">
      <div className="container-category-list">
        <Category
          categories={[...new Set(products.map((product) => product.category))]}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          isTabs={false} // Render as dropdown select in the ProductsListing component
        />
      </div>
      <div className="main-products-container">
        <h2 className="text-center">
          {selectedCategory === "" ? "All paintings" : selectedCategory}
        </h2>
        <p>{filteredProducts.length} products available</p>
        <div className="products-list-container">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card-list">
              <Link to={`/product/${product.id}`}>
                <div className="product-image-list">
                  <img
                    src={product.image}
                    alt="img"
                    style={{
                      filter: `saturate(${product.quantity ? 1 : 0})`,
                    }}
                  />
                  <div className="product-infos-list">
                    <div className="product-text-list">
                      <h3>{product.title}</h3>
                      <p>{product.category}</p>
                      {/* </div>
                <div className="product-price-type-list"> */}
                      <p>{product.price}</p>
                      <p>{product.type}</p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="button-buy-list">
                <button onClick={() => handleAddToCartFromListing(product)}>
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showMessage && (
        <div className="cart-message">Painting added to cart!</div>
      )}
    </div>
  );
}

export default ProductsListing;
