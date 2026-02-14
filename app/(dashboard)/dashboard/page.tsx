import { createClient } from '@/lib/supabase/server';
import { Container } from '@/components/layout/Container';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { MonthFilter } from '@/components/dashboard/MonthFilter';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { ExpensesChart } from '@/components/charts/ExpensesChart';
import { FloatingActionButton } from '@/components/dashboard/FloatingActionButton';
import { PdfExportButton } from '@/components/pdf/PdfExportButton';
import { getMonthRange, getCurrentMonth, getMonthLabel } from '@/lib/utils/date';

export default async function DashboardPage({
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

  const [{ data: transactions }, { data: monthlyBalance }] = await Promise.all([
    supabase
      .from('transactions')
      .select(`
        *,
        categories (name, color, icon)
      `)
      .eq('user_id', user.id)
      .gte('date', start)
      .lte('date', end)
      .order('date', { ascending: false }),
    supabase
      .from('monthly_balances')
      .select('initial_balance')
      .eq('user_id', user.id)
      .eq('year', year)
      .eq('month', month)
      .maybeSingle(),
  ]);

  const receitas =
    transactions?.filter((t) => t.type === 'receita').reduce((s, t) => s + Number(t.amount), 0) ?? 0;
  const despesas =
    transactions?.filter((t) => t.type === 'despesa').reduce((s, t) => s + Number(t.amount), 0) ?? 0;
  const saldoInicial = Number(monthlyBalance?.initial_balance ?? 0);
  const saldo = saldoInicial + receitas - despesas;

  return (
    <Container>
      <div className="space-y-6 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="font-heading font-bold text-2xl text-slate-100">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <PdfExportButton
              transactions={transactions ?? []}
              receitas={receitas}
              despesas={despesas}
              saldo={saldo}
              saldoInicial={saldoInicial}
              periodLabel={getMonthLabel(year, month)}
            />
            <MonthFilter year={year} month={month} />
          </div>
        </div>

        <BalanceCard
          receitas={receitas}
          despesas={despesas}
          saldo={saldo}
          saldoInicial={saldoInicial}
          year={year}
          month={month}
        />

        <ExpensesChart
          transactions={transactions?.filter((t) => t.type === 'despesa') ?? []}
        />

        <TransactionList transactions={transactions ?? []} />
      </div>

      <FloatingActionButton />
    </Container>
  );
}
