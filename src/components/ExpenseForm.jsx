import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, X, AlertCircle, Calendar, Tag, IndianRupee, Type } from 'lucide-react';
import { CATEGORIES } from '../utils/categories';
import { getTodayDateString } from '../utils/formatters';

export const ExpenseForm = ({ isOpen, onClose, onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(getTodayDateString());
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const titleInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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

  const handleClose = () => {
    setTitle('');
    setAmount('');
    setCategory('Food');
    setDate(getTodayDateString());
    setErrors({});
    setTouched({});
    onClose();
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

    const newExpense = {
      id: 'exp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: title.trim(),
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      category,
      date,
      createdAt: new Date().toISOString()
    };

    onAddExpense(newExpense);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-expense-modal-title"
    >
      <div className="modal-card" ref={modalRef}>
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-icon-badge">
              <PlusCircle size={20} />
            </div>
            <div>
              <h2 id="add-expense-modal-title" className="modal-title">
                Add New Expense
              </h2>
              <p className="modal-subtitle">Log your spending with date, category and amount</p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-button"
            onClick={handleClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="expense-form" noValidate>
          <div className="form-group">
            <label htmlFor="expense-title" className="form-label">
              <Type size={15} />
              <span>Expense Title</span>
              <span className="required-mark">*</span>
            </label>
            <input
              id="expense-title"
              ref={titleInputRef}
              type="text"
              className={`form-input ${touched.title && errors.title ? 'input-error' : ''}`}
              placeholder="e.g., Grocery Shopping, Uber ride"
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
            <label htmlFor="expense-amount" className="form-label">
              <IndianRupee size={15} />
              <span>Amount (₹)</span>
              <span className="required-mark">*</span>
            </label>
            <div className="currency-input-wrapper">
              <span className="currency-symbol">₹</span>
              <input
                id="expense-amount"
                type="number"
                step="any"
                min="1"
                className={`form-input currency-input ${
                  touched.amount && errors.amount ? 'input-error' : ''
                }`}
                placeholder="0.00"
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
              <label htmlFor="expense-category" className="form-label">
                <Tag size={15} />
                <span>Category</span>
                <span className="required-mark">*</span>
              </label>
              <select
                id="expense-category"
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
              <label htmlFor="expense-date" className="form-label">
                <Calendar size={15} />
                <span>Date</span>
                <span className="required-mark">*</span>
              </label>
              <input
                id="expense-date"
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
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-submit-expense"
            >
              <PlusCircle size={16} />
              <span>+ Add Expense</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
