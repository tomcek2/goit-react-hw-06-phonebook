import React from 'react';
import css from './Filter.module.css';

export const Filter = ({ filter, onFilterChange }) => {
  const handleChange = e => {
    onFilterChange(e.target.value);
    console.log(e.target.value);
  };

  return (
    <label className={css.filterLabel}>
      Find contacts by name:
      <input
        className={css.filterInput}
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Search by name..."
      />
    </label>
  );
};
