import React from 'react';
import { FinanceProvider } from './context/FinanceContext.jsx';
import { Dashboard } from './components/Dashboard.jsx';

function App() {
  return (
    <FinanceProvider>
      <Dashboard />
    </FinanceProvider>
  );
}

export default App;
