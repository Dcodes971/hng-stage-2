

import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

function InvoiceList({ invoices }) {
  const navigate = useNavigate();

  if (invoices.length === 0) {
    return (
      <div className="empty-state">
        <h2>Nothing here</h2>
        <p>No invoices match your filter.</p>
      </div>
    );
  }

  return (
    <ul className="invoice-list">
      {invoices.map(invoice => (
        <li
          key={invoice.id}
          className="invoice-item"
          onClick={() => navigate(`/invoice/${invoice.id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && navigate(`/invoice/${invoice.id}`)}
        >
          <span className="invoice-id">#{invoice.id}</span>
          <span className="invoice-client">{invoice.clientName}</span>
          <span className="invoice-due">Due {invoice.dueDate}</span>
          <span className="invoice-amount">£{invoice.total.toFixed(2)}</span>
          <StatusBadge status={invoice.status} />
        </li>
      ))}
    </ul>
  );
}

export default InvoiceList;