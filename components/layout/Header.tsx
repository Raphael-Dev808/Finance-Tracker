'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wallet, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

export function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 lg:px-8 border-b border-slate-700/50 bg-slate-900/50">
      <Link href="/dashboard" className="flex items-center gap-2 text-slate-200 hover:text-slate-100">
        <Wallet className="w-8 h-8 text-teal-500" />
        <span className="font-heading font-bold text-lg">Finance Tracker</span>
      </Link>
      <Button variant="ghost" onClick={handleLogout} className="gap-2">
        <LogOut className="w-4 h-4" />
        Sair
      </Button>
    </header>
  );
}
