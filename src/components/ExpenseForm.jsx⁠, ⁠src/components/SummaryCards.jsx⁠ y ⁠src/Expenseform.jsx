import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export const ExpenseForm = () => {
  // Consumimos la función para añadir transacciones desde el contexto global
  const { addTransaction } = useContext(FinanceContext);
  
  // Estados locales para controlar cada campo del formulario
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // Por defecto es 'expense' (gasto)
  const [category, setCategory] = useState('Comida');

  // Función que procesa el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica para evitar campos vacíos
    if (!description.trim() || !amount) return;

    // Estructuramos el objeto de la nueva transacción
    addTransaction({
      description,
      amount: parseFloat(amount), // Convertimos el texto a número decimal
      type,
      category,
      date: new Date().toLocaleDateString('es-ES') // Registra la fecha actual formateada
    });

    // Limpiamos los campos del formulario tras el éxito
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Nueva Transacción</h3>
      
      {/* Campo: Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Descripción</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border text-gray-700 bg-gray-50/50"
          placeholder="Ej. Supermercado, Nómina, etc."
          required
        />
      </div>

      {/* Grid para Monto y Tipo (Responsivo) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Monto ($)</label>
          <input 
            type="number" 
            step="0.01"
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border text-gray-700 bg-gray-50/50"
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Tipo</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border text-gray-700 bg-gray-50/50"
          >
            <option value="expense">📉 Gasto</option>
            <option value="income">📈 Ingreso</option>
          </select>
        </div>
      </div>

      {/* Campo: Categoría dinámica */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Categoría</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border text-gray-700 bg-gray-50/50"
        >
          {type === 'expense' ? (
            <>
              <option value="Comida">Comida</option>
              <option value="Vivienda">Vivienda</option>
              <option value="Transporte">Transporte</option>
              <option value="Entretenimiento">Entretenimiento</option>
              <option value="Otros">Otros Gastos</option>
            </>
          ) : (
            <>
              <option value="Salario">Salario / Nómina</option>
              <option value="Inversiones">Inversiones</option>
              <option value="Freelance">Trabajo Freelance</option>
              <option value="Otros">Otros Ingresos</option>
            </>
          )}
        </select>
      </div>

      {/* Botón de envío */}
      <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition duration-200">
        Registrar Movimiento
      </button>
    </form>
  )
