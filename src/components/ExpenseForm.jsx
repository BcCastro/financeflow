import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext.jsx';

export const ExpenseForm = () => {
  const { addTransaction } = useContext(FinanceContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('gasto');
  const [category, setCategory] = useState('Comida');
  const [currency, setCurrency] = useState('COP'); // Moneda por defecto

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    addTransaction({
      description,
      amount: parseFloat(amount),
      type,
      category,
      currency // Guardamos el tipo de moneda elegido
    });

    // Limpiar el formulario
    setDescription('');
    setAmount('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Nueva Transacción</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Descripción</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Ej. Supermercado o Sueldo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Monto</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Moneda</label>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="COP">COP ($)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="MXN">MXN ($)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tipo</label>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Categoría</label>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Comida">Comida</option>
              <option value="Ventas">Ventas</option>
              <option value="Sueldo">Sueldo</option>
              <option value="Transporte">Transporte</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition text-sm shadow-sm"
        >
          Añadir
        </button>
      </form>
    </div>
  );
};
