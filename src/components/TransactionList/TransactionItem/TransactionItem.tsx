import React from 'react';
import { Transaction } from '../../../types';

interface TransactionItemProps {
   transaction: Transaction;
   onUpdate?: (id: string, updates: any) => void;
   onDelete?: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
   transaction,
   onUpdate,
   onDelete
}) => {
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

   return (
     <div className="bg-white shadow-md rounded-lg p-4 mb-2">
       <div className="flex justify-between items-center">
         <div>
           <div className="text-lg font-semibold">
             {formatAmount(transaction.amount)}
           </div>
           <div className="text-gray-600">
             {transaction.description}
           </div>
           <div className="text-sm text-gray-500">
             Type: <span className={transaction.type === 'REVENU' ? 'text-green-500' : 'text-red-500'}>{transaction.type}</span>
           </div>
           <div className="text-sm text-gray-500">
             Date: {formatDate(transaction.createdAt)}
           </div>
         </div>
         <div className="flex space-x-2">
           {onUpdate && (
             <button 
               onClick={() => onUpdate(transaction.id, {})}
               className="text-blue-500 hover:text-blue-700 px-3 py-1 border border-blue-500 rounded"
             >
               Modifier
             </button>
           )}
           {onDelete && (
             <button
               onClick={() => onDelete(transaction.id)}
               className="text-red-500 hover:text-red-700 px-3 py-1 border border-red-500 rounded"
             >
               Supprimer
             </button>
           )}
         </div>
       </div>
     </div>
   );
};

export default TransactionItem;
