import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export const ExpenseForm = () => {
  const { addTransaction } = useContext(FinanceContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // 'expense' o 'income'
  const [category, setCategory] = useState('Comida');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    addTransaction({
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toLocaleDateString('es-ES')
    });

    // Limpiar el formulario
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Nueva Transacción</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="Ej. Supermercado o Sueldo"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Monto ($)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        >
          <option value="Comida">Comida</option>
          <option value="Vivienda">Vivienda</option>
          <option value="Transporte">Transporte</option>
          <option value="Salario">Salario</option>
          <option value="Otros">Otros</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md font-semibold hover:bg-indigo-700 transition">
        Añadir
      </button>
    </form>
  );
};
