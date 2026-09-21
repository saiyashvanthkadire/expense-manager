import React, { useEffect, useRef } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export const DeleteConfirmation = ({ isOpen, expense, onClose, onConfirm }) => {
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        confirmBtnRef.current?.focus();
      }, 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !expense) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
    >
      <div className="modal-card modal-delete-card">
        <div className="delete-modal-icon-wrapper" aria-hidden="true">
          <div className="delete-icon-circle">
            <Trash2 size={26} className="delete-trash-icon" />
          </div>
        </div>

        <div className="delete-modal-content">
          <h2 id="delete-dialog-title" className="delete-modal-title">
            Delete Expense?
          </h2>
          <p id="delete-dialog-desc" className="delete-modal-desc">
            Are you sure you want to delete this expense? This action cannot be undone.
          </p>

          <div className="delete-target-preview">
            <div className="target-preview-header">
              <span className="target-preview-title">{expense.title}</span>
              <span className="target-preview-amount">{formatCurrency(expense.amount)}</span>
            </div>
            <div className="target-preview-meta">
              <span className="target-preview-badge">{expense.category}</span>
              <span className="target-preview-date">{formatDate(expense.date)}</span>
            </div>
          </div>
        </div>

        <div className="modal-actions delete-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            ref={confirmBtnRef}
            className="btn btn-danger"
            onClick={() => onConfirm(expense.id)}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

