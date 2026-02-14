# Deploy - Finance Tracker

Para o Finance Tracker ficar online 24/7 e qualquer pessoa acessar pelo link.

## Visão Geral

- **Frontend + API**: Next.js (full-stack) → **Vercel** (principal) ou **Render** (alternativa)
- **Banco de dados**: **Supabase** (PostgreSQL + Auth)
- **Domínio**: Opcional (Vercel/Render oferecem subdomínio grátis)

O Next.js roda tanto o frontend quanto as API Routes/Server Actions. O Supabase fornece banco e autenticação.

---

## 1. Preparação - Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Anote:
   - **Project URL** (ex: `https://xxxx.supabase.co`)
   - **Anon/Public Key** (em Project Settings → API)
3. Execute as migrations (veja [DATABASE_SCHEMA.MD](DATABASE_SCHEMA.MD))
4. Em Authentication → URL Configuration:
   - **Site URL**: `https://seu-app.vercel.app` (atualize após deploy)
   - **Redirect URLs**: adicione `https://seu-app.vercel.app/**`

---

## 2. Deploy na Vercel (Principal)

1. Crie conta em [vercel.com](https://vercel.com) (pode usar GitHub)
2. **Add New → Project** e importe o repositório
3. Configure:
   - **Framework Preset**: Next.js (detectado automaticamente)
   - **Root Directory**: raiz do repositório
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: `.next` (padrão)
   - **Install Command**: `npm install`

4. Em **Environment Variables** adicione:

   | Nome | Valor |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |

5. Clique em **Deploy**
6. Anote a URL: `https://finance-tracker-xxx.vercel.app`

### Atualizar Supabase
- Em Supabase → Authentication → URL Configuration
- **Site URL**: `https://finance-tracker-xxx.vercel.app`
- **Redirect URLs**: `https://finance-tracker-xxx.vercel.app/**`

---

## 3. Deploy no Render (Alternativa)

Use o Render se preferir hospedar fora da Vercel.

1. Crie conta em [render.com](https://render.com)
2. **New → Web Service**
3. Conecte o repositório GitHub
4. Configure:

   | Campo | Valor |
   |-------|-------|
   | **Name** | `finance-tracker` |
   | **Region** | Oregon (US West) ou São Paulo (se disponível) |
   | **Root Directory** | (vazio = raiz) |
   | **Runtime** | Node |
   | **Build Command** | `npm install && npm run build` |
   | **Start Command** | `npm start` ou `npx next start` |

5. Em **Environment** adicione:

   | Key | Value |
   |----|-------|
   | `NODE_ENV` | `production` |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |

6. **Create Web Service**
7. Anote a URL: `https://finance-tracker.onrender.com`

**Observação:** No plano free, o serviço "dorme" após ~15 min sem acesso. A primeira requisição pode demorar 30-60 segundos.

### render.yaml (opcional)

Crie na raiz do projeto para deploy via Git:

```yaml
services:
  - type: web
    name: finance-tracker
    runtime: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: NEXT_PUBLIC_SUPABASE_URL
        sync: false
      - key: NEXT_PUBLIC_SUPABASE_ANON_KEY
        sync: false
```

---

## 4. Resumo das URLs

| Onde | URL exemplo |
|------|-------------|
| **Site (Vercel)** | `https://finance-tracker.vercel.app` |
| **Site (Render)** | `https://finance-tracker.onrender.com` |
| **Supabase Dashboard** | `https://app.supabase.com/project/xxx` |

---

## 5. Atualizar o site depois

- **Push no Git** → Vercel e Render fazem deploy automático (se o repositório estiver conectado)
- **Migrations do banco**: rode localmente com `supabase db push` (apontando para o projeto remoto) ou via Supabase Dashboard → SQL Editor
- **Variáveis de ambiente**: altere no painel da Vercel/Render e faça um redeploy se necessário

---

## 6. Domínio próprio (opcional)

### Vercel
1. Project Settings → Domains
2. Adicione `www.seudominio.com.br`
3. Configure os registros DNS conforme instruções da Vercel

### Render
1. Settings → Custom Domains
2. Adicione o domínio e configure o CNAME

### Supabase
- Atualize **Site URL** e **Redirect URLs** com o novo domínio

---

## 7. Checklist pós-deploy

- [ ] Login funciona com email/senha
- [ ] Cadastro cria usuário e perfil
- [ ] Transações aparecem no dashboard
- [ ] Filtro por mês funciona
- [ ] Gráfico carrega corretamente
- [ ] Exportar PDF gera arquivo
- [ ] Categorias padrão existem para novos usuários

---

**Última Atualização**: Fevereiro 2026
