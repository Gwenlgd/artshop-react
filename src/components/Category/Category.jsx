// import React from "react";
// import PropTypes from "prop-types";

function Category({ categories, selectedCategory, onSelectCategory }) {
  // console.log(categories);
  return (
    <div>
      <label htmlFor="category">Filter by category:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

// Use PropTypes.objectOf() for simpler validation
// Category.propTypes = {
//   categories: PropTypes.arrayOf(PropTypes.string).isRequired,
//   selectedCategory: PropTypes.string.isRequired,
//   onSelectCategory: PropTypes.func.isRequired,
// };

export default Category;
