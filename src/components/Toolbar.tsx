// Toolbar.tsx
import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProductId,
  setSearchTerm,
  setSortBy,
} from "../store/productsReducer"; // adjust the path
import { RootState } from "../store/store"; // adjust if needed

const Toolbar: React.FC = () => {
  const dispatch = useDispatch();
  const { sortBy, sortOptions, searchTerm } = useSelector(
    (state: RootState) => state.products
  );

  // Trigger a "blank" selection for new product
  const handleAddClick = () => {
    // We can set selectedProductId = null, 
    // then in ProductDetails we check if it's null => new product
    dispatch(setSelectedProductId(null));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // The slice expects 'name' | 'creationDate'
    dispatch(setSortBy(e.target.value as "name" | "creationDate"));
  };

  return (
    <div className="toolbar">
      <button onClick={handleAddClick}>+ Add</button>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginLeft: "8px" }}
      />
      <select value={sortBy} onChange={handleSortChange} style={{ marginLeft: "8px" }}>
        {sortOptions.map((option) => (
          <option key={option} value={option}>
            Sort by {option === "name" ? "Name" : "Date"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Toolbar;