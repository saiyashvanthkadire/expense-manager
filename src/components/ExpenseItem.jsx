import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { getCategoryMeta } from '../utils/categories';

export const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const categoryMeta = getCategoryMeta(expense.category);

  return (
    <>
      <tr className="expense-table-row">
        <td className="cell-title">
          <div className="title-with-icon">
            <span
              className="category-emoji-badge"
              style={{
                backgroundColor: categoryMeta.bgColor,
                borderColor: categoryMeta.borderColor
              }}
              title={categoryMeta.name}
            >
              {categoryMeta.emoji}
            </span>
            <span className="expense-title-text" title={expense.title}>
              {expense.title}
            </span>
          </div>
        </td>

        <td className="cell-category">
          <span
            className="category-badge"
            style={{
              backgroundColor: categoryMeta.bgColor,
              color: categoryMeta.color,
              borderColor: categoryMeta.borderColor
            }}
          >
            {categoryMeta.name}
          </span>
        </td>

        <td className="cell-date">
          <span className="expense-date-text">{formatDate(expense.date)}</span>
        </td>

        <td className="cell-amount">
          <span className="expense-amount-text">{formatCurrency(expense.amount)}</span>
        </td>

        <td className="cell-actions">
          <div className="action-buttons-group">
            <button
              type="button"
              className="action-btn edit-btn"
              onClick={() => onEdit(expense)}
              aria-label={`Edit ${expense.title}`}
              title="Edit expense"
            >
              <Edit2 size={16} />
            </button>
            <button
              type="button"
              className="action-btn delete-btn"
              onClick={() => onDelete(expense)}
              aria-label={`Delete ${expense.title}`}
              title="Delete expense"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>

      <div className="expense-mobile-card">
        <div className="mobile-card-header">
          <div className="mobile-card-title-group">
            <span
              className="category-emoji-badge"
              style={{
                backgroundColor: categoryMeta.bgColor,
                borderColor: categoryMeta.borderColor
              }}
            >
              {categoryMeta.emoji}
            </span>
            <div>
              <h3 className="mobile-card-title">{expense.title}</h3>
              <span
                className="category-badge mobile-badge"
                style={{
                  backgroundColor: categoryMeta.bgColor,
                  color: categoryMeta.color,
                  borderColor: categoryMeta.borderColor
                }}
              >
                {categoryMeta.name}
              </span>
            </div>
          </div>
        </div>

        <div className="mobile-card-body">
          <div className="mobile-card-meta">
            <span className="mobile-date">{formatDate(expense.date)}</span>
          </div>
        </div>

        <div className="mobile-card-footer">
          <span className="mobile-amount">{formatCurrency(expense.amount)}</span>
          <div className="action-buttons-group">
            <button
              type="button"
              className="action-btn edit-btn"
              onClick={() => onEdit(expense)}
              aria-label={`Edit ${expense.title}`}
            >
              <Edit2 size={16} />
            </button>
            <button
              type="button"
              className="action-btn delete-btn"
              onClick={() => onDelete(expense)}
              aria-label={`Delete ${expense.title}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
