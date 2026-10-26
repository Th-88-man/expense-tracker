import { useMemo } from 'react';
import { formatCurrency, getMonthName } from '../utils/formatters';

export default function Summary({ expenses }) {
  const stats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyExpenses = expenses.filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const monthlyTotal = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);
    const average = expenses.length > 0 ? total / expenses.length : 0;

    return {
      total,
      monthlyTotal,
      average,
      count: expenses.length,
      monthName: getMonthName(currentMonth),
    };
  }, [expenses]);

  return (
    <div className="summary-grid">
      <div className="summary-card highlight">
        <span className="summary-label">This Month ({stats.monthName})</span>
        <span className="summary-value">{formatCurrency(stats.monthlyTotal)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">All Time Total</span>
        <span className="summary-value">{formatCurrency(stats.total)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Average per Expense</span>
        <span className="summary-value">{formatCurrency(stats.average)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Total Transactions</span>
        <span className="summary-value">{stats.count}</span>
      </div>
    </div>
  );
}