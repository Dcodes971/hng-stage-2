

import React from 'react';

function generateId() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetters = letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)];
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);
  return `${randomLetters}${randomNumbers}`;
}

function InvoiceForm({ existing, onSave, onCancel }) {
  const [form, setForm] = React.useState(existing || {
    id: generateId(),
    description: '',
    createdAt: new Date().toISOString().split('T')[0],
    dueDate: '',
    status: 'Draft',
    senderStreet: '',
    senderCity: '',
    senderPostcode: '',
    senderCountry: '',
    clientName: '',
    clientEmail: '',
    clientStreet: '',
    clientCity: '',
    clientPostcode: '',
    clientCountry: '',
    items: [{ name: '', quantity: 1, price: 0 }],
    total: 0,
  });

  const [errors, setErrors] = React.useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleItemChange(index, field, value) {
    const updated = form.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    const total = updated.reduce((sum, item) =>
      sum + item.quantity * item.price, 0
    );
    setForm({ ...form, items: updated, total });
  }

  function addItem() {
    setForm({
      ...form,
      items: [...form.items, { name: '', quantity: 1, price: 0 }]
    });
  }

  function removeItem(index) {
    const updated = form.items.filter((_, i) => i !== index);
    const total = updated.reduce((sum, item) =>
      sum + item.quantity * item.price, 0
    );
    setForm({ ...form, items: updated, total });
  }

  function validate() {
    const newErrors = {};
    if (!form.clientName.trim()) newErrors.clientName = 'Client name is required';
    if (!form.clientEmail.trim()) newErrors.clientEmail = 'Client email is required';
    if (!/\S+@\S+\.\S+/.test(form.clientEmail)) newErrors.clientEmail = 'Valid email required';
    if (!form.dueDate) newErrors.dueDate = 'Due date is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (form.items.length === 0) newErrors.items = 'At least one item is required';
    form.items.forEach((item, i) => {
      if (!item.name.trim()) newErrors[`item${i}name`] = 'Item name required';
      if (item.quantity <= 0) newErrors[`item${i}qty`] = 'Quantity must be positive';
      if (item.price <= 0) newErrors[`item${i}price`] = 'Price must be positive';
    });
    return newErrors;
  }

  function handleSave(status) {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave({ ...form, status: status || form.status });
  }

  return (
    <div className="form-overlay">
      <div className="form-panel">
        <h2>{existing ? 'Edit Invoice' : 'New Invoice'}</h2>

        <fieldset>
          <legend>Bill From</legend>
          <div className="form-group">
            <label htmlFor="senderStreet">Street Address</label>
            <input id="senderStreet" name="senderStreet" value={form.senderStreet} onChange={handleChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="senderCity">City</label>
              <input id="senderCity" name="senderCity" value={form.senderCity} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="senderPostcode">Postcode</label>
              <input id="senderPostcode" name="senderPostcode" value={form.senderPostcode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="senderCountry">Country</label>
              <input id="senderCountry" name="senderCountry" value={form.senderCountry} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Bill To</legend>
          <div className="form-group">
            <label htmlFor="clientName">Client Name</label>
            <input
              id="clientName" name="clientName"
              value={form.clientName} onChange={handleChange}
              className={errors.clientName ? 'input-error' : ''}
            />
            {errors.clientName && <span className="error">{errors.clientName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="clientEmail">Client Email</label>
            <input
              id="clientEmail" name="clientEmail"
              value={form.clientEmail} onChange={handleChange}
              className={errors.clientEmail ? 'input-error' : ''}
            />
            {errors.clientEmail && <span className="error">{errors.clientEmail}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="clientStreet">Street Address</label>
            <input id="clientStreet" name="clientStreet" value={form.clientStreet} onChange={handleChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="clientCity">City</label>
              <input id="clientCity" name="clientCity" value={form.clientCity} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="clientPostcode">Postcode</label>
              <input id="clientPostcode" name="clientPostcode" value={form.clientPostcode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="clientCountry">Country</label>
              <input id="clientCountry" name="clientCountry" value={form.clientCountry} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Invoice Details</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="createdAt">Invoice Date</label>
              <input type="date" id="createdAt" name="createdAt" value={form.createdAt} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date" id="dueDate" name="dueDate"
                value={form.dueDate} onChange={handleChange}
                className={errors.dueDate ? 'input-error' : ''}
              />
              {errors.dueDate && <span className="error">{errors.dueDate}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Project Description</label>
            <input
              id="description" name="description"
              value={form.description} onChange={handleChange}
              className={errors.description ? 'input-error' : ''}
            />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>
        </fieldset>

        <div className="items-section">
          <h3>Item List</h3>
          {errors.items && <span className="error">{errors.items}</span>}
          {form.items.map((item, i) => (
            <div key={i} className="item-inputs">
              <div className="form-group">
                <label>Item Name</label>
                <input
                  value={item.name}
                  onChange={e => handleItemChange(i, 'name', e.target.value)}
                  className={errors[`item${i}name`] ? 'input-error' : ''}
                />
                {errors[`item${i}name`] && <span className="error">{errors[`item${i}name`]}</span>}
              </div>
              <div className="form-group">
                <label>Qty</label>
                <input
                  type="number" value={item.quantity}
                  onChange={e => handleItemChange(i, 'quantity', parseInt(e.target.value))}
                  className={errors[`item${i}qty`] ? 'input-error' : ''}
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number" value={item.price}
                  onChange={e => handleItemChange(i, 'price', parseFloat(e.target.value))}
                  className={errors[`item${i}price`] ? 'input-error' : ''}
                />
              </div>
              <div className="form-group">
                <label>Total</label>
                <p className="item-total">£{(item.quantity * item.price).toFixed(2)}</p>
              </div>
              <button className="btn-remove-item" onClick={() => removeItem(i)}>🗑</button>
            </div>
          ))}
          <button className="btn-add-item" onClick={addItem}>+ Add New Item</button>
        </div>

        <div className="form-footer">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          {!existing && (
            <button className="btn-draft" onClick={() => handleSave('Draft')}>Save as Draft</button>
          )}
          <button className="btn-save" onClick={() => handleSave(existing ? form.status : 'Pending')}>
            {existing ? 'Save Changes' : 'Save & Send'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default InvoiceForm;