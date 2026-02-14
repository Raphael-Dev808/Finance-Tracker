import { TransactionItem } from './TransactionItem';

interface TransactionWithCategory {
  id: string;
  type: string;
  amount: number;
  description: string | null;
  date: string;
  categories: { name: string; color: string; icon: string | null } | null;
}

interface TransactionListProps {
  transactions: TransactionWithCategory[];
  type?: 'receita' | 'despesa';
}

export function TransactionList({ transactions, type }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl bg-slate-800/30 border border-slate-700/50">
        <p className="text-slate-400">Nenhuma transação neste período</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="font-medium text-slate-300 mb-4">
        {type === 'receita' ? 'Receitas' : type === 'despesa' ? 'Despesas' : 'Transações'}
      </h2>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}
