# Schema do Banco de Dados - Finance Tracker

## 1. Visão Geral

O banco de dados foi projetado para suportar um sistema de controle financeiro pessoal com autenticação por usuário, transações (receitas/despesas) e categorias personalizadas.

### 1.1 Características
- **Multi-tenant**: Dados isolados por usuário (RLS)
- **Escalabilidade**: Índices para filtros por período
- **Flexibilidade**: Categorias customizáveis por usuário
- **Supabase nativo**: Migrações SQL, Auth integrado

### 1.2 Tecnologias
- **Database**: Supabase (PostgreSQL 15+)
- **Auth**: Supabase Auth
- **Migrations**: Supabase CLI / SQL direto

## 2. Diagrama ER

```
┌─────────────────┐       ┌──────────────────────┐
│ auth.users      │       │ profiles             │
│ (Supabase)      │  1:1  │──────────────────────│
│─────────────────│◄─────►│ id (uuid, PK)        │
│ id              │       │ user_id (uuid, FK)   │
│ email           │       │ full_name            │
│ ...             │       │ created_at           │
└─────────────────┘       │ updated_at           │
                          └──────────────────────┘
                                    │
                                    │ 1
                                    │
                                    │ N
                          ┌──────────────────────┐
                          │ categories           │
                          │──────────────────────│
                          │ id (uuid, PK)        │
                          │ user_id (uuid, FK)   │
                          │ name                 │
                          │ type (receita/despesa)│
                          │ color (hex)          │
                          │ icon                 │
                          │ is_default           │
                          └──────────────────────┘
                                    │
                                    │ 1
                                    │
                                    │ N
                          ┌──────────────────────┐
                          │ transactions         │
                          │──────────────────────│
                          │ id (uuid, PK)        │
                          │ user_id (uuid, FK)   │
                          │ category_id (uuid,FK)│
                          │ type (receita/despesa)│
                          │ amount (decimal)     │
                          │ description          │
                          │ date                 │
                          │ created_at           │
                          │ updated_at           │
                          └──────────────────────┘
```

## 3. Tabelas

### 3.1 profiles (Perfil do Usuário)
Extensão de `auth.users` com dados adicionais.

| Campo     | Tipo        | Descrição                    |
|-----------|-------------|------------------------------|
| id        | uuid (PK)   | Identificador único          |
| user_id   | uuid (FK)   | Referência a auth.users      |
| full_name | text        | Nome completo                |
| avatar_url| text        | URL do avatar (opcional)     |
| created_at| timestamptz | Data de criação              |
| updated_at| timestamptz | Data de atualização          |

**Relacionamentos:**
- `user_id` → `auth.users(id)` (unique)

**RLS:** Usuário só acessa seu próprio perfil.

### 3.2 categories (Categorias)
Categorias para classificar transações. Podem ser padrão (is_default) ou criadas pelo usuário.

