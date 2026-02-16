# Guia de Deploy - Finance Tracker

Este projeto é **Next.js 14** com **Supabase**. Segue como fazer deploy na **Vercel** e no **Render**.

---

## ⚠️ Antes de qualquer deploy

1. **Não faça commit do arquivo `.env`** – suas chaves não devem ir para o repositório.
2. Adicione `.env` e `.env.local` ao `.gitignore` (se ainda não estiver).
3. Você vai configurar as **mesmas variáveis de ambiente** na plataforma de deploy.

Variáveis necessárias:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 1. Deploy na Vercel (recomendado para Next.js)

A Vercel é a plataforma oficial do Next.js e costuma ser a opção mais simples.

### Passo a passo

1. **Crie uma conta** em [vercel.com](https://vercel.com) (pode usar login com GitHub).

2. **Conecte o repositório**
   - Clique em **Add New** → **Project**.
   - Importe o repositório do GitHub (ou GitLab/Bitbucket) onde está o Finance Tracker.
   - Se o projeto ainda não estiver no GitHub, faça push primeiro.

3. **Configuração do projeto**
   - **Framework Preset**: Vercel detecta Next.js automaticamente.
   - **Root Directory**: deixe em branco se o código está na raiz do repo.
   - **Build Command**: `npm run build` (padrão).
   - **Output Directory**: deixe o padrão (Next.js cuida disso).
   - **Install Command**: `npm install`.

4. **Variáveis de ambiente**
   - Na mesma tela (ou em **Settings → Environment Variables**), adicione:
     - `NEXT_PUBLIC_SUPABASE_URL` = sua URL do Supabase
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sua chave anônima do Supabase
   - Marque **Production**, **Preview** e **Development** se quiser usar em todos os ambientes.

5. **Deploy**
   - Clique em **Deploy**.
   - Cada push na branch principal (ex.: `main`) gera um novo deploy automático.

### Deploy via CLI (opcional)

```bash
npm i -g vercel
vercel login
vercel
```

Siga as perguntas; depois configure as variáveis no dashboard da Vercel.

---

## 2. Deploy no Render

No Render você pode publicar o Next.js como **Web Service** (recomendado para usar SSR e rotas dinâmicas).

### Passo a passo

1. **Conta** em [render.com](https://render.com) (login com GitHub).

2. **Novo Web Service**
   - **Dashboard** → **New +** → **Web Service**.
   - Conecte o repositório do projeto e selecione o repo do Finance Tracker.

3. **Configurações do serviço**
   - **Name**: ex. `finance-tracker`.
   - **Region**: escolha a mais próxima (ex. Oregon).
   - **Branch**: `main` (ou a branch que você usa).
   - **Runtime**: **Node**.
   - **Build Command**:
     ```bash
     npm install && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
   - **Instance Type**: Free (ou pago, se preferir).

4. **Variáveis de ambiente**
   - Em **Environment** (ou **Environment Variables**), adicione:
     - `NEXT_PUBLIC_SUPABASE_URL` = sua URL do Supabase
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sua chave anônima do Supabase

5. **Deploy**
   - Clique em **Create Web Service**.
   - O primeiro deploy pode levar alguns minutos.

### Observação para Next.js no Render

- No plano **Free**, o serviço “dorme” após inatividade; a primeira requisição pode demorar mais.
- A URL será algo como: `https://finance-tracker-xxxx.onrender.com`.

---

## 3. Cron Job para manter o site acordado

Se você usa **Render** (plano Free) ou outra plataforma que dorme por inatividade, configure um cron para acordar o site periodicamente.

### Endpoint disponível

O projeto inclui a rota `/api/cron/ping`, leve e rápida:

```
https://seu-site.com/api/cron/ping
```

### Como configurar

**Opção A: cron-job.org (gratuito)**

1. Crie conta em [cron-job.org](https://cron-job.org).
2. **New Cronjob**:
   - **Title**: `Finance Tracker - Keep Awake`
   - **URL**: `https://seu-dominio.onrender.com/api/cron/ping` (ou sua URL real)
   - **Schedule**: a cada **14 minutos** (ex: `*/14 * * * *`)
3. Salve. O site será acessado automaticamente e não dormirá.

**Opção B: UptimeRobot (gratuito)**

1. Crie conta em [uptimerobot.com](https://uptimerobot.com).
2. **Add New Monitor**:
   - **Monitor Type**: HTTP(s)
   - **Friendly name**: `Finance Tracker`
   - **URL**: `https://seu-dominio.com/api/cron/ping`
   - **Monitoring Interval**: 5 minutos (plano gratuito)
3. Salve. Além de manter acordado, você ganha alertas se o site cair.

**Opção C: Vercel Cron** (requer plano Pro)

Crie `vercel.json` na raiz do projeto:

```json
{
  "crons": [
    {
      "path": "/api/cron/ping",
      "schedule": "*/14 * * * *"
    }
  ]
}
```

### Intervalo recomendado

- **Render**: ping a cada **10–14 minutos** (dorme após ~15 min sem requisições).
- **Vercel**: geralmente não precisa; cold start é rápido.

---

## 4. Confirmação de email (opcional)

Para exigir que o usuário confirme o email ao criar conta:

1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard).
2. Selecione seu projeto → **Authentication** → **Providers** → **Email**.
3. Ative **Confirm email**.
4. Personalize o template em **Authentication** → **Email Templates** (opcional).

Quando ativado, o usuário recebe um link no email e precisa clicar para confirmar antes de entrar.

---

## Resumo rápido

| Plataforma | Quando usar | Deploy automático |
|------------|-------------|-------------------|
| **Vercel** | Next.js, preview por branch, edge | Sim (push no Git) |
| **Render** | Backend Node, DB no mesmo ecossistema, preferência por Render | Sim (push no Git) |

Para este projeto (Next.js + Supabase), **Vercel** costuma ser a opção mais direta; use **Render** se quiser manter tudo na mesma plataforma ou já tiver outros serviços lá.

Depois do deploy, teste login, cadastro e as telas que usam Supabase para garantir que as variáveis estão corretas.
