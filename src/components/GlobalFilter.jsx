import React from 'react';
import '../App.css';
import { FiSearch } from 'react-icons/fi';

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <header className="header">
      <FiSearch size={18} style={{ color: '#555' }} />
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
