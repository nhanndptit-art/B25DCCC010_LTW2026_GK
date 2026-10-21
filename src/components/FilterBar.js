import React from 'react';

const FilterBar = ({ searchTerm, onSearchChange, statusFilter, onStatusChange }) => {
  return (
    <div className="filter-bar">
      <div>
        <label htmlFor="search-input">Tìm kiếm </label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="status-select">Tình trạng </label>
        <select
          id="status-select"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Còn chỗ">Còn chỗ</option>
          <option value="Đã đầy">Đã đầy</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;