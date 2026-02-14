import Link from 'next/link';
import { Wallet } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      <div className="text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-teal-500/20 text-teal-500 mb-8">
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
            className="px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="px-8 py-4 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-200 font-medium border border-slate-600 transition-colors"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </main>
  );
}
