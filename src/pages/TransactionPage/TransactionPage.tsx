import React, { useState, useEffect } from 'react';
import { TransactionService } from '../../services';
import { Transaction, CreateTransactionInput, UpdateTransactionInput } from '../../types';
import TransactionList from '../../components/TransactionList/TransactionList';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import Layout from '../../components/Layout/Layout';

const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined);
  const transactionService = new TransactionService();

  useEffect(() => {
    // Fetching transactions on component mount
    const fetchTransactions = async () => {
      try {
        const transactions = await transactionService.getTransactions();
        setTransactions(transactions);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        alert('Impossible de charger les transactions');
      }
    };
    
    fetchTransactions();
  }, []); 

  const handleCreateTransaction = async (input: CreateTransactionInput) => {
    try {
      const newTransaction = await transactionService.createTransaction(input);
      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
      // Reset selected transaction after creating a new one
      setSelectedTransaction(undefined);
    } catch (error) {
      console.error('Failed to create transaction:', error);
      alert('Impossible de créer la transaction');
    }
  };

  const handleUpdateTransaction = async (id: string, input: Partial<UpdateTransactionInput>) => {
    try {
      const updatedTransaction = await transactionService.updateTransaction(id, input);
      setTransactions((prevTransactions) =>
        prevTransactions.map((t) => (t.id === id ? updatedTransaction : t))
      );
      // Reset selected transaction after update
      setSelectedTransaction(undefined);
    } catch (error) {
      console.error('Failed to update transaction:', error);
      alert('Impossible de mettre à jour la transaction');
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await transactionService.deleteTransaction(id);
      setTransactions((prevTransactions) =>
        prevTransactions.filter((t) => t.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      alert('Impossible de supprimer la transaction');
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    // When edit is clicked in the list, set the selected transaction
    setSelectedTransaction(transaction);
  };

  const handleCancelEdit = () => {
    // Method to cancel editing and clear selected transaction
    setSelectedTransaction(undefined);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <TransactionForm  
          initialTransaction={selectedTransaction} 
          onCreateTransaction={handleCreateTransaction}
          onUpdateTransaction={(id, input) => handleUpdateTransaction(id, input)}
          onCancelEdit={handleCancelEdit}
        />
        <TransactionList 
          transactions={transactions} 
          onUpdateTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    </Layout>
  );
};

export default TransactionPage;