import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";

function Category({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="container-categories admin">
      <div className="category-tabs admin">
        {/* Tab for all products */}
        <div
          className={selectedCategory === "" ? "active" : ""}
          onClick={() => onSelectCategory("")}
        >
          All
        </div>
        {/* Tabs for categories */}
        {categories.map((category, index) => (
          <div
            key={index}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </div>
        ))}
        <div className="sidebar admin">
          <ul>
            <li>
              <Link to={"/admin/addproduct"}> Add a new product</Link>
            </li>
            {/* <li>
              <h3>test</h3>
            </li>
            <li>
              <h3>test</h3>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Category;
