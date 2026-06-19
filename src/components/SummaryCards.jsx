import React, { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext.jsx';

export const SummaryCards = () => {
  const { transactions } = useContext(FinanceContext);

  // Mapeo de formatos de moneda
  const currencySymbols = {
    COP: 'COP $',
    USD: 'USD $',
    EUR: 'EUR €',
    MXN: 'MXN $',
  };

  // Calcular totales agrupados por moneda
  const totalsByCurrency = transactions.reduce((acc, t) => {
    const currency = t.currency || 'COP'; // Por si hay transacciones viejas sin moneda
    if (!acc[currency]) {
      acc[currency] = { balance: 0, ingresos: 0, gastos: 0 };
    }

    if (t.type === 'ingreso') {
      acc[currency].ingresos += t.amount;
      acc[currency].balance += t.amount;
    } else {
      acc[currency].gastos += t.amount;
      acc[currency].balance -= t.amount;
    }

    return acc;
  }, {});

  // Si no hay transacciones, mostramos una tarjeta vacía por defecto en COP
  const activeCurrencies = Object.keys(totalsByCurrency).length > 0 
    ? Object.keys(totalsByCurrency) 
    : ['COP'];

  return (
    <div className="space-y-6 mb-8">
      {activeCurrencies.map((cur) => {
        const data = totalsByCurrency[cur] || { balance: 0, ingresos: 0, gastos: 0 };
        const symbol = currencySymbols[cur] || `${cur} $`;

        return (
          <div key={cur} className="border-b border-gray-100 pb-4 last:border-none">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Resumen en {cur}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* BALANCE CARD */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase">Balance Total</p>
                  <h3 className={`text-2xl font-black mt-1 ${data.balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                    {symbol}{data.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                  $
                </div>
              </div>

              {/* INGRESOS CARD */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase">Ingresos</p>
                  <h3 className="text-2xl font-black text-green-600 mt-1">
                    {symbol}{data.ingresos.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  ↑
                </div>
              </div>

              {/* GASTOS CARD */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase">Gastos</p>
                  <h3 className="text-2xl font-black text-red-500 mt-1">
                    {symbol}{data.gastos.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                  ↓
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};
