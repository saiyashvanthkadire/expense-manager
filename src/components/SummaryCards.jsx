import React from 'react';
import { IndianRupee, Calendar, Receipt, TrendingUp, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const SummaryCards = ({
  totalSpending = 0,
  monthlySpending = 0,
  transactionCount = 0,
  highestExpense = 0,
  currentMonthName = ''
}) => {
  const cards = [
    {
      id: 'total',
      label: 'TOTAL SPENDING',
      value: formatCurrency(totalSpending),
      subtitle: `${transactionCount} ${transactionCount === 1 ? 'transaction' : 'transactions'} tracked`,
      icon: <IndianRupee size={20} className="summary-icon primary" />,
      accentClass: 'accent-primary'
    },
    {
      id: 'month',
      label: 'THIS MONTH',
      value: formatCurrency(monthlySpending),
      subtitle: currentMonthName ? `Spent in ${currentMonthName}` : 'Current month spending',
      icon: <Calendar size={20} className="summary-icon info" />,
      accentClass: 'accent-info'
    },
    {
      id: 'transactions',
      label: 'TRANSACTIONS',
      value: transactionCount.toString(),
      subtitle: 'Recorded entries',
      icon: <Receipt size={20} className="summary-icon success" />,
      accentClass: 'accent-success'
    },
    {
      id: 'highest',
      label: 'HIGHEST EXPENSE',
      value: formatCurrency(highestExpense),
      subtitle: highestExpense > 0 ? 'Single highest purchase' : 'No expenses yet',
      icon: <TrendingUp size={20} className="summary-icon warning" />,
      accentClass: 'accent-warning'
    }
  ];

  return (
    <section className="summary-cards-grid" aria-label="Financial Summary">
      {cards.map((card) => (
        <div key={card.id} className={`summary-card ${card.accentClass}`}>
          <div className="summary-card-header">
            <span className="summary-card-label">{card.label}</span>
            <div className="summary-icon-wrapper" aria-hidden="true">
              {card.icon}
            </div>
          </div>
          <div className="summary-card-body">
            <div className="summary-card-value">{card.value}</div>
            <div className="summary-card-sub">{card.subtitle}</div>
          </div>
        </div>
      ))}
    </section>
  );
};
