import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';

import App from './App.jsx'

const queryClient = new QueryClient();

const root = document.getElementById('app');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <JotaiProvider>
              <App />
            </JotaiProvider>
          </QueryClientProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
