import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/app.scss';
import App from './App';
import { RouterProvider } from 'react-router';
import { router } from './router/router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<RouterProvider router={router} />);
