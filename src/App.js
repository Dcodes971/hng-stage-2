

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import InvoiceForm from './components/InvoiceForm';
import './App.css';

const STORAGE_KEY = 'hng_invoices';

function App() {
  const [invoices, setInvoices] = React.useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = React.useState('All');
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  }, [invoices]);

  React.useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  function handleCreate(invoice) {
    setInvoices([...invoices, invoice]);
    setShowForm(false);
  }

  function handleDelete(id) {
    setInvoices(invoices.filter(inv => inv.id !== id));
  }

  function handleMarkPaid(id) {
    setInvoices(invoices.map(inv =>
      inv.id === id ? { ...inv, status: 'Paid' } : inv
    ));
  }

  function handleUpdate(updated) {
    setInvoices(invoices.map(inv =>
      inv.id === updated.id ? updated : inv
    ));
  }

  return (
    <BrowserRouter basename="/hng-stage-2">
      <div className={`app ${darkMode ? 'dark' : ''}`}>

        <nav className="sidebar">
          <div className="sidebar-logo">
            <span>💼</span>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <Home
                invoices={invoices}
                filter={filter}
                setFilter={setFilter}
                darkMode={darkMode}
                onNewInvoice={() => setShowForm(true)}
              />
            } />
            <Route path="/invoice/:id" element={
              <Detail
                invoices={invoices}
                onDelete={handleDelete}
                onMarkPaid={handleMarkPaid}
                onUpdate={handleUpdate}
              />
            } />
          </Routes>

          {showForm && (
            <InvoiceForm
              onSave={handleCreate}
              onCancel={() => setShowForm(false)}
            />
          )}
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;