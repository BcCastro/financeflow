import React from 'react';
import { FinanceProvider } from './context/FinanceContext.jsx';
import { SummaryCards } from './components/SummaryCards';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList'; // Crear similar para listar con deleteTransaction

function App() {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">FinanceFlow</h1>
            <p className="text-sm text-gray-500">Control de finanzas personales para portafolio profesional</p>
          </header>

          {/* Tarjetas Superiores */}
          <SummaryCards />

          {/* Grid Responsivo: 1 columna en móviles, 3 columnas en pantallas grandes (Lg) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ExpenseForm />
            </div>
            <div className="lg:col-span-2">
              {/* Aquí renderizarías la lista de transacciones */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Historial de Transacciones</h3>
                <p className="text-gray-400 text-sm">Gestiona tus movimientos diarios con facilidad.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
}

export default App;
