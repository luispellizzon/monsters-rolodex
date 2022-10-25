import React from "react";

function SearchBox({ value, onChange }) {
  return (
    <div className="search-box">
      <input
        type="text"
        onChange={onChange}
        value={value}
        className="search-box-input"
      />
    </div>
  );
}

export default SearchBox;
