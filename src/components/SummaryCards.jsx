import React, { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

export const SummaryCards = () => {
  const { transactions } = useContext(FinanceContext);

  // Cálculos de los totales empleando métodos funcionales de arrays (reduce)
  const incomes = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const totalBalance = incomes - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Tarjeta de Balance */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase">Balance Total</p>
          <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
            ${totalBalance.toFixed(2)}
          </p>
        </div>
        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600"><DollarSign /></div>
      </div>

      {/* Tarjeta de Ingresos */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase">Ingresos</p>
          <p className="text-2xl font-bold text-green-600">${incomes.toFixed(2)}</p>
        </div>
        <div className="p-3 bg-green-100 rounded-full text-green-600"><ArrowUpRight /></div>
      </div>

      {/* Tarjeta de Gastos */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase">Gastos</p>
          <p className="text-2xl font-bold text-red-600">${expenses.toFixed(2)}</p>
        </div>
        <div className="p-3 bg-red-100 rounded-full text-red-600"><ArrowDownRight /></div>
      </div>
    </div>
  );
};
