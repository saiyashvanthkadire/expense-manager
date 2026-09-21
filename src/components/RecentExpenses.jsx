import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { getCategoryMeta } from '../utils/categories';

export const RecentExpenses = ({ expenses = [], onViewAll }) => {
  const recentList = [...expenses]
    .sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt).getTime();
      const dateB = new Date(b.date || b.createdAt).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  const handleScrollToExpenses = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      const el = document.getElementById('expense-list-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="overview-card recent-expenses-card">
      <div className="overview-card-header">
        <div className="overview-title-group">
          <Clock size={18} className="overview-header-icon" />
          <h2 className="overview-title">Recent Expenses</h2>
        </div>
      </div>

      {recentList.length === 0 ? (
        <div className="category-empty-state">
          <p className="category-empty-text">No recent transactions recorded.</p>
        </div>
      ) : (
        <div className="recent-list">
          {recentList.map((item) => {
            const meta = getCategoryMeta(item.category);
            return (
              <div key={item.id} className="recent-item">
                <div className="recent-item-left">
                  <div
                    className="recent-item-emoji"
                    style={{
                      backgroundColor: meta.bgColor,
                      borderColor: meta.borderColor
                    }}
                  >
                    {meta.emoji}
                  </div>
                  <div className="recent-item-info">
                    <span className="recent-item-title" title={item.title}>
                      {item.title}
                    </span>
                    <span className="recent-item-meta">
                      {meta.name} • {formatDate(item.date)}
                    </span>
                  </div>
                </div>
                <div className="recent-item-right">
                  <span className="recent-item-amount">{formatCurrency(item.amount)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {expenses.length > 0 && (
        <div className="recent-card-footer">
          <button
            type="button"
            className="btn-view-all"
            onClick={handleScrollToExpenses}
          >
            <span>View All Expenses</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
