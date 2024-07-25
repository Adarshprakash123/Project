import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search issue..." />
      <button className="search-button">🔍</button>
    </div>
  );
};

export default SearchBar;
