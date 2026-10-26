import { useLocalStorage } from './hooks/useLocalStorage';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import CategoryChart from './components/CategoryChart';
import './App.css';

export default function App() {
  const [expenses, setExpenses] = useLocalStorage('expense-tracker-expenses', []);

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Delete ALL expenses? This cannot be undone.')) {
      setExpenses([]);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>💰 Expense Tracker</h1>
          <p className="app-subtitle">Track your spending, offline-ready</p>
        </div>
        {expenses.length > 0 && (
          <button className="btn-danger" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </header>

      <Summary expenses={expenses} />

      <div className="main-grid">
        <div className="left-column">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>
        <div className="right-column">
          <CategoryChart expenses={expenses} />
          <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
        </div>
      </div>

      <footer className="app-footer">
        <p>Data stored locally on your device · Works offline</p>
      </footer>
    </div>
  );
}