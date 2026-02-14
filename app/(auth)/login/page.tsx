'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wallet } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="animate-fade-in">
      <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-8">
        <Wallet className="w-6 h-6" />
        <span className="font-heading font-semibold">Finance Tracker</span>
      </Link>

      <h1 className="font-heading font-bold text-2xl text-slate-100 mb-2">
        Entrar
      </h1>
      <p className="text-slate-400 mb-8">
        Acesse sua conta para gerenciar suas finanças
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
        />

        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>

      <p className="mt-6 text-center text-slate-400 text-sm">
        Não tem conta?{' '}
        <Link href="/cadastro" className="text-teal-500 hover:text-teal-400">
          Criar conta
        </Link>
      </p>
      <p className="mt-2 text-center text-slate-500 text-sm">
        <Link href="/recuperar-senha" className="hover:text-slate-400">
          Esqueceu a senha?
        </Link>
      </p>
    </div>
  );
}
