import Link from 'next/link';
import { Wallet } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      <div className="text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-peach-500/30 text-peach-500 mb-8">
          <Wallet className="w-10 h-10" />
        </div>
        <h1 className="font-heading font-bold text-4xl text-slate-100 mb-2">
          Finance Tracker
        </h1>
        <p className="text-slate-400 text-lg mb-12 max-w-md">
          Controle suas finanças pessoais de forma simples e visual
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-4 rounded-xl bg-peach-500 hover:bg-peach-600 text-slate-900 font-semibold transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="px-8 py-4 rounded-xl bg-accent-500/20 hover:bg-accent-500/30 text-accent-400 font-medium border border-accent-500/50 transition-colors"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </main>
  );
}
