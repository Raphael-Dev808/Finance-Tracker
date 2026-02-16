'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wallet } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="animate-fade-in">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-8">
          <Wallet className="w-6 h-6" />
          <span className="font-heading font-semibold">Finance Tracker</span>
        </Link>

        <div className="p-6 rounded-xl bg-primary-500/10 border border-primary-500/20">
          <h1 className="font-heading font-bold text-xl text-primary-400 mb-2">
            Email enviado
          </h1>
          <p className="text-slate-300 text-sm mb-6">
            Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
          </p>
          <Link href="/login">
            <Button variant="secondary">Voltar ao login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-8">
        <Wallet className="w-6 h-6" />
        <span className="font-heading font-semibold">Finance Tracker</span>
      </Link>

      <h1 className="font-heading font-bold text-2xl text-slate-100 mb-2">
        Recuperar senha
      </h1>
      <p className="text-slate-400 mb-8">
        Digite seu email para receber o link de redefinição
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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar link'}
        </Button>
      </form>

      <p className="mt-6 text-center text-slate-400 text-sm">
        <Link href="/login" className="text-primary-500 hover:text-primary-400">
          Voltar ao login
        </Link>
      </p>
    </div>
  );
}
