import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

function UpdateProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    type: "",
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(
          `https://pro-mana.adaptable.app/products/${productId}`
        );
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProduct();
  }, [productId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `https://projet-mana.adaptable.app/products/${productId}`,
        // `https://pro-mana.adaptable.app/products/${productId}`,
        product
      );
      navigate("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container-update-product-page">
      <h2>Update Product</h2>
      <div className="container-update-product">
        <form onSubmit={handleSubmit}>
          <div className="container-form-inputs">
            <div className="form-left">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleInputChange}
              />
              <label>Category:</label>
              <select
                name="category"
                id="category"
                value={product.category}
                onChange={handleInputChange}
              >
                <option disabled value="-1">
                  -- Modify a category --
                </option>
                <option value="Dreamy Pastels">Dreamy Pastels</option>
                <option value="Vintage Countryside">Vintage Countryside</option>
                <option value="Ocean Therapy">Ocean Therapy</option>
                <option value="Alpine Majesty">Alpine Majesty</option>
                <option value="Riverside Reverie">Riverside Reverie</option>
              </select>
              <label>Description:</label>
              <input
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-right">
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
              <label>Quantity:</label>
              <input
                type="text"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
              />
              <label>Type:</label>
              <input
                type="text"
                name="type"
                value={product.type}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-button">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
      <Link className="arrow-link" to="/admin">
        Back
      </Link>
    </div>
  );
}

export default UpdateProduct;
