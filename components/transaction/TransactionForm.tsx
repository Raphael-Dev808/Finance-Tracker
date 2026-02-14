'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { format } from 'date-fns';

interface Category {
  id: string;
  name: string;
  type: string;
  color: string;
}

interface TransactionFormProps {
  type: 'receita' | 'despesa';
  categories: Category[];
  onSuccess: () => void;
  onCancel: () => void;
}

export function TransactionForm({
  type,
  categories,
  onSuccess,
  onCancel,
}: TransactionFormProps) {
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('Usuário não autenticado');
      setLoading(false);
      return;
    }

    const amountNum = parseFloat(amount.replace(',', '.'));
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Valor inválido');
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from('transactions').insert({
      user_id: user.id,
      category_id: categoryId,
      type,
      amount: amountNum,
      description: description || null,
      date,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    onSuccess();
  };

  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <Select
        label="Categoria"
        options={categoryOptions}
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      />

      <Input
        label="Valor"
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(/[^\d,.]/g, ''))}
        placeholder="0,00"
        required
      />

      <Input
        label="Descrição"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Opcional"
      />

      <Input
        label="Data"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}
