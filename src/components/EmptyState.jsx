import React from 'react';
import { CreditCard, SearchX, PlusCircle, RotateCcw, Database } from 'lucide-react';

export const EmptyState = ({
  type = 'no-data',
  onAddExpense,
  onResetFilters,
  onLoadSampleData
}) => {
  if (type === 'no-search') {
    return (
      <div className="empty-state-container" role="status">
        <div className="empty-icon-circle search-empty">
          <SearchX size={38} className="empty-state-icon" />
        </div>
        <h3 className="empty-state-title">No matching expenses</h3>
        <p className="empty-state-desc">
          Try changing your search keywords or loosening your category and time filters.
        </p>
        {onResetFilters && (
          <button
            type="button"
            className="btn btn-secondary empty-state-btn"
            onClick={onResetFilters}
          >
            <RotateCcw size={15} />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="empty-state-container" role="status">
      <div className="empty-icon-circle">
        <CreditCard size={40} className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">No expenses yet</h3>
      <p className="empty-state-desc">
        Start tracking your daily spending by adding your first expense.
      </p>
      <div className="empty-state-actions">
        <button
          type="button"
          className="btn btn-primary empty-state-btn"
          onClick={onAddExpense}
        >
          <PlusCircle size={16} />
          <span>+ Add Expense</span>
        </button>
        {onLoadSampleData && (
          <button
            type="button"
            className="btn btn-secondary empty-state-btn"
            onClick={onLoadSampleData}
          >
            <Database size={15} />
            <span>Load Demo Data</span>
          </button>
        )}
      </div>
    </div>
  );
};
