import React from 'react';
import { Search, Filter, Calendar, ArrowUpDown, X } from 'lucide-react';
import { CATEGORIES } from '../utils/categories';

export const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDateFilter,
  onDateFilterChange,
  sortOption,
  onSortChange,
  onResetFilters,
  hasActiveFilters
}) => {
  const dateOptions = [
    { id: 'all', label: 'All Time' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' }
  ];

  const sortOptions = [
    { id: 'newest', label: 'Newest First' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'highest', label: 'Highest Amount' },
    { id: 'lowest', label: 'Lowest Amount' }
  ];

  return (
    <div className="search-filter-card">
      <div className="search-filter-top-row">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} aria-hidden="true" />
          <input
            type="text"
            className="search-input"
            placeholder="Search expenses by title..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search expenses by title"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search input"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-dropdown-wrapper">
          <Filter className="filter-icon" size={16} aria-hidden="true" />
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-dropdown-wrapper">
          <ArrowUpDown className="filter-icon" size={16} aria-hidden="true" />
          <select
            className="filter-select"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort expenses by"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="search-filter-bottom-row">
        <div className="date-filter-group" role="radiogroup" aria-label="Date Filter">
          <span className="date-filter-label">
            <Calendar size={14} aria-hidden="true" />
            <span>Time Range:</span>
          </span>
          <div className="date-filter-pills">
            {dateOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={selectedDateFilter === opt.id}
                className={`date-pill-btn ${selectedDateFilter === opt.id ? 'active' : ''}`}
                onClick={() => onDateFilterChange(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn-reset-filters"
            onClick={onResetFilters}
            aria-label="Reset all search and filters"
          >
            <X size={14} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
