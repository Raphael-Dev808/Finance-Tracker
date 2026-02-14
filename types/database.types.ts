/**
 * Tipos gerados pelo Supabase: npm run db:types
 * Placeholder até executar as migrations
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type TransactionType = 'receita' | 'despesa';
export type CategoryType = 'receita' | 'despesa';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          type: CategoryType;
          color: string;
          icon: string | null;
          is_default: boolean;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          type: CategoryType;
          color?: string;
          icon?: string | null;
          is_default?: boolean;
          order?: number;
        };
        Update: {
          name?: string;
          type?: CategoryType;
          color?: string;
          icon?: string | null;
          order?: number;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          category_id: string;
          type: TransactionType;
          amount: number;
          description: string | null;
          date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id: string;
          type: TransactionType;
          amount: number;
          description?: string | null;
          date: string;
        };
        Update: {
          category_id?: string;
          type?: TransactionType;
          amount?: number;
          description?: string | null;
          date?: string;
          updated_at?: string;
        };
      };
      monthly_balances: {
        Row: {
          id: string;
          user_id: string;
          year: number;
          month: number;
          initial_balance: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          year: number;
          month: number;
          initial_balance?: number;
        };
        Update: {
          year?: number;
          month?: number;
          initial_balance?: number;
          updated_at?: string;
        };
      };
    };
  };
}
