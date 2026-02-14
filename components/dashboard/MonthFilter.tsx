'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMonthLabel, navigateMonth } from '@/lib/utils/date';

interface MonthFilterProps {
  year: number;
  month: number;
}

export function MonthFilter({ year, month }: MonthFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (direction: 'prev' | 'next') => {
    const { year: newYear, month: newMonth } = navigateMonth(year, month, direction);
    const params = new URLSearchParams();
    params.set('year', String(newYear));
    params.set('month', String(newMonth));
    router.push(`${pathname}?${params.toString()}`);
  };

  const label = getMonthLabel(year, month);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleNavigate('prev')}
        className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
        aria-label="Mês anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="font-medium text-slate-200 min-w-[140px] text-center capitalize">
        {label}
      </span>
      <button
        onClick={() => handleNavigate('next')}
        className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
        aria-label="Próximo mês"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
