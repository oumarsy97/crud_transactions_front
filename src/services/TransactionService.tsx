// services/TransactionService.ts
import axios, { AxiosInstance } from 'axios';
import { Transaction, CreateTransactionInput, UpdateTransactionInput } from '../types';

class TransactionService {
    private http: AxiosInstance;

    constructor() {
        this.http = axios.create({
             baseURL: 'https://crud-transactions-back.onrender.com/api/transactions',
           // baseURL: 'http://localhost:8000/api/transactions',
        });
    }

    async getTransactions(): Promise<Transaction[]> {
        const response = await this.http.get('');
        console.log(response.data);
        return response.data;
    }

    async createTransaction(
        input: CreateTransactionInput
    ): Promise<Transaction> {
        const response = await this.http.post('/createTransaction', input);
        return response.data;
    }

    async updateTransaction(
        id: string,
        input: UpdateTransactionInput
    ): Promise<Transaction> {
        const response = await this.http.patch(`/updateTransaction/${id}`, input);
        return response.data;
    }

    async deleteTransaction(id: string): Promise<void> {
        await this.http.delete(`/${id}`);
    }
}

export default TransactionService;
