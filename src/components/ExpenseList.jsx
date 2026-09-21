import React from 'react';
import { ExpenseItem } from './ExpenseItem';
import { EmptyState } from './EmptyState';
import { Layers } from 'lucide-react';

export const ExpenseList = ({
  expenses,
  totalExpenseCount,
  onEdit,
  onDelete,
  onOpenAddExpense,
  onResetFilters,
  onLoadSampleData,
  hasActiveFilters
}) => {
  if (totalExpenseCount === 0) {
    return (
      <div className="expense-list-card" id="expense-list-section">
        <div className="expense-list-header">
          <div className="list-title-group">
            <Layers size={18} className="list-header-icon" />
            <h2 className="expense-list-title">All Expenses</h2>
          </div>
        </div>
        <EmptyState
          type="no-data"
          onAddExpense={onOpenAddExpense}
          onLoadSampleData={onLoadSampleData}
        />
      </div>
    );
  }

  if (expenses.length === 0 && hasActiveFilters) {
    return (
      <div className="expense-list-card" id="expense-list-section">
        <div className="expense-list-header">
          <div className="list-title-group">
            <Layers size={18} className="list-header-icon" />
            <h2 className="expense-list-title">All Expenses</h2>
          </div>
          <span className="count-badge">0 results</span>
        </div>
        <EmptyState
          type="no-search"
          onResetFilters={onResetFilters}
        />
      </div>
    );
  }

  return (
    <div className="expense-list-card" id="expense-list-section">
      <div className="expense-list-header">
        <div className="list-title-group">
          <Layers size={18} className="list-header-icon" />
          <h2 className="expense-list-title">Expenses</h2>
          <span className="count-badge">
            {expenses.length === totalExpenseCount
              ? `${expenses.length} total`
              : `${expenses.length} of ${totalExpenseCount}`}
          </span>
        </div>
      </div>

      <div className="expense-table-container">
        <table className="expense-table">
          <thead>
            <tr>
              <th scope="col" className="th-title">Expense</th>
              <th scope="col" className="th-category">Category</th>
              <th scope="col" className="th-date">Date</th>
              <th scope="col" className="th-amount">Amount</th>
              <th scope="col" className="th-actions">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="expense-mobile-list">
        {expenses.map((expense) => (
          <ExpenseItem
            key={`mobile-${expense.id}`}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
