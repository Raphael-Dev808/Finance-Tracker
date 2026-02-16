'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wallet } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function CadastroPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // Se confirmação de email está ativa e o usuário precisa confirmar
    if (data.user && !data.session && data.user.identities?.length) {
      setSuccess(
        'Conta criada! Verifique seu email e clique no link para confirmar sua conta antes de entrar.'
      );
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
        Criar conta
      </h1>
      <p className="text-slate-400 mb-8">
        Comece a controlar suas finanças hoje
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 rounded-xl bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm">
            {success}
          </div>
        )}

        <Input
          label="Nome completo"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Seu nome"
        />

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
          placeholder="Mínimo 8 caracteres"
          required
          minLength={8}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Criando conta...' : 'Criar conta'}
        </Button>
      </form>

      <p className="mt-6 text-center text-slate-400 text-sm">
        Já tem conta?{' '}
        <Link href="/login" className="text-primary-500 hover:text-primary-400">
          Entrar
        </Link>
      </p>
    </div>
  );
}
