# Estrutura do Projeto - Finance Tracker

## 1. Estrutura Completa

```
FinanceTracker/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── app/
│   ├── (auth)/                    # Grupo de rotas: autenticação
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── cadastro/
│   │   │   └── page.tsx
│   │   ├── recuperar-senha/
│   │   │   └── page.tsx
│   │   └── layout.tsx             # Layout centrado para auth
│   │
│   ├── (dashboard)/               # Grupo de rotas: área logada
│   │   ├── page.tsx               # Dashboard principal
│   │   ├── receitas/
│   │   │   └── page.tsx
│   │   ├── despesas/
│   │   │   └── page.tsx
│   │   ├── categorias/
│   │   │   └── page.tsx
│   │   ├── layout.tsx             # Sidebar/Header, proteção de rota
│   │   └── loading.tsx
│   │
│   ├── api/                       # API Routes (se necessário)
│   │   └── export-pdf/
│   │       └── route.ts
│   │
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing ou redirect
│   └── globals.css
│
├── components/
│   ├── ui/                        # Componentes base do Design System
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   └── Skeleton.tsx
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Container.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── dashboard/
│   │   ├── BalanceCard.tsx
│   │   ├── TransactionList.tsx
│   │   ├── TransactionItem.tsx
│   │   ├── MonthFilter.tsx
│   │   └── FloatingActionButton.tsx
│   │
│   ├── charts/
│   │   └── ExpensesChart.tsx
│   │
│   ├── transaction/
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionModal.tsx
│   │   └── TransactionTypeToggle.tsx
│   │
│   ├── category/
│   │   ├── CategoryCard.tsx
│   │   ├── CategoryForm.tsx
│   │   └── CategorySelect.tsx
│   │
│   └── pdf/
│       └── PdfExportButton.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Supabase client (browser)
│   │   ├── server.ts              # Supabase client (server)
│   │   └── middleware.ts          # Refresh session
│   │
│   ├── utils/
│   │   ├── format.ts              # formatCurrency, formatDate
│   │   ├── date.ts                # getMonthRange, etc.
│   │   └── validation.ts
│   │
│   └── constants.ts
│
├── hooks/
│   ├── useTransactions.ts
│   ├── useCategories.ts
│   ├── useBalance.ts
│   ├── useMonthlyFilter.ts
│   └── useAuth.ts
│
├── types/
│   ├── database.types.ts          # Gerado pelo Supabase
│   ├── transaction.types.ts
│   └── category.types.ts
│
├── supabase/
│   ├── migrations/
│   │   ├── 20260214000000_init_profiles.sql
│   │   ├── 20260214000001_init_categories.sql
│   │   ├── 20260214000002_init_transactions.sql
│   │   ├── 20260214000003_rls_policies.sql
│   │   └── 20260214000004_seed_categories.sql
│   └── config.toml
│
├── public/
│   ├── favicon.ico
│   └── icon.svg
│
├── .env.example
├── .env.local                    # Não commitado
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
│
├── PRD.MD
├── DATABASE_SCHEMA.MD
├── DESIGN_SYSTEM.MD
├── ESTRUTURA_PROJETO.MD
├── DEPLOY.MD
└── README.md
```

## 2. Stack Detalhada

### 2.1 Dependências Principais

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "@supabase/ssr": "^0.5.x",
    "@supabase/supabase-js": "^2.x",
    "recharts": "^2.x",
    "jspdf": "^2.x",
    "jspdf-autotable": "^3.x",
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "zod": "^3.x",
    "lucide-react": "^0.x",
    "date-fns": "^3.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/node": "^20.x",
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x",
    "eslint": "^8.x",
    "eslint-config-next": "^14.x"
  }
}
```

### 2.2 package.json - Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "db:types": "supabase gen types typescript --local > types/database.types.ts",
    "db:push": "supabase db push",
    "db:reset": "supabase db reset"
  }
}
```

## 3. Configurações

### 3.1 next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

### 3.2 tailwind.config.ts

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        income: '#10b981',
        expense: '#ef4444',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
```

### 3.3 .env.example

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key

# Opcional: para Server Actions que precisem de service role
# SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

## 4. Configuração Supabase Client

### 4.1 lib/supabase/client.ts

```ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 4.2 lib/supabase/server.ts

```ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

### 4.3 middleware.ts (raiz)

```ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
```

## 5. Fluxo de Rotas

```
/                    → Landing ou redirect para /login ou /dashboard
/login               → Página de login
/cadastro            → Página de cadastro
/recuperar-senha     → Recuperação de senha
/dashboard           → Dashboard (protegida)
/dashboard/receitas  → Lista de receitas
/dashboard/despesas  → Lista de despesas
/dashboard/categorias→ Gestão de categorias
```

## 6. Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia em localhost:3000

# Build e produção
npm run build
npm run start

# Banco de dados
npm run db:types         # Gera tipos do Supabase
npm run db:push          # Aplica migrations
npm run db:reset         # Reset local (DEV)

# Qualidade
npm run lint
npm run typecheck
```

## 7. Convenções

### 7.1 Nomenclatura
- Componentes: PascalCase
- Hooks: camelCase com prefixo `use`
- Arquivos: kebab-case ou PascalCase para componentes
- Rotas: kebab-case (ex: `recuperar-senha`)

### 7.2 Organização
- Componentes reutilizáveis em `components/ui`
- Componentes de domínio em pastas específicas
- Lógica de negócio em hooks
- Tipos centralizados em `types/`

### 7.3 Supabase
- Usar RLS em todas as tabelas
- Client no browser, Server em Server Components/Actions
- Migrations versionadas em `supabase/migrations/`

---

**Versão**: 1.0  
**Framework**: Next.js 14 (App Router)  
**Última Atualização**: Fevereiro 2026
