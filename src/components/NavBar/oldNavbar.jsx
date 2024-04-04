import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// import logoHome from "../../assets/home.svg";
import logoCart from "../../assets/cart2.svg";
import nameSite from "../../assets/namesite3.svg";
import SearchBar from "../SearchBar/SearchBar";
import { CartContext } from "../../pages/ShoppingCart/CartContext";
import Category from "../Category/Category";
import "./NavBar.css";

function NavBar() {
  const [products] = useState([]);
  const [setSearchResults] = useState([]);
  const { cartItemCount } = useContext(CartContext);
  const [itemAdded, setItemAdded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (query) => {
    // setSearchQuery(query);
    // !! check to add more filters
    const results = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  useEffect(() => {
    if (cartItemCount > 0) {
      // Set the state to trigger the animation
      setItemAdded(true);
      // Reset the state after a short delay to allow the animation to complete
      setTimeout(() => {
        setItemAdded(false);
      }, 300); // Adjust the delay to match the animation duration
    }
  }, [cartItemCount]);

  return (
    <div className="navbar">
      {/* <Link to="/">
        <img src={logoHome} alt="Logo Home" />
      </Link> */}
      <Link to="/">
        <div className="namesite">
          <img src={nameSite} alt="name" />
        </div>
      </Link>
      {/* find another classname or other way */}
      <div className="right-part">
        <div className="search-bar">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* don't need? */}
        {/* <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <Link to={`/product/${result.id}`}>{result.title}</Link>
            </li>
          ))}
        </ul> */}

        <div className="cart-container">
          <Link to="/shoppingcart">
            <img src={logoCart} alt="Shopping Cart" />
            {cartItemCount > 0 && (
              <span
                className={
                  itemAdded ? "cart-item-count item-added" : "cart-item-count"
                }
              >
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