| Campo      | Tipo        | Descrição                        |
|------------|-------------|----------------------------------|
| id         | uuid (PK)   | Identificador único              |
| user_id    | uuid (FK)   | Dono (null = categoria global)   |
| name       | text        | Nome da categoria                |
| type       | enum        | 'receita' ou 'despesa'           |
| color      | text        | Cor em hex (ex: #0d9488)         |
| icon       | text        | Nome do ícone Lucide (opcional)  |
| is_default | boolean     | Categoria padrão do sistema?     |
| order      | int         | Ordem de exibição                |
| created_at | timestamptz | Data de criação                  |
| updated_at | timestamptz | Data de atualização              |

**Relacionamentos:**
- `user_id` → `auth.users(id)` (nullable para defaults)
- `transactions` → 1:N

**Índices:** `user_id`, `(user_id, type)`, `is_default`

**RLS:** Usuário vê categorias default + suas próprias.

### 3.3 transactions (Transações)
Receitas e despesas do usuário.

| Campo       | Tipo        | Descrição                    |
|-------------|-------------|------------------------------|
| id          | uuid (PK)   | Identificador único          |
| user_id     | uuid (FK)   | Dono da transação            |
| category_id | uuid (FK)   | Categoria                    |
| type        | enum        | 'receita' ou 'despesa'       |
| amount      | decimal(12,2)| Valor (sempre positivo)      |
| description | text        | Descrição                    |
| date        | date        | Data da transação            |
| created_at  | timestamptz | Data de criação              |
| updated_at  | timestamptz | Data de atualização          |

**Relacionamentos:**
- `user_id` → `auth.users(id)`
- `category_id` → `categories(id)`

**Índices:** `user_id`, `(user_id, date)`, `(user_id, type)`, `category_id`

**RLS:** Usuário só acessa suas transações.

## 4. Enums

```sql
CREATE TYPE transaction_type AS ENUM ('receita', 'despesa');
CREATE TYPE category_type AS ENUM ('receita', 'despesa');
```

## 5. Migrações SQL

### 5.1 Criar extensão e tipos
```sql
-- Extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE transaction_type AS ENUM ('receita', 'despesa');
CREATE TYPE category_type AS ENUM ('receita', 'despesa');
```

### 5.2 Tabela profiles
```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 5.3 Tabela categories
```sql
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
CREATE INDEX idx_categories_default ON categories(is_default) WHERE is_default = true;

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Usuário vê categorias default (user_id IS NULL) ou suas próprias
CREATE POLICY "Users can view categories" ON categories
  FOR SELECT USING (
    user_id IS NULL OR user_id = auth.uid()
  );

CREATE POLICY "Users can manage own categories" ON categories
  FOR ALL USING (user_id = auth.uid());
```

### 5.4 Tabela transactions
```sql
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
CREATE INDEX idx_transactions_user_type ON transactions(user_id, type);
CREATE INDEX idx_transactions_category ON transactions(category_id);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own transactions" ON transactions
  FOR ALL USING (user_id = auth.uid());
```

### 5.5 Trigger para created_at/updated_at
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### 5.6 Função para criar perfil automaticamente
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 6. Seed - Categorias Padrão

```sql
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
```

## 7. Queries Comuns

### 7.1 Transações do usuário por período
```typescript
const { data } = await supabase
  .from('transactions')
  .select(`
    *,
    categories (name, color, icon)
  `)
  .eq('user_id', userId)
  .gte('date', `${year}-${month}-01`)
  .lte('date', `${year}-${month}-${lastDay}`)
  .order('date', { ascending: false });
```

### 7.2 Resumo do período (receitas - despesas)
```typescript
const { data: receitas } = await supabase
  .from('transactions')
  .select('amount')
  .eq('user_id', userId)
  .eq('type', 'receita')
  .gte('date', startDate)
  .lte('date', endDate);

const { data: despesas } = await supabase
  .from('transactions')
  .select('amount')
  .eq('user_id', userId)
  .eq('type', 'despesa')
  .gte('date', startDate)
  .lte('date', endDate);

const totalReceitas = receitas?.reduce((s, t) => s + Number(t.amount), 0) ?? 0;
const totalDespesas = despesas?.reduce((s, t) => s + Number(t.amount), 0) ?? 0;
const saldo = totalReceitas - totalDespesas;
```

### 7.3 Despesas por categoria (para gráfico)
```typescript
const { data } = await supabase
  .from('transactions')
  .select(`
    amount,
    categories (name, color)
  `)
  .eq('user_id', userId)
  .eq('type', 'despesa')
  .gte('date', startDate)
  .lte('date', endDate);

// Agrupar por categoria no cliente
const porCategoria = data?.reduce((acc, t) => {
  const cat = t.categories?.name ?? 'Outros';
  acc[cat] = (acc[cat] ?? 0) + Number(t.amount);
  return acc;
}, {} as Record<string, number>);
```

### 7.4 Categorias disponíveis para o usuário
```typescript
const { data } = await supabase
  .from('categories')
  .select('*')
  .or(`user_id.is.null,user_id.eq.${userId}`)
  .eq('type', 'despesa')
  .order('order', { ascending: true });
```

## 8. Estrutura de Pastas Supabase

```
supabase/
├── migrations/
│   ├── 20260214000000_init_profiles.sql
│   ├── 20260214000001_init_categories.sql
│   ├── 20260214000002_init_transactions.sql
│   ├── 20260214000003_rls_policies.sql
│   └── 20260214000004_seed_categories.sql
└── config.toml
```

## 9. Comandos Supabase CLI

```bash
# Inicializar projeto
supabase init

# Criar migration
supabase migration new nome_da_migration

# Aplicar migrations localmente
supabase db reset

# Gerar tipos TypeScript
supabase gen types typescript --local > types/database.types.ts

# Push para Supabase remoto
supabase db push
```

---

**Versão do Schema**: 1.0  
**Database**: Supabase (PostgreSQL 15+)  
**Última Atualização**: Fevereiro 2026
