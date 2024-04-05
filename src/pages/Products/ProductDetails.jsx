import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../ShoppingCart/CartContext";

// !! NEED TO CHECK THE ADD QUANTITY, doesn't update on shopping card

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { addToCartFromDetails } = useContext(CartContext);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchOneProduct(id) {
    try {
      const { data } = await axios.get(
        "https://projet-mana.adaptable.app/products/" + id
        // "https://pro-mana.adaptable.app/products/" + id
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

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= product.quantity
    ) {
      setQuantity(newQuantity);
      setErrorMessage(""); // Clear any previous error message
    } else {
      setErrorMessage(
        "Invalid quantity. Please enter a valid quantity within the available stock."
      );
    }
  };

  const handleAddToCart = (product) => {
    if (quantity < 1 || !product) {
      return;
    }
    const productWithQuantity = { ...product, quantity };
    addToCartFromDetails(productWithQuantity);
    console.log("Product added to cart:", productWithQuantity);
  };

  if (!product) return <p>No product</p>;

  return (
    <div className="product-details-page">
      <Link className="arrow-link" to="/">
        Back
      </Link>
      <div className="product-details-container">
        <div className="one-product-image">
          <img src={product.image} alt="img" />
        </div>
        <div className="product-infos-one-pro">
          <div className="product-text-one-pro">
            <h2>{product.title}</h2>
            <h3>COLLECTION: "{product.category}"</h3>
            <p>TYPE: {product.type}</p>
            <p className="descr-one-pro">{product.description}</p>
            <p>{product.price}</p>
            <p>
              Available: {product.quantity}{" "}
              {product.quantity === 1 ? "piece" : "pieces"}
            </p>
            <div className="buy-product-details">
              <div className="quantity-input">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  // disabled={product.quantity === 0}
                  // onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <div className="button-buy">
                <button onClick={() => handleAddToCart(product)}>Buy</button>
              </div>
            </div>
          </div>
          <div className="message-error">
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
