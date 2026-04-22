

import React from 'react';
import InvoiceList from '../components/InvoiceList';

function Home({ invoices, filter, setFilter, onNewInvoice }) {
  const filtered = filter === 'All'
    ? invoices
    : invoices.filter(inv => inv.status === filter);

  return (
    <div className="home">
      <div className="home-header">
        <div>
          <h1>Invoices</h1>
          <p>{filtered.length} invoice{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="home-actions">
          <select
            className="filter-select"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            aria-label="Filter invoices by status"
          >
            <option value="All">All</option>
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
          <button className="btn-new" onClick={onNewInvoice}>
            + New Invoice
          </button>
        </div>
      </div>
      <InvoiceList invoices={filtered} />
    </div>
  );
}

export default Home;