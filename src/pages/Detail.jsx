

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import DeleteModal from '../components/DeleteModal';
import InvoiceForm from '../components/InvoiceForm';

function Detail({ invoices, onDelete, onMarkPaid, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  const invoice = invoices.find(inv => inv.id === id);

  if (!invoice) {
    return (
      <div className="home">
        <button className="btn-back" onClick={() => navigate('/')}>← Back</button>
        <p>Invoice not found.</p>
      </div>
    );
  }

  return (
    <div className="home">
      <button className="btn-back" onClick={() => navigate('/')}>← Go Back</button>

      <div className="detail-header">
        <div className="detail-status-row">
          <span>Status</span>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="detail-actions">
          <button className="btn-edit" onClick={() => setShowEdit(true)}>Edit</button>
          <button className="btn-delete" onClick={() => setShowDelete(true)}>Delete</button>
          {invoice.status === 'Pending' && (
            <button className="btn-paid" onClick={() => onMarkPaid(invoice.id)}>
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-top">
          <div>
            <h2>#{invoice.id}</h2>
            <p>{invoice.description}</p>
          </div>
          <div className="detail-address">
            <p>{invoice.senderStreet}</p>
            <p>{invoice.senderCity}</p>
            <p>{invoice.senderPostcode}</p>
            <p>{invoice.senderCountry}</p>
          </div>
        </div>

        <div className="detail-meta">
          <div>
            <p className="label">Invoice Date</p>
            <p className="value">{invoice.createdAt}</p>
            <p className="label" style={{marginTop: '24px'}}>Payment Due</p>
            <p className="value">{invoice.dueDate}</p>
          </div>
          <div>
            <p className="label">Bill To</p>
            <p className="value">{invoice.clientName}</p>
            <p>{invoice.clientStreet}</p>
            <p>{invoice.clientCity}</p>
            <p>{invoice.clientPostcode}</p>
            <p>{invoice.clientCountry}</p>
          </div>
          <div>
            <p className="label">Sent To</p>
            <p className="value">{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="items-table">
          <div className="items-header">
            <span>Item Name</span>
            <span>QTY.</span>
            <span>Price</span>
            <span>Total</span>
          </div>
          {invoice.items.map((item, i) => (
            <div key={i} className="item-row">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>£{parseFloat(item.price).toFixed(2)}</span>
              <span>£{(item.quantity * item.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="items-total">
            <span>Amount Due</span>
            <span>£{invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {showDelete && (
        <DeleteModal
          id={invoice.id}
          onConfirm={() => {
            onDelete(invoice.id);
            navigate('/');
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}

      {showEdit && (
        <InvoiceForm
          existing={invoice}
          onSave={(updated) => {
            onUpdate(updated);
            setShowEdit(false);
          }}
          onCancel={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}

export default Detail;