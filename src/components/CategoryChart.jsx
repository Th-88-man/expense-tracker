import { useMemo } from 'react';
import { formatCurrency } from '../utils/formatters';

const COLORS = {
  Food: '#ef4444',
  Transport: '#3b82f6',
  Shopping: '#a855f7',
  Bills: '#f59e0b',
  Entertainment: '#ec4899',
  Health: '#10b981',
  Other: '#6b7280',
};

export default function CategoryChart({ expenses }) {
  const categoryData = useMemo(() => {
    const totals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const total = Object.values(totals).reduce((sum, v) => sum + v, 0);

    return Object.entries(totals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenses]);

  if (categoryData.length === 0) return null;

  return (
    <div className="category-chart">
      <h3>Spending by Category</h3>
      <div className="category-bars">
        {categoryData.map(({ category, amount, percentage }) => (
          <div key={category} className="category-bar-row">
            <div className="category-bar-label">
              <span>{category}</span>
              <span>{formatCurrency(amount)}</span>
            </div>
            <div className="category-bar-track">
              <div
                className="category-bar-fill"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: COLORS[category] || COLORS.Other,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}