'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@/components/ui/Modal';
import { InitialBalanceForm } from './InitialBalanceForm';

interface InitialBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
  month: number;
  currentValue: number;
}

export function InitialBalanceModal({
  isOpen,
  onClose,
  year,
  month,
  currentValue,
}: InitialBalanceModalProps) {
  const router = useRouter();

  const handleSuccess = () => {
    onClose();
    router.refresh();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Saldo inicial do mês"
    >
      <InitialBalanceForm
        year={year}
        month={month}
        currentValue={currentValue}
        onSuccess={handleSuccess}
        onCancel={onClose}
      />
    </Modal>
  );
}
