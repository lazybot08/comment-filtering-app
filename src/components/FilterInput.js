import React from 'react';
import './FilterInput.css'; // Import your CSS file

function FilterInput({ postIdFilter, setPostIdFilter }) {
  return (
    <div className="filter-input">
      <input
        type="text"
        placeholder="Filter by Post Id"
        value={postIdFilter}
        onChange={(e) => setPostIdFilter(e.target.value)}
      />
    </div>
  );
}

export default FilterInput;
