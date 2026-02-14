import type { TransactionType } from './database.types';

export interface Transaction {
  id: string;
  user_id: string;
  category_id: string;
  type: TransactionType;
  amount: number;
  description: string | null;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionWithCategory extends Transaction {
  categories: {
    name: string;
    color: string;
    icon: string | null;
  } | null;
}

export interface CreateTransactionInput {
  category_id: string;
  type: TransactionType;
  amount: number;
  description?: string | null;
  date: string;
}

export interface UpdateTransactionInput {
  category_id?: string;
  type?: TransactionType;
  amount?: number;
  description?: string | null;
  date?: string;
}
