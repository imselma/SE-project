import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(

  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </QueryClientProvider>
)
