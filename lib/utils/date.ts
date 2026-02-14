import {
  startOfMonth,
  endOfMonth,
  subMonths,
  addMonths,
  format,
  getDaysInMonth,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function getMonthRange(year: number, month: number) {
  const date = new Date(year, month - 1, 1);
  return {
    start: format(startOfMonth(date), 'yyyy-MM-dd'),
    end: format(endOfMonth(date), 'yyyy-MM-dd'),
    lastDay: getDaysInMonth(date),
  };
}

export function getMonthLabel(year: number, month: number): string {
  const date = new Date(year, month, 0);
  return format(date, 'MMMM yyyy', { locale: ptBR });
}

export function getCurrentMonth() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
}

export function navigateMonth(year: number, month: number, direction: 'prev' | 'next') {
  const date = new Date(year, month - 1, 1);
  const newDate = direction === 'prev' ? subMonths(date, 1) : addMonths(date, 1);
  return {
    year: newDate.getFullYear(),
    month: newDate.getMonth() + 1,
  };
}
