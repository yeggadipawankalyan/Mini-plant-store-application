import React from 'react';
import { PLANT_CATEGORIES } from '../constants';

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="form-select"
      aria-label="Filter by category"
    >
      <option value="all">All Categories</option>
      {PLANT_CATEGORIES.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
