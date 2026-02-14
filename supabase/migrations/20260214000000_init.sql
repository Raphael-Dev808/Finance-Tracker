-- Finance Tracker - Migration inicial
-- Execute no Supabase Dashboard > SQL Editor ou via: supabase db push

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE transaction_type AS ENUM ('receita', 'despesa');
CREATE TYPE category_type AS ENUM ('receita', 'despesa');

-- Tabela profiles
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Tabela categories
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  type category_type NOT NULL,
  color text DEFAULT '#0d9488',
  icon text,
  is_default boolean DEFAULT false,
  "order" int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_categories_user_id ON categories(user_id);
CREATE INDEX idx_categories_user_type ON categories(user_id, type);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view categories" ON categories
  FOR SELECT USING (user_id IS NULL OR user_id = auth.uid());

CREATE POLICY "Users can manage own categories" ON categories
  FOR ALL USING (user_id = auth.uid());

-- Tabela transactions
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE RESTRICT NOT NULL,
  type transaction_type NOT NULL,
  amount decimal(12,2) NOT NULL CHECK (amount > 0),
  description text,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_user_date ON transactions(user_id, date DESC);
CREATE INDEX idx_transactions_category ON transactions(category_id);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own transactions" ON transactions
  FOR ALL USING (user_id = auth.uid());

-- Trigger updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER transactions_updated_at BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Criar perfil ao registrar usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed categorias padrão
INSERT INTO categories (user_id, name, type, color, icon, is_default, "order") VALUES
(NULL, 'Salário', 'receita', '#10b981', 'Briefcase', true, 1),
(NULL, 'Freelance', 'receita', '#3b82f6', 'Laptop', true, 2),
(NULL, 'Investimentos', 'receita', '#8b5cf6', 'TrendingUp', true, 3),
(NULL, 'Outros', 'receita', '#6b7280', 'MoreHorizontal', true, 99),
(NULL, 'Alimentação', 'despesa', '#ef4444', 'UtensilsCrossed', true, 1),
(NULL, 'Transporte', 'despesa', '#f59e0b', 'Car', true, 2),
(NULL, 'Moradia', 'despesa', '#ec4899', 'Home', true, 3),
(NULL, 'Saúde', 'despesa', '#06b6d4', 'Heart', true, 4),
(NULL, 'Educação', 'despesa', '#6366f1', 'BookOpen', true, 5),
(NULL, 'Lazer', 'despesa', '#14b8a6', 'Film', true, 6),
(NULL, 'Outros', 'despesa', '#6b7280', 'MoreHorizontal', true, 99);
