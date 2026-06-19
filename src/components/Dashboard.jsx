import React from 'react';
import { SummaryCards } from './SummaryCards.jsx';
import { ExpenseForm } from './ExpenseForm.jsx';
import { ExpenseList } from './ExpenseList.jsx';// Componente que renderiza el historial de transacciones

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabecera del Dashboard */}
        <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">FinanceFlow</h1>
            <p className="text-sm text-gray-500 mt-1">Control inteligente y análisis de tu dinero en tiempo real</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-xs font-medium text-gray-600 self-start sm:self-auto">
            🟢 Estado: Sincronizado localmente
          </div>
        </header>

        {/* Sección Superior: Métricas e Indicadores de Dinero */}
        <SummaryCards />

        {/* Sección Inferior - Grid Responsivo: 
            1 columna en smartphones, 3 columnas desde pantallas medianas/grandes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Formulario de captura (Ocupa 1 espacio de 3) */}
          <div className="lg:col-span-1">
            <ExpenseForm />
          </div>

          {/* Columna Derecha: Tabla/Historial interactivo (Ocupa 2 espacios de 3) */}
          <div className="lg:col-span-2">
            <ExpenseList />
          </div>

        </div>

      </div>
    </div>
  );
};
