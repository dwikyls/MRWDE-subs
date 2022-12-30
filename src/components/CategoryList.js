import React from 'react';
import PropTypes from 'prop-types';

function CategoryList({ categories, onCategoryChange }) {
  return (
    <div className="category-list">
      {
        categories.map((category) => (
          <div
            role="button"
            key={category}
            tabIndex={0}
            className="category-item"
            aria-hidden
            onClick={() => { onCategoryChange(category); }}
            onKeyDown={() => { }}
          >
            #
            {category}
          </div>
        ))
      }
    </div>
  );
}

const categoryListShape = {
  categories: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

CategoryList.propTypes = {
  ...categoryListShape,
};

export default CategoryList;
