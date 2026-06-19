import React, { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

export const SummaryCards = () => {
  // Traemos el arreglo global de transacciones desde el Context
  const { transactions } = useContext(FinanceContext);

  // Calculamos los totales usando métodos funcionales de JavaScript (.filter y .reduce)
  const incomes = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  // El balance neto es la diferencia entre lo que entra y lo que sale
  const totalBalance = incomes - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* 1. Tarjeta de Balance Neto */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Balance Disponible</p>
          <p className={`text-3xl font-extrabold mt-1 ${totalBalance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
            ${totalBalance.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${totalBalance >= 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-red-50 text-red-600'}`}>
          <DollarSign size={24} />
        </div>
      </div>

      {/* 2. Tarjeta de Ingresos Totales */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ingresos Totales</p>
          <p className="text-3xl font-extrabold text-green-600 mt-1">
            +${incomes.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="p-3 bg-green-50 rounded-xl text-green-600">
          <ArrowUpRight size={24} />
        </div>
      </div>

      {/* 3. Tarjeta de Gastos Totales */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gastos Totales</p>
          <p className="text-3xl font-extrabold text-red-600 mt-1">
            -${expenses.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="p-3 bg-red-50 rounded-xl text-red-600">
          <ArrowDownRight size={24} />
        </div>
      </div>

    </div>
  );
};
