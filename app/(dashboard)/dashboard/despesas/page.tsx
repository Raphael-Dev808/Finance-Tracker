import { createClient } from '@/lib/supabase/server';
import { Container } from '@/components/layout/Container';
import { MonthFilter } from '@/components/dashboard/MonthFilter';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { FloatingActionButton } from '@/components/dashboard/FloatingActionButton';
import { getMonthRange, getCurrentMonth } from '@/lib/utils/date';

export default async function DespesasPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; year?: string }>;
}) {
  const params = await searchParams;
  const { year: currentYear, month: currentMonth } = getCurrentMonth();
  const year = params.year ? parseInt(params.year, 10) : currentYear;
  const month = params.month ? parseInt(params.month, 10) : currentMonth;

  const { start, end } = getMonthRange(year, month);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: transactions } = await supabase
    .from('transactions')
    .select(`
      *,
      categories (name, color, icon)
    `)
    .eq('user_id', user.id)
    .eq('type', 'despesa')
    .gte('date', start)
    .lte('date', end)
    .order('date', { ascending: false });

  return (
    <Container>
      <div className="space-y-6 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="font-heading font-bold text-2xl text-slate-100">
            Despesas
          </h1>
          <MonthFilter year={year} month={month} />
        </div>

        <TransactionList transactions={transactions ?? []} type="despesa" />
      </div>

      <FloatingActionButton type="despesa" />
    </Container>
  );
}
