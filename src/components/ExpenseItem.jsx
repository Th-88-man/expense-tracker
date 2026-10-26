import { formatCurrency, formatDate } from '../utils/formatters';

export default function ExpenseItem({ expense, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Delete "${expense.title}"?`)) {
      onDelete(expense.id);
    }
  };

  return (
    <li className="expense-item">
      <div className="expense-info">
        <span className={`category-dot category-${expense.category.toLowerCase()}`} />
        <div>
          <p className="expense-title">{expense.title}</p>
          <p className="expense-meta">
            {expense.category} · {formatDate(expense.date)}
          </p>
        </div>
      </div>
      <div className="expense-actions">
        <span className="expense-amount">{formatCurrency(expense.amount)}</span>
        <button
          className="btn-delete"
          onClick={handleDelete}
          aria-label={`Delete ${expense.title}`}
        >
          ×
        </button>
      </div>
    </li>
  );
}