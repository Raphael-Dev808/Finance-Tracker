'use client';

import { useState } from 'react';
import { Wallet } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils/format';
import { InitialBalanceModal } from './InitialBalanceModal';

interface BalanceCardProps {
  receitas: number;
  despesas: number;
  saldo: number;
  saldoInicial: number;
  year: number;
  month: number;
}

export function BalanceCard({
  receitas,
  despesas,
  saldo,
  saldoInicial,
  year,
  month,
}: BalanceCardProps) {
  const [showInitialBalanceModal, setShowInitialBalanceModal] = useState(false);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900">
          <p className="text-slate-400 text-sm">Receitas</p>
          <p className="font-mono text-xl text-income mt-1">
            {formatCurrency(receitas)}
          </p>
        </Card>
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900">
          <p className="text-slate-400 text-sm">Despesas</p>
          <p className="font-mono text-xl text-expense mt-1">
            {formatCurrency(despesas)}
          </p>
        </Card>
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-teal-500/30">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-slate-400 text-sm">Saldo do mês</p>
              <p
                className={`font-mono text-xl mt-1 ${
                  saldo >= 0 ? 'text-teal-400' : 'text-expense'
                }`}
              >
                {formatCurrency(saldo)}
              </p>
              {saldoInicial !== 0 ? (
                <p className="text-slate-500 text-xs mt-1">
                  (inicial: {formatCurrency(saldoInicial)})
                </p>
              ) : (
                <p className="text-slate-500 text-xs mt-1">
                  Clique no ícone para definir o saldo inicial
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowInitialBalanceModal(true)}
              className="shrink-0 p-2 min-w-0"
              aria-label="Definir saldo inicial do mês"
            >
              <Wallet className="w-4 h-4 text-slate-400" />
            </Button>
          </div>
        </Card>
      </div>

      <InitialBalanceModal
        isOpen={showInitialBalanceModal}
        onClose={() => setShowInitialBalanceModal(false)}
        year={year}
        month={month}
        currentValue={saldoInicial}
      />
    </>
  );
}
