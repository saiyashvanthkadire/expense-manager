import React, { useMemo } from 'react';
import { PieChart, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { getCategoryMeta } from '../utils/categories';

export const CategoryChart = ({ expenses = [] }) => {
  const { categoryData, totalSpent } = useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return { categoryData: [], totalSpent: 0 };
    }

    const total = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    const map = {};
    expenses.forEach((item) => {
      const cat = item.category || 'Other';
      map[cat] = (map[cat] || 0) + (Number(item.amount) || 0);
    });

    const list = Object.entries(map)
      .map(([catName, amount]) => {
        const meta = getCategoryMeta(catName);
        const percentage = total > 0 ? Math.round((amount / total) * 100) : 0;
        return {
          id: catName,
          name: catName,
          amount,
          percentage,
          meta
        };
      })
      .sort((a, b) => b.amount - a.amount);

    return { categoryData: list, totalSpent: total };
  }, [expenses]);

  return (
    <div className="overview-card">
      <div className="overview-card-header">
        <div className="overview-title-group">
          <PieChart size={18} className="overview-header-icon" />
          <h2 className="overview-title">Spending by Category</h2>
        </div>
        {totalSpent > 0 && (
          <span className="overview-total-badge">{formatCurrency(totalSpent)}</span>
        )}
      </div>

      {categoryData.length === 0 ? (
        <div className="category-empty-state">
          <p className="category-empty-text">No category spending data yet.</p>
        </div>
      ) : (
        <div className="category-bars-list">
          {categoryData.map((item) => (
            <div key={item.id} className="category-bar-item">
              <div className="category-bar-label-row">
                <div className="category-name-group">
                  <span className="category-item-emoji">{item.meta.emoji}</span>
                  <span className="category-item-name">{item.name}</span>
                </div>
                <div className="category-amount-group">
                  <span className="category-percentage-text">{item.percentage}%</span>
                  <span className="category-amount-text">{formatCurrency(item.amount)}</span>
                </div>
              </div>

              <div
                className="progress-track"
                role="progressbar"
                aria-valuenow={item.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                title={`${item.name}: ${item.percentage}%`}
              >
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.max(item.percentage, 2)}%`,
                    background: item.meta.gradient || item.meta.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
