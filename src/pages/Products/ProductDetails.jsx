import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

// Display image, description, price, availability
// Possibility to add to the shopping cart
function ProductDetails() {
  const [product, setProduct] = useState(null);
  const params = useParams();

  async function fetchOneProduct(id) {
    try {
      const { data } = await axios.get(
        "https://pro-mana.adaptable.app/products/" + id
      );
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOneProduct(params.productId);
  }, [params.productId]);

  if (!product) return <p>No product</p>;

  return (
    <div className="product-details-page">
      <Link to="/">Back</Link>
      <div className="product-details-container">
        <div className="one-product-image">image</div>
        <div className="product-infos">
          <div className="product-text">
            <h2>{product.title}</h2>
            <h3>{product.category}</h3>
            <p>{product.description}</p>
            <div className="product-price">1000€</div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
