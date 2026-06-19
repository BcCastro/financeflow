import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext.jsx';

export const ExpenseList = () => {
  const { transactions, deleteTransaction } = useContext(FinanceContext);
  const [filter, setFilter] = useState('todos');

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'ingresos') return t.type === 'ingreso';
    if (filter === 'gastos') return t.type === 'gasto';
    return true;
  });

  const currencySymbols = {
    COP: '$',
    USD: 'u$s ',
    EUR: '€',
    MXN: 'mx$ ',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Historial de Movimientos</h3>
          <p className="text-xs text-gray-400 mt-0.5">Listado de tus operaciones recientes</p>
        </div>
        
        {/* Filtros */}
        <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-center">
          <button
            onClick={() => setFilter('todos')}
            className={`px-3 py-1.5 rounded-lg transition ${filter === 'todos' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('ingresos')}
            className={`px-3 py-1.5 rounded-lg transition ${filter === 'ingresos' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-green-600'}`}
          >
            Ingresos
          </button>
          <button
            onClick={() => setFilter('gastos')}
            className={`px-3 py-1.5 rounded-lg transition ${filter === 'gastos' ? 'bg-white text-red-500 shadow-sm' : 'text-gray-500 hover:text-red-500'}`}
          >
            Gastos
          </button>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
          <p className="text-sm text-gray-400 font-medium">No se encontraron transacciones registradas.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {filteredTransactions.map((t) => {
            const currentCurrency = t.currency || 'COP';
            const symbol = currencySymbols[currentCurrency] || '$';

            return (
              <div
                key={t.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${t.type === 'ingreso' ? 'bg-green-500' : 'bg-red-400'}`} />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{t.description}</p>
                    <span className="inline-block text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-medium mt-1">
                      {t.category} ({currentCurrency})
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-black ${t.type === 'ingreso' ? 'text-green-600' : 'text-gray-900'}`}>
                    {t.type === 'ingreso' ? '+' : '-'}{symbol}{t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="text-gray-300 hover:text-red-500 transition text-xs font-bold"
                    title="Eliminar"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
