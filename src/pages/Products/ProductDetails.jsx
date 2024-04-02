import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../ShoppingCart/CartContext";

// Display image, description, price, availability
// Possibility to add to the shopping cart
function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { addToCart } = useContext(CartContext);

  async function fetchOneProduct(id) {
    try {
      const { data } = await axios.get(
        "https://pro-mana.adaptable.app/products/" + id
      );
      // console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOneProduct(params.productId);
  }, [params.productId]);

  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);
    console.log("Product added to cart:", productWithQuantity);
  };

  if (!product) return <p>No product</p>;

  return (
    <div className="product-details-page">
      <Link className="arrow-link" to="/">
        Back
      </Link>
      <div className="product-details-container">
        <div className="one-product-image">image</div>
        <div className="product-infos">
          <div className="product-text">
            <h2>{product.title}</h2>
            <h3>{product.category}</h3>
            <p>{product.type}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>
              Available: {product.quantity}{" "}
              {product.quantity === 1 ? "piece" : "pieces"}
            </p>
          </div>
        </div>
      </div>
      <div className="quantity-input">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="button-buy">
        <button onClick={() => handleAddToCart(product)}>Buy</button>
      </div>
    </div>
  );
}

export default ProductDetails;
