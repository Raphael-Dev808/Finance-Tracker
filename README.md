# Finance Tracker

Sistema de controle financeiro pessoal (estilo mini Nubank Web) para gerenciamento de receitas e despesas.

## Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + TailwindCSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deploy**: Vercel / Render

## Funcionalidades

- Cadastro e login de usuário
- Adicionar receitas e despesas
- Filtro por mês
- Gráfico de gastos por categoria
- Exportar PDF
- Categorias personalizadas

## Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)

## Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env.local
   ```
3. Preencha no `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` - URL do seu projeto
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chave anônima (Project Settings → API)

### 3. Banco de dados

Execute as migrations no Supabase Dashboard → SQL Editor. Cole o conteúdo de `supabase/migrations/20260214000000_init.sql`.

Ou use a CLI do Supabase:
```bash
npx supabase link
npx supabase db push
```

### 4. Rodar o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build para produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa o linter |
| `npm run typecheck` | Verifica tipos TypeScript |

## Documentação

- [PRD.MD](PRD.MD) - Requisitos do produto
- [DATABASE_SCHEMA.MD](DATABASE_SCHEMA.MD) - Schema do banco
- [DESIGN_SYSTEM.MD](DESIGN_SYSTEM.MD) - Sistema de design
- [ESTRUTURA_PROJETO.MD](ESTRUTURA_PROJETO.MD) - Estrutura do código
- [DEPLOY.MD](DEPLOY.MD) - Instruções de deploy
