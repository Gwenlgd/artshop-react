import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "../../components/Category/Category";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const navigate = useNavigate();

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

  const handleUpdateProduct = (productId) => {
    console.log("Update product with ID:", productId);
    navigate(`/update/${productId}`);

    setTimeout(() => {
      setDeleteMessage("");
    }, 1000);
  };

  const handleDeleteProduct = (productId) => {
    const filteredProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(filteredProducts);
    toast.success("Product has been deleted successfully.", {
      autoClose: 3000,
    }); // Show success toast
  };

  return (
    <div>
      <h1>Hey Admin, welcome back to your dashboard</h1>
      <p>{deleteMessage}</p>
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
              <button onClick={() => handleUpdateProduct(product.id)}>
                Update
              </button>
              <button onClick={() => handleDeleteProduct(product.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
