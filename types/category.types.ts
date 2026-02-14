import type { CategoryType } from './database.types';

export interface Category {
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
}

export interface CreateCategoryInput {
  name: string;
  type: CategoryType;
  color?: string;
  icon?: string | null;
}
