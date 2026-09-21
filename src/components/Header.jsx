import React from 'react';
import { Wallet, PlusCircle, Database, Sun, Moon } from 'lucide-react';

export const Header = ({
  onOpenAddModal,
  onLoadSampleData,
  hasExpenses,
  theme = 'dark',
  onToggleTheme
}) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <div className="header-logo-icon" aria-hidden="true">
            <Wallet size={24} />
          </div>
          <div className="header-titles">
            <div className="header-title-row">
              <h1 className="header-title">
                <span className="title-full">Personal Expense Manager</span>
                <span className="title-mobile">Expense Manager</span>
              </h1>
              <span className="live-badge" title="Live LocalStorage Synchronization Active">
                <span className="live-dot" />
                Live
              </span>
            </div>
            <p className="header-subtitle">Track your spending and manage your finances with clarity.</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="btn-theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {!hasExpenses && (
            <button
              type="button"
              className="btn btn-secondary btn-sample"
              onClick={onLoadSampleData}
              title="Load demo transactions to explore features"
            >
              <Database size={15} />
              <span>Load Demo Data</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary btn-add-expense"
            onClick={onOpenAddModal}
            id="header-add-btn"
          >
            <PlusCircle size={18} />
            <span>+ Add Expense</span>
          </button>
        </div>
      </div>
    </header>
  );
};
