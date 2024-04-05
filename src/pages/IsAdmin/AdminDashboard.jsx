import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Category from "../../components/Category/Category";
import "./admin.css";
import myAPI from "../../services/api";
import FetchAllProducts from "../../components/FetchProducts/FetchAllProducts";

// ADD statistic ? total views, visits, orders, revenues
// number of likes for each product?
function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/admin/addproduct");
  };

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

  const handleUpdateProduct = (productId) => {
    console.log("Update product with ID:", productId);
    navigate(`/admin/update/${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    myAPI
      .delete(`/products/${productId}`)
      .then((response) => {
        if (response.status === 200) {
          const filteredProducts = products.filter(
            (product) => product.id !== productId
          );
          setProducts(filteredProducts);
          setDeleteMessage("Product has been deleted successfully");

          setTimeout(() => {
            setDeleteMessage("");
          }, 3000);
        } else {
          // Handle error if the delete request was not successful
          console.error("Failed to delete product");
        }
      })
      .catch((error) => {
        // Handle error if the delete request fails
        console.error("Error deleting product:", error);
      });
  };

  if (!products) return <p>Loading..</p>;
  return (
    <div>
      <div className="products-list">
        <div className="container-category-admin">
          <Category
            categories={[
              ...new Set(products.map((product) => product.category)),
            ]}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>
        <div className="main-products-container-admin">
          <div className="welcome-message-button-add">
            <h1>Hey Admin, welcome back to your dashboard</h1>
            {deleteMessage && <p>{deleteMessage}</p>}
            <br />
            {/* <button onClick={handleAddProduct}>Add Product</button> */}
            <br />
          </div>
          <h2 className="text-center">
            {" "}
            {selectedCategory === "" ? "All paintings" : selectedCategory}
          </h2>
          <p>{filteredProducts.length} products</p>
          <div className="products-list-container-admin">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`}>
                  <div className="product-image">
                    <img src={product.image} alt="img" />
                  </div>
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
                <div className="button-up-del">
                  <button onClick={() => handleUpdateProduct(product.id)}>
                    Update
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
