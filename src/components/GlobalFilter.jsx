import React from 'react';
import '../App.css';

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <header className="header">
      <input
        className="searchBar"
        type="search"
        placeholder="Search here..."
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </header>
  );
};

export default GlobalFilter;
