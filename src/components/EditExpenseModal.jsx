import React, { useState, useEffect, useRef } from 'react';
import { Edit3, X, AlertCircle, Calendar, Tag, IndianRupee, Type, Save } from 'lucide-react';
import { CATEGORIES } from '../utils/categories';
import { getTodayDateString } from '../utils/formatters';

export const EditExpenseModal = ({ isOpen, expense, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const titleInputRef = useRef(null);

  useEffect(() => {
    if (expense && isOpen) {
      setTitle(expense.title || '');
      setAmount(expense.amount !== undefined ? expense.amount.toString() : '');
      setCategory(expense.category || 'Food');
      setDate(expense.date || getTodayDateString());
      setErrors({});
      setTouched({});

      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 80);

      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [expense, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Expense title cannot be empty.';
    } else if (title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters.';
    }

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount)) {
      newErrors.amount = 'Please enter a valid amount.';
    } else if (numAmount <= 0) {
      newErrors.amount = 'Amount must be greater than 0.';
    }

    if (!category) {
      newErrors.category = 'Please select a category.';
    }

    if (!date) {
      newErrors.date = 'Please select a valid date.';
    }

    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate();
    setErrors(currentErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      title: true,
      amount: true,
      category: true,
      date: true
    });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const updatedExpense = {
      ...expense,
      title: title.trim(),
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      category,
      date
    };

    onSave(updatedExpense);
    onClose();
  };

  if (!isOpen || !expense) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
    >
      <div className="modal-card">
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-icon-badge edit-badge">
              <Edit3 size={20} />
            </div>
            <div>
              <h2 id="edit-modal-title" className="modal-title">
                Edit Expense
              </h2>
              <p className="modal-subtitle">Modify details and update records</p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close edit dialog"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="expense-form" noValidate>
          <div className="form-group">
            <label htmlFor="edit-expense-title" className="form-label">
              <Type size={15} />
              <span>Expense Title</span>
              <span className="required-mark">*</span>
            </label>
            <input
              id="edit-expense-title"
              ref={titleInputRef}
              type="text"
              className={`form-input ${touched.title && errors.title ? 'input-error' : ''}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => handleBlur('title')}
              maxLength={80}
              required
            />
            {touched.title && errors.title && (
              <p className="form-error-msg">
                <AlertCircle size={14} />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit-expense-amount" className="form-label">
              <IndianRupee size={15} />
              <span>Amount (₹)</span>
              <span className="required-mark">*</span>
            </label>
            <div className="currency-input-wrapper">
              <span className="currency-symbol">₹</span>
              <input
                id="edit-expense-amount"
                type="number"
                step="any"
                min="1"
                className={`form-input currency-input ${
                  touched.amount && errors.amount ? 'input-error' : ''
                }`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onBlur={() => handleBlur('amount')}
                required
              />
            </div>
            {touched.amount && errors.amount && (
              <p className="form-error-msg">
                <AlertCircle size={14} />
                <span>{errors.amount}</span>
              </p>
            )}
          </div>

          <div className="form-row-2col">
            <div className="form-group">
              <label htmlFor="edit-expense-category" className="form-label">
                <Tag size={15} />
                <span>Category</span>
                <span className="required-mark">*</span>
              </label>
              <select
                id="edit-expense-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onBlur={() => handleBlur('category')}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
              {touched.category && errors.category && (
                <p className="form-error-msg">
                  <AlertCircle size={14} />
                  <span>{errors.category}</span>
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="edit-expense-date" className="form-label">
                <Calendar size={15} />
                <span>Date</span>
                <span className="required-mark">*</span>
              </label>
              <input
                id="edit-expense-date"
                type="date"
                className={`form-input ${touched.date && errors.date ? 'input-error' : ''}`}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onBlur={() => handleBlur('date')}
                max={getTodayDateString()}
                required
              />
              {touched.date && errors.date && (
                <p className="form-error-msg">
                  <AlertCircle size={14} />
                  <span>{errors.date}</span>
                </p>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
