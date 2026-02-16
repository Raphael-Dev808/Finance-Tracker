'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '@/lib/utils/format';

interface Transaction {
  amount: number;
  categories: { name: string; color: string } | null;
}

interface ExpensesChartProps {
  transactions: Transaction[];
}

const DEFAULT_COLORS = ['#789a99', '#FFD2C2', '#8dadac', '#5f7c7b', '#e8b8a8', '#ef4444'];

export function ExpensesChart({ transactions }: ExpensesChartProps) {
  const data = useMemo(() => {
    const byCategory = transactions.reduce<Record<string, { name: string; value: number; color: string }>>(
      (acc, t) => {
        const name = t.categories?.name ?? 'Outros';
        const color = t.categories?.color ?? DEFAULT_COLORS[Object.keys(acc).length % DEFAULT_COLORS.length];
        if (!acc[name]) {
          acc[name] = { name, value: 0, color };
        }
        acc[name].value += Number(t.amount);
        return acc;
      },
      {}
    );
    return Object.values(byCategory);
  }, [transactions]);

  if (data.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl bg-slate-800/30 border border-slate-700/50">
        <p className="text-slate-400">Nenhuma despesa para exibir no gráfico</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-800/30 border border-slate-700/50 p-6">
      <h2 className="font-medium text-slate-300 mb-4">Gastos por categoria</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              stroke="transparent"
              strokeWidth={1}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '12px',
              }}
              labelStyle={{ color: '#f8fafc' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
