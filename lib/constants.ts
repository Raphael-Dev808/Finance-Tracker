export const APP_NAME = 'Finance Tracker';

export const TRANSACTION_TYPES = {
  receita: 'receita',
  despesa: 'despesa',
} as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];
