-- Saldo inicial do mês: usuário define quanto tinha no início do mês
-- Saldo do mês = initial_balance + receitas - despesas

CREATE TABLE monthly_balances (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  year int NOT NULL,
  month int NOT NULL,
  initial_balance decimal(12,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, year, month)
);

CREATE INDEX idx_monthly_balances_user_period ON monthly_balances(user_id, year, month);

ALTER TABLE monthly_balances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own monthly balances" ON monthly_balances
  FOR ALL USING (auth.uid() = user_id);

CREATE TRIGGER monthly_balances_updated_at BEFORE UPDATE ON monthly_balances
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
