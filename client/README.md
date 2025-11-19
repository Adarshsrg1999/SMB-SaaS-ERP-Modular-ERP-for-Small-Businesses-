# ERP Frontend Client

React application for the SMB SaaS ERP, built with Vite.

## Setup

```bash
cd client
npm install
npm run dev
```

## Features

*   **Dashboard Layout**: Persistent sidebar navigation.
*   **Protected Routes**: Requires login to access ERP modules.
*   **Modules**:
    *   **Dashboard**: High-level stats.
    *   **Customers**: Manage client database.
    *   **Inventory**: Track stock and products.
    *   **Sales**: Create and manage orders.

## Project Structure

*   `src/components/DashboardLayout.jsx`: Main layout wrapper.
*   `src/pages/`: Individual module pages.
*   `src/api/`: Centralized API service functions.
