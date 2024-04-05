import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FetchAllProducts from "../FetchProducts/FetchAllProducts";
import "./SearchBar.css";

//!! check this : https://dev.to/aneeqakhan/throttling-and-debouncing-explained-1ocb
// wait for the user to stop typing in order to start the query

// function SearchBar({ onSearch }) {
function SearchBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // useRef : create an area as a reference
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
      // Worked, when clicked outside and scroll
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
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
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.price.toLowerCase().includes(query.toLowerCase()) ||
        product.type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // onSearch(query);
  };

  // REMOVE DROPDOWN WHEN USER CLICK ON THE PRODUCT
  function handleClickOnProduct() {
    setQuery("");
    setFilteredProducts([]);
    const event = new Event("clickProduct");
    document.dispatchEvent(event);
  }

  return (
    <form
      ref={searchContainerRef}
      className="search-bar-part"
      onSubmit={handleSubmit}
    >
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
        {query && filteredProducts.length > 0 && (
          <ul className="search-results">
            {filteredProducts.map((product) => (
              <li key={product.id} onClick={handleClickOnProduct}>
                <Link to={`/product/${product.id}`}>
                  {/* ?? show picture in small? */}
                  <div className="search-result-display">
                    <div className="search-img">
                      {" "}
                      <img src={product.image} alt="img" />
                    </div>
                    <div className="search-text">
                      <strong>{product.title}</strong>{" "}
                      {product.description.slice(0, 120) + "..."}
                    </div>
                  </div>
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
