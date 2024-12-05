import React, { useState, useEffect } from 'react';
import { Transaction, CreateTransactionInput, UpdateTransactionInput } from '../../types';

interface TransactionFormProps {
    initialTransaction?: Transaction;
    onCreateTransaction?: (input: CreateTransactionInput) => Promise<void>;
    onUpdateTransaction?: (id: string, input: UpdateTransactionInput) => Promise<void>;
    onCancelEdit?: () => void; // Nouvelle propriété ajoutée
  }

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  initialTransaction, 
  onCreateTransaction, 
  onUpdateTransaction 
}) => {
  // États du formulaire
  const [amount, setAmount] = useState<number>(initialTransaction?.amount || 0);
  const [type, setType] = useState<'DEPENSE' | 'REVENU'>(initialTransaction?.type || 'DEPENSE');
  const [description, setDescription] = useState<string>(initialTransaction?.description || '');

  // Réinitialisation du formulaire quand initialTransaction change
  useEffect(() => {
    if (initialTransaction) {
      setAmount(initialTransaction.amount);
      setType(initialTransaction.type);
      setDescription(initialTransaction.description);
    } else {
      // Réinitialisation si aucune transaction n'est en cours d'édition
      setAmount(0);
      setType('DEPENSE');
      setDescription('');
    }
  }, [initialTransaction]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation de base
    if (amount <= 0) {
      alert('Le montant doit être supérieur à zéro');
      return;
    }

    try {
      if (initialTransaction) {
        // Mode édition
        if (onUpdateTransaction) {
          const updateData: UpdateTransactionInput = {
            amount,
            type,
            description
          };
          await onUpdateTransaction(initialTransaction.id, updateData);
        }
      } else {
        // Mode création
        if (onCreateTransaction) {
          const newTransaction: CreateTransactionInput = {
            amount,
            type,
            description
          };
          await onCreateTransaction(newTransaction);
        }
      }

      // Réinitialisation du formulaire
      setAmount(0);
      setDescription('');
      setType('DEPENSE');
    } catch (error) {
      console.error('Erreur lors de la transaction:', error);
      alert('Impossible de traiter la transaction');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {initialTransaction ? 'Modifier la Transaction' : 'Nouvelle Transaction'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ Montant */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Montant
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            step="0.01"
          />
        </div>

        {/* Champ Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type de Transaction
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as 'DEPENSE' | 'REVENU')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="DEPENSE">Dépense</option>
            <option value="REVENUE">Revenu</option>
          </select>
        </div>

        {/* Champ Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
            required
          />
        </div>

        {/* Bouton de soumission */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {initialTransaction ? 'Mettre à jour' : 'Ajouter la Transaction'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;