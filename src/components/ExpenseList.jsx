import { useState, useMemo } from 'react';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, onDelete }) {
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  const categories = useMemo(() => {
    return ['All', ...new Set(expenses.map((e) => e.category))];
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    let result = [...expenses];

    // Filter by category
    if (filterCategory !== 'All') {
      result = result.filter((e) => e.category === filterCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((e) => e.title.toLowerCase().includes(term));
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return result;
  }, [expenses, filterCategory, searchTerm, sortBy]);

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>No expenses yet.</p>
        <p className="empty-subtitle">Add your first expense using the form!</p>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <div className="list-controls">
        <input
          type="text"
          placeholder="🔍 Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Highest amount</option>
          <option value="amount-asc">Lowest amount</option>
        </select>
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="empty-state">
          <p>No expenses match your filters.</p>
        </div>
      ) : (
        <ul className="expense-list">
          {filteredExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}