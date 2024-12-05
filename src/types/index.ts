// types/index.ts
export type TransactionType = 'REVENU' | 'DEPENSE';

export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType; // Utilisation de l'union de types ici
    description: string;
    createdAt: string;
}

export interface CreateTransactionInput {
    amount: number;
    description: string;
    type: TransactionType;
    createdAt?: string;
}

export interface UpdateTransactionInput {
    amount?: number;
    description?: string;
    type?: TransactionType;
    createdAt?: string;
}
