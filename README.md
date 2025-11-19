# SMB SaaS ERP

A modular Enterprise Resource Planning (ERP) system designed for small businesses. This full-stack application helps manage customers, inventory, and sales workflows (Quotations, Orders, Invoices).

## Features

*   **Role-Based Access Control (RBAC)**: Secure login for Admins and Staff.
*   **Dashboard**: Real-time overview of sales, customers, and stock alerts.
*   **Customer Management**: CRM module to track client details.
*   **Inventory Management**: Product catalog with stock tracking and low-stock alerts.
*   **Sales Workflow**: Create Quotations, convert to Orders, and generate Invoices.

## Tech Stack

*   **Frontend**: React, Vite, CSS Modules (Dashboard Layout)
*   **Backend**: Node.js, Express.js
*   **Database**: SQLite (Local file-based DB)
*   **Authentication**: JWT (JSON Web Tokens)

## Quick Start

### 1. Install Dependencies
Run this command in the root directory to install dependencies for both client and server:
```bash
npm install
```

### 2. Run Tests
To run tests with code coverage reports:
```bash
# Client Coverage
cd client
npm run test:coverage

# Server Coverage
cd server
npm run test:coverage
```

### 3. Run the Application
Start both the backend and frontend concurrently:
```bash
npm run dev
```

*   **Frontend**: [http://localhost:5173](http://localhost:5173)
*   **Backend**: [http://localhost:5000](http://localhost:5000)

### 3. Default Login
*   **Email**: `admin@erp.com`
*   **Password**: `admin123`

## Project Structure

*   **`client/`**: React frontend with a Dashboard layout and module pages.
*   **`server/`**: Express API with modular routes (`routes/`) and SQLite database (`erp.db`).

## Database

The application uses a local SQLite database (`server/erp.db`).
To reset the database or view contents, you can use the `view_db.js` script in the server folder (needs updating) or a SQLite viewer.
