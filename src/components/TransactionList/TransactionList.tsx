import React, { useState } from 'react';
import { Transaction } from '../../types';

interface TransactionListProps {
  transactions: Transaction[];
  onUpdateTransaction?: (transaction: Transaction) => void;
  onDeleteTransaction?: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onUpdateTransaction,
  onDeleteTransaction,
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date invalide';
    const [year, month, day] = dateString.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'CFA',
    }).format(amount);
  };

  const handleUpdateClick = (transaction: Transaction) => {
    if (onUpdateTransaction) {
      onUpdateTransaction(transaction);
    }
  };

  const handleDeleteClick = (id: string) => {
    setShowDeleteConfirmation(id);
  };

  const confirmDelete = (id: string) => {
    if (onDeleteTransaction) {
      onDeleteTransaction(id);
    }
    setShowDeleteConfirmation(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold p-4 bg-gray-100 border-b">
        Transactions
      </h2>

      {transactions.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          Aucune transaction trouvée
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left">Montant</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4 text-left whitespace-nowrap">
                  {formatAmount(transaction.amount)}
                </td>
                <td className="py-3 px-4 text-left">
                  {transaction.description}
                </td>
                <td className="py-3 px-4 text-left">
                  {transaction.type === 'DEPENSE' ? 'Dépense' : 'Revenu'}
                </td>
                <td className="py-3 px-4 text-left">
                  {formatDate(transaction.createdAt)}
                </td>
                <td className="py-3 px-4 text-center">
                  {onUpdateTransaction && (
                    <button
                      onClick={() => handleUpdateClick(transaction)}
                      className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-100 transition-colors mr-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  )}
                  {onDeleteTransaction && (
                    <button
                      onClick={() => handleDeleteClick(transaction.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Confirmer la suppression</h3>
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer cette transaction ?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={() => confirmDelete(showDeleteConfirmation)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;