'use client';

import { useState } from 'react';
import { FileDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PdfExportButtonProps {
  transactions: Array<{
    type: string;
    amount: number;
    description: string | null;
    date: string;
    categories: { name: string } | null;
  }>;
  receitas: number;
  despesas: number;
  saldo: number;
  saldoInicial?: number;
  periodLabel: string;
}

export function PdfExportButton({
  transactions,
  receitas,
  despesas,
  saldo,
  saldoInicial = 0,
  periodLabel,
}: PdfExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const { jsPDF } = await import('jspdf');
      const autoTable = (await import('jspdf-autotable')).default;

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text('Finance Tracker - Relatório', 14, 20);
      doc.setFontSize(12);
      doc.text(periodLabel, 14, 28);

      doc.setFontSize(10);
      let y = 40;
      if (saldoInicial !== 0) {
        doc.text(`Saldo inicial: R$ ${saldoInicial.toFixed(2)}`, 14, y);
        y += 6;
      }
      doc.text(`Receitas: R$ ${receitas.toFixed(2)}`, 14, y);
      doc.text(`Despesas: R$ ${despesas.toFixed(2)}`, 14, y + 6);
      doc.text(`Saldo: R$ ${saldo.toFixed(2)}`, 14, y + 12);

      const tableStartY = saldoInicial !== 0 ? 70 : 60;
      autoTable(doc, {
        startY: tableStartY,
        head: [['Data', 'Tipo', 'Categoria', 'Descrição', 'Valor']],
        body: transactions.map((t) => [
          t.date,
          t.type === 'receita' ? 'Receita' : 'Despesa',
          t.categories?.name ?? '-',
          t.description ?? '-',
          `${t.type === 'receita' ? '+' : '-'} R$ ${t.amount.toFixed(2)}`,
        ]),
      });

      doc.save(`relatorio-${periodLabel.replace(/\s/g, '-')}.pdf`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleExport}
      disabled={loading}
      className="gap-2"
    >
      <FileDown className="w-4 h-4" />
      {loading ? 'Gerando...' : 'Exportar PDF'}
    </Button>
  );
}
