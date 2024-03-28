import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FetchAllProducts from "../FetchAllProducts/FetchAllProducts";

import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // useRef : create this reference
  const searchContainerRef = useRef(null);

  useEffect(() => {
    FetchAllProducts(setProducts, setFilteredProducts);
  }, []);

  // useEffect for removing dropdown searchbar if user want to do something else
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setQuery("");
        setFilteredProducts([]);
      }
    }

    function handleScroll() {
      setQuery("");
      setFilteredProducts([]);
    }
    // add others event?
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChange = (event) => {
    setQuery(event.target.value);
    filterProducts(event.target.value);
  };

  const filterProducts = (query) => {
    console.log(query);
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
        {/* Render the search results dropdown */}
        {query && filteredProducts.length > 0 && (
          <ul className="search-results">
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <Link to={`/product/${product.id}`}>
                  {/* ?? show picture? */}
                  {product.title} - {product.description.slice(0, 50) + "..."}
                </Link>{" "}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
