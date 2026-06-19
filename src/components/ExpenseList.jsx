import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext.jsx';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export const ExpenseList = () => {
  // Consumimos las transacciones y la función de eliminación del contexto global
  const { transactions, deleteTransaction } = useContext(FinanceContext);

  // Estado local para controlar el filtro actual ('all', 'income', 'expense')
  const [filter, setFilter] = useState('all');

  // Filtramos el arreglo de transacciones según la opción seleccionada por el usuario
  const filteredTransactions = transactions.filter(t => {
    if (filter === 'income') return t.type === 'income';
    if (filter === 'expense') return t.type === 'expense';
    return true; // 'all' devuelve todo el historial
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      {/* Cabecera del Historial e Interfaz de Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Historial de Movimientos</h3>
          <p className="text-sm text-gray-400">Listado de tus operaciones recientes</p>
        </div>

        {/* Botones de Filtro Estilizados */}
        <div className="flex bg-gray-100 p-1 rounded-lg self-stretch sm:self-auto text-xs font-semibold">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md transition ${filter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter('income')}
            className={`px-3 py-1.5 rounded-md transition ${filter === 'income' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-green-600'}`}
          >
            Ingresos
          </button>
          <button 
            onClick={() => setFilter('expense')}
            className={`px-3 py-1.5 rounded-md transition ${filter === 'expense' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-red-600'}`}
          >
            Gastos
          </button>
        </div>
      </div>

      {/* Vista de Estado Vacío (Si no hay registros) */}
      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
          <p className="text-gray-400 text-sm">No se encontraron transacciones registradas.</p>
        </div>
      ) : (
        /* Contenedor con overflow para asegurar que la tabla sea responsive en celulares */
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="pb-3">Detalle</th>
                <th className="pb-3">Categoría</th>
                <th className="pb-3">Fecha</th>
                <th className="pb-3 text-right">Monto</th>
                <th className="pb-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50/80 transition-colors">
                  
                  {/* Detalle con Icono Dinámico */}
                  <td className="py-3.5 flex items-center gap-3 font-medium text-gray-900">
                    {transaction.type === 'income' ? (
                      <ArrowUpCircle className="text-green-500 shrink-0" size={20} />
                    ) : (
                      <ArrowDownCircle className="text-red-500 shrink-0" size={20} />
                    )}
                    <span className="truncate max-w-[150px]">{transaction.description}</span>
                  </td>

                  {/* Categoría */}
                  <td className="py-3.5">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                      {transaction.category}
                    </span>
                  </td>

                  {/* Fecha */}
                  <td className="py-3.5 text-gray-400 text-xs">
                    {transaction.date}
                  </td>

                  {/* Monto Dinámico (Verde para ingresos, Rojo para gastos) */}
                  <td className={`py-3.5 text-right font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </td>

                  {/* Botón de Eliminar Transacción */}
                  <td className="py-3.5 text-center">
                    <button 
                      onClick={() => deleteTransaction(transaction.id)}
                      className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition"
                      title="Eliminar registro"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
