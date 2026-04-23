

# HNG Internship — Stage 2: Invoice Management App

A fully functional invoice management application built with React.

Live demo: https://dcodes971.github.io/hng-stage-2

---

## Setup Instructions

1. Clone the repo
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000`

---

## Architecture

- `src/components/` — Reusable components (InvoiceList, InvoiceForm, DeleteModal, StatusBadge)
- `src/pages/` — Page components (Home, Detail)
- `App.js` — Main app with routing and state management
- LocalStorage used for data persistence

---

## Features

- Create, read, update, delete invoices
- Save as Draft or send as Pending
- Mark invoices as Paid
- Filter by status (All, Draft, Pending, Paid)
- Light and dark mode toggle
- Form validation with error messages
- Fully responsive (mobile, tablet, desktop)

---

## Accessibility Notes

- Semantic HTML throughout
- All form fields have labels
- Buttons have accessible names
- Delete modal closes with ESC key
- Keyboard navigable

---

## Trade-offs

- Data stored in LocalStorage — resets if browser data is cleared
- No user authentication