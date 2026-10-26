import { useState } from 'react';

const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
  'Other',
];

export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const parsedAmount = parseFloat(amount);

    // Validation
    if (!title.trim()) {
      setError('Please enter a description.');
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }
    if (!date) {
      setError('Please select a date.');
      return;
    }

    onAddExpense({
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: parsedAmount,
      category,
      date,
    });

    // Reset form
    setTitle('');
    setAmount('');
    setCategory('Food');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>

      <div className="form-group">
        <label htmlFor="title">Description</label>
        <input
          id="title"
          type="text"
          placeholder="e.g., Lunch at cafe"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="btn-primary">
        + Add Expense
      </button>
    </form>
  );
}