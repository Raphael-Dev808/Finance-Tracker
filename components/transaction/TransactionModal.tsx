'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Modal } from '@/components/ui/Modal';
import { TransactionForm } from './TransactionForm';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'receita' | 'despesa';
  redirectHref?: string;
}

export function TransactionModal({
  isOpen,
  onClose,
  defaultType = 'despesa',
  redirectHref = '/dashboard',
}: TransactionModalProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: string; name: string; type: string; color: string }[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase
        .from('categories')
        .select('id, name, type, color')
        .or(`user_id.is.null,user_id.eq.${user.id}`)
        .eq('type', defaultType)
        .order('order')
        .then(({ data }) => setCategories(data ?? []));
    });
  }, [isOpen, defaultType]);

  const handleSuccess = () => {
    onClose();
    router.push(redirectHref);
    router.refresh();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={defaultType === 'receita' ? 'Nova receita' : 'Nova despesa'}
    >
      <TransactionForm
        type={defaultType}
        categories={categories}
        onSuccess={handleSuccess}
        onCancel={onClose}
      />
    </Modal>
  );
}
