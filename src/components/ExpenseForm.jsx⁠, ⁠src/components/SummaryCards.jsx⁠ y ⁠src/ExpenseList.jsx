import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
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
        <div className="text-center py
