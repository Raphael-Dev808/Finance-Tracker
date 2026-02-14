import { formatCurrency, formatDate } from '@/lib/utils/format';

interface TransactionWithCategory {
  id: string;
  type: string;
  amount: number;
  description: string | null;
  date: string;
  categories: { name: string; color: string } | null;
}

interface TransactionItemProps {
  transaction: TransactionWithCategory;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isReceita = transaction.type === 'receita';
  const categoryName = transaction.categories?.name ?? 'Outros';

  return (
    <div
      className="
        p-4 rounded-xl
        bg-slate-800/50 border border-slate-700/50
        hover:border-slate-600/50
        transition-colors duration-200
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-200 font-medium">{categoryName}</p>
          <p className="text-slate-400 text-sm">{transaction.description || '-'}</p>
        </div>
        <span
          className={`font-mono font-semibold ${
            isReceita ? 'text-income' : 'text-expense'
          }`}
        >
          {isReceita ? '+' : '-'} {formatCurrency(transaction.amount)}
        </span>
      </div>
      <p className="text-slate-500 text-xs mt-2">{formatDate(transaction.date)}</p>
    </div>
  );
}
