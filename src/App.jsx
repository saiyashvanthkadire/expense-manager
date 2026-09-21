import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ExpenseForm } from './components/ExpenseForm';
import { EditExpenseModal } from './components/EditExpenseModal';
import { DeleteConfirmation } from './components/DeleteConfirmation';
import { Toast } from './components/Toast';
import { getSampleExpenses } from './utils/sampleData';
import { isSameDay, isCurrentWeek, isCurrentMonth, getTodayDateString } from './utils/formatters';

const STORAGE_KEY = 'personalExpenseManagerExpenses';
const THEME_KEY = 'expenseManagerTheme';

export function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {
    }
    return 'dark';
  });

  const [expenses, setExpenses] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Failed to parse LocalStorage expenses data. Defaulting to empty array.', err);
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);

  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (err) {
      console.error('Failed to write to LocalStorage:', err);
      showToast('Storage quota exceeded or unavailable.', 'error');
    }
  }, [expenses]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
    showToast('Expense added successfully.', 'success');
  };

  const handleSaveEdit = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === updatedExpense.id ? updatedExpense : item))
    );
    showToast('Expense updated successfully.', 'success');
  };

  const handleConfirmDelete = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
    setDeletingExpense(null);
    showToast('Expense deleted.', 'info');
  };

  const handleLoadSampleData = () => {
    const samples = getSampleExpenses();
    setExpenses(samples);
    showToast('Sample expenses loaded successfully.', 'success');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDateFilter('all');
    setSortOption('newest');
  };

  const handleExportCSV = () => {
    if (expenses.length === 0) {
      showToast('No expenses to export.', 'info');
      return;
    }

    try {
      const headers = ['Title', 'Category', 'Amount (INR)', 'Date'];
      const rows = expenses.map((exp) => [
        `"${(exp.title || '').replace(/"/g, '""')}"`,
        `"${(exp.category || '').replace(/"/g, '""')}"`,
        exp.amount,
        exp.date
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `expenses_${getTodayDateString()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Expenses exported to CSV successfully.', 'success');
    } catch {
      showToast('Failed to export CSV.', 'error');
    }
  };

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedDateFilter !== 'all' ||
    sortOption !== 'newest';

  const {
    totalSpending,
    monthlySpending,
    transactionCount,
    highestExpense,
    currentMonthName
  } = useMemo(() => {
    const total = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    const monthly = expenses.reduce((acc, curr) => {
      if (curr.date && isCurrentMonth(curr.date)) {
        return acc + (Number(curr.amount) || 0);
      }
      return acc;
    }, 0);

    const highest = expenses.reduce((acc, curr) => {
      const amt = Number(curr.amount) || 0;
      return amt > acc ? amt : acc;
    }, 0);

    const monthName = new Intl.DateTimeFormat('en-IN', {
      month: 'long',
      year: 'numeric'
    }).format(new Date());

    return {
      totalSpending: total,
      monthlySpending: monthly,
      transactionCount: expenses.length,
      highestExpense: highest,
      currentMonthName: monthName
    };
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((item) => {
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase().trim();
          const titleMatch = (item.title || '').toLowerCase().includes(term);
          if (!titleMatch) return false;
        }

        if (selectedCategory !== 'all') {
          if ((item.category || '').toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        if (selectedDateFilter === 'today') {
          if (!isSameDay(item.date)) return false;
        } else if (selectedDateFilter === 'week') {
          if (!isCurrentWeek(item.date)) return false;
        } else if (selectedDateFilter === 'month') {
          if (!isCurrentMonth(item.date)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'newest') {
          const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
          if (diff !== 0) return diff;
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        if (sortOption === 'oldest') {
          const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
          if (diff !== 0) return diff;
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        }
        if (sortOption === 'highest') {
          return (Number(b.amount) || 0) - (Number(a.amount) || 0);
        }
        if (sortOption === 'lowest') {
          return (Number(a.amount) || 0) - (Number(b.amount) || 0);
        }
        return 0;
      });
  }, [expenses, searchTerm, selectedCategory, selectedDateFilter, sortOption]);

  return (
    <div className="app-shell">
      <Toast toast={toast} onClose={hideToast} />

      <Header
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onLoadSampleData={handleLoadSampleData}
        hasExpenses={expenses.length > 0}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <Dashboard
        expenses={expenses}
        filteredExpenses={filteredExpenses}
        totalSpending={totalSpending}
        monthlySpending={monthlySpending}
        transactionCount={transactionCount}
        highestExpense={highestExpense}
        currentMonthName={currentMonthName}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDateFilter={selectedDateFilter}
        onDateFilterChange={setSelectedDateFilter}
        sortOption={sortOption}
        onSortChange={setSortOption}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        onEdit={(exp) => setEditingExpense(exp)}
        onDelete={(exp) => setDeletingExpense(exp)}
        onOpenAddExpense={() => setIsAddModalOpen(true)}
        onLoadSampleData={handleLoadSampleData}
        onExportCSV={handleExportCSV}
      />

      <ExpenseForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddExpense={handleAddExpense}
      />

      <EditExpenseModal
        isOpen={Boolean(editingExpense)}
        expense={editingExpense}
        onClose={() => setEditingExpense(null)}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmation
        isOpen={Boolean(deletingExpense)}
        expense={deletingExpense}
        onClose={() => setDeletingExpense(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default App;
