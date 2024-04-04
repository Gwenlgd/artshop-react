import React from "react";
import "./Category.css";

function Category({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="container-categories">
      <div className="category-tabs">
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
      </div>
    </div>
  );
}

export default Category;
