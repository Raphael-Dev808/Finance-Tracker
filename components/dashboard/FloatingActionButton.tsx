'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { TransactionModal } from '@/components/transaction/TransactionModal';

interface FloatingActionButtonProps {
  type?: 'receita' | 'despesa';
}

export function FloatingActionButton({ type }: FloatingActionButtonProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [modalType, setModalType] = useState<'receita' | 'despesa'>('despesa');
  const menuRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  const query = [year && `year=${year}`, month && `month=${month}`].filter(Boolean).join('&');
  const href = type
    ? `/dashboard/${type}${query ? `?${query}` : ''}`
    : '/dashboard';

  const isDashboard = !type;

  useEffect(() => {
    if (!expanded) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [expanded]);

  const handleMainClick = () => {
    if (isDashboard) {
      setExpanded((prev) => !prev);
    } else {
      setOpen(true);
    }
  };

  const handleOptionClick = (option: 'receita' | 'despesa') => {
    setModalType(option);
    setExpanded(false);
    setOpen(true);
  };

  const effectiveType = isDashboard ? modalType : type!;

  return (
    <>
      <div
        ref={menuRef}
        className="fixed bottom-6 right-6 lg:right-[calc(50%-512px+24px)] z-40"
      >
        <div className="flex flex-col items-end gap-2">
          {isDashboard && expanded && (
            <div className="flex flex-col gap-2 animate-fade-in">
              <button
                type="button"
                onClick={() => handleOptionClick('despesa')}
                className="
                  px-4 py-2.5 rounded-xl text-sm font-medium
                  bg-slate-700 hover:bg-slate-600 text-slate-200
                  transition-colors flex items-center gap-2
                "
              >
                <TrendingDown className="w-4 h-4" />
                Despesa
              </button>
              <button
                type="button"
                onClick={() => handleOptionClick('receita')}
                className="
                  px-4 py-2.5 rounded-xl text-sm font-medium
                  bg-income/20 hover:bg-income/30 text-income
                  transition-colors flex items-center gap-2
                "
              >
                <TrendingUp className="w-4 h-4" />
                Receita
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={handleMainClick}
            className="
              w-14 h-14 rounded-full
              bg-primary-500 hover:bg-primary-600
              text-white
              shadow-lg shadow-primary-500/25
              flex items-center justify-center
              transition-all duration-200 hover:scale-105
            "
            aria-label={type ? `Adicionar ${type}` : 'Adicionar transação'}
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      <TransactionModal
        isOpen={open}
        onClose={() => setOpen(false)}
        defaultType={effectiveType}
        redirectHref={href}
      />
    </>
  );
}
