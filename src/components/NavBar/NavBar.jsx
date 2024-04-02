import { useState } from "react";
import { Link } from "react-router-dom";

// import logoHome from "../../assets/home.svg";
import logoCart from "../../assets/cart2.svg";
import nameSite from "../../assets/namesite3.svg";

import SearchBar from "../SearchBar/SearchBar";

import "./NavBar.css";
function NavBar() {
  const [products] = useState([]);
  const [setSearchResults] = useState([]);

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

        <Link to="/shoppingcart">
          <img src={logoCart} alt="Shopping Cart" />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
