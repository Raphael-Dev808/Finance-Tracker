'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface InitialBalanceFormProps {
  year: number;
  month: number;
  currentValue: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function InitialBalanceForm({
  year,
  month,
  currentValue,
  onSuccess,
  onCancel,
}: InitialBalanceFormProps) {
  const [amount, setAmount] = useState(
    currentValue !== 0 ? String(currentValue).replace('.', ',') : ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError('Usuário não autenticado');
      setLoading(false);
      return;
    }

    const amountNum = parseFloat(amount.replace(',', '.'));
    if (isNaN(amountNum)) {
      setError('Valor inválido');
      setLoading(false);
      return;
    }

    const { error: upsertError } = await supabase.from('monthly_balances').upsert(
      {
        user_id: user.id,
        year,
        month,
        initial_balance: amountNum,
      },
      {
        onConflict: 'monthly_balances_user_id_year_month_key',
      }
    );

    setLoading(false);

    if (upsertError) {
      setError(upsertError.message);
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <p className="text-slate-400 text-sm">
        Quanto você tinha na conta no início deste mês? Ao adicionar receitas, o
        valor entra no saldo; despesas são descontadas.
      </p>

      <Input
        label="Saldo inicial do mês (R$)"
        type="text"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value.replace(/[^\d,.-]/g, ''))
        }
        placeholder="0,00"
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}
