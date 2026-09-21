import React, { useMemo } from 'react';
import { SummaryCards } from './SummaryCards';
import { SearchFilter } from './SearchFilter';
import { ExpenseList } from './ExpenseList';
import { CategoryChart } from './CategoryChart';
import { RecentExpenses } from './RecentExpenses';
import { Sparkles, Download, ArrowUpRight, Flame } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { getCategoryMeta } from '../utils/categories';

export const Dashboard = ({
  expenses,
  filteredExpenses,
  totalSpending,
  monthlySpending,
  transactionCount,
  highestExpense,
  currentMonthName,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDateFilter,
  onDateFilterChange,
  sortOption,
  onSortChange,
  onResetFilters,
  hasActiveFilters,
  onEdit,
  onDelete,
  onOpenAddExpense,
  onLoadSampleData,
  onExportCSV
}) => {
  const { topCategory, dailyAverage } = useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return { topCategory: null, dailyAverage: 0 };
    }

    const map = {};
    expenses.forEach((item) => {
      const cat = item.category || 'Other';
      map[cat] = (map[cat] || 0) + (Number(item.amount) || 0);
    });

    let highestCat = null;
    let maxSpent = 0;
    Object.entries(map).forEach(([cat, amt]) => {
      if (amt > maxSpent) {
        maxSpent = amt;
        highestCat = cat;
      }
    });

    const total = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const topPct = total > 0 ? Math.round((maxSpent / total) * 100) : 0;
    const meta = highestCat ? getCategoryMeta(highestCat) : null;

    const daysElapsed = Math.max(1, new Date().getDate());
    const avg = monthlySpending > 0 ? Math.round(monthlySpending / daysElapsed) : 0;

    return {
      topCategory: meta ? { ...meta, amount: maxSpent, percentage: topPct } : null,
      dailyAverage: avg
    };
  }, [expenses, monthlySpending]);

  return (
    <main className="dashboard-container">
      <SummaryCards
        totalSpending={totalSpending}
        monthlySpending={monthlySpending}
        transactionCount={transactionCount}
        highestExpense={highestExpense}
        currentMonthName={currentMonthName}
      />

      {expenses.length > 0 && (
        <section className="financial-insights-banner" aria-label="Smart Financial Insights">
          <div className="insights-banner-left">
            <div className="insights-label-group">
              <Sparkles size={18} className="insights-sparkle-icon" />
              <span className="insights-title">Smart Insights:</span>
            </div>

            <div className="insights-chips-group">
              {topCategory && (
                <div className="insight-chip">
                  <span>Top Category:</span>
                  <span className="insight-chip-highlight">
                    {topCategory.emoji} {topCategory.name}
                  </span>
                  <span className="insight-badge-glow">{topCategory.percentage}% of total</span>
                </div>
              )}

              {dailyAverage > 0 && (
                <div className="insight-chip">
                  <Flame size={14} className="insights-sparkle-icon" />
                  <span>Daily Avg:</span>
                  <span className="insight-chip-highlight">
                    {formatCurrency(dailyAverage)}/day
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="insights-banner-right">
            <button
              type="button"
              className="btn btn-outline-glass btn-export"
              onClick={onExportCSV}
              title="Download expense history as CSV"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </section>
      )}

      <div className="dashboard-main-grid">
        <section className="dashboard-primary-col">
          {expenses.length > 0 && (
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
              selectedDateFilter={selectedDateFilter}
              onDateFilterChange={onDateFilterChange}
              sortOption={sortOption}
              onSortChange={onSortChange}
              onResetFilters={onResetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          )}

          <ExpenseList
            expenses={filteredExpenses}
            totalExpenseCount={expenses.length}
            onEdit={onEdit}
            onDelete={onDelete}
            onOpenAddExpense={onOpenAddExpense}
            onResetFilters={onResetFilters}
            onLoadSampleData={onLoadSampleData}
            hasActiveFilters={hasActiveFilters}
          />
        </section>

        <aside className="dashboard-secondary-col">
          <CategoryChart expenses={expenses} />
          <RecentExpenses expenses={expenses} />
        </aside>
      </div>
    </main>
  );
};
