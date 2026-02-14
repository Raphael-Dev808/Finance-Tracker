# Design System - Finance Tracker

## 1. Identidade da Marca

### 1.1 Conceito
O design system transmite uma estética **tecnológica e melancólica**, evocando:
- **Tecnológico**: Interface de fintech, grids sutis, tipografia geométrica, tons frios
- **Melancólico**: Paleta escura, acentos discretos, transições suaves, atmosfera introspectiva
- **Confiança**: Visual profissional para dados financeiros sensíveis

### 1.2 Valores da Marca
- Clareza
- Controle
- Discretude
- Profissionalismo

## 2. Paleta de Cores

### 2.1 Cores Primárias
```css
/* Teal/Cyan - Cor principal (tech + melancólico) */
--teal-50: #f0fdfa;
--teal-100: #ccfbf1;
--teal-200: #99f6e4;
--teal-300: #5eead4;
--teal-400: #2dd4bf;
--teal-500: #14b8a6; /* Primary */
--teal-600: #0d9488; /* Primary Dark */
--teal-700: #0f766e;
--teal-800: #115e59;
--teal-900: #134e4a;

/* Slate - Cor secundária (frio, neutro) */
--slate-50: #f8fafc;
--slate-100: #f1f5f9;
--slate-200: #e2e8f0;
--slate-300: #cbd5e1;
--slate-400: #94a3b8;
--slate-500: #64748b;
--slate-600: #475569;
--slate-700: #334155;
--slate-800: #1e293b;
--slate-900: #0f172a;
```

### 2.2 Backgrounds (Dark Mode - Melancólico)
```css
/* Fundos principais */
--bg-primary: #0f172a;      /* Slate 900 - fundo principal */
--bg-secondary: #1e293b;    /* Slate 800 - cards, modais */
--bg-tertiary: #334155;     /* Slate 700 - hover, bordas sutis */
--bg-elevated: #1e293b;     /* Elementos elevados */
--bg-muted: #0f172a;        /* Áreas de destaque suave */
```

### 2.3 Textos
```css
--text-primary: #f8fafc;    /* Branco suave */
--text-secondary: #94a3b8;  /* Cinza claro */
--text-tertiary: #64748b;   /* Cinza médio */
--text-muted: #475569;      /* Texto desabilitado */
--text-inverse: #0f172a;    /* Texto em fundo claro */
```

### 2.4 Cores Semânticas
```css
/* Receitas - Verde fosco */
--income-light: #064e3b;
--income: #10b981;
--income-dark: #059669;

/* Despesas - Vermelho/coral suave */
--expense-light: #7f1d1d;
--expense: #ef4444;
--expense-dark: #dc2626;

/* Status */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### 2.5 Bordas e Divisores
```css
--border-default: rgba(148, 163, 184, 0.2);
--border-focus: var(--teal-500);
--border-subtle: rgba(15, 23, 42, 0.5);
```

## 3. Tipografia

### 3.1 Fontes
```css
/* Headings - Tech, geométrica */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
--font-heading: 'Space Grotesk', sans-serif;

/* Body - Limpo, legível */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
--font-body: 'DM Sans', sans-serif;

/* Números/Valores - Mono para precisão */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
--font-mono: 'JetBrains Mono', monospace;
```

### 3.2 Escala Tipográfica
```css
--text-display: 3rem;
--text-display-mobile: 2.25rem;

--text-h1: 2rem;
--text-h1-mobile: 1.75rem;

--text-h2: 1.5rem;
--text-h2-mobile: 1.375rem;

--text-h3: 1.25rem;
--text-h3-mobile: 1.125rem;

--text-h4: 1.125rem;
--text-h4-mobile: 1rem;

--text-lg: 1.125rem;
--text-base: 1rem;
--text-sm: 0.875rem;
--text-xs: 0.75rem;
```

### 3.3 Uso Específico
- Valores monetários: `font-mono` para alinhamento e legibilidade
- Títulos de seção: `font-heading` com weight 600
- Corpo: `font-body` com weight 400

## 4. Espaçamento

### 4.1 Escala (Base 4px)
```css
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
```

### 4.2 Container
```css
--container-sm: 24rem;
--container-md: 28rem;
--container-lg: 32rem;
--container-xl: 42rem;
--container-2xl: 56rem;
--container-max: 72rem;
```

## 5. Componentes

### 5.1 Buttons

#### Primary (Ação principal)
```jsx
<button className="
  px-6 py-3 rounded-xl
  bg-teal-500 hover:bg-teal-600
  text-slate-900 font-semibold
  transition-all duration-200
  focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900
">
  Adicionar
</button>
```

#### Secondary (Ações secundárias)
```jsx
<button className="
  px-6 py-3 rounded-xl
  bg-slate-700/50 hover:bg-slate-700
  text-slate-200 font-medium
  border border-slate-600
  transition-all duration-200
">
  Cancelar
</button>
```

#### Ghost
```jsx
<button className="
  px-4 py-2 rounded-lg
  text-slate-400 hover:text-slate-200 hover:bg-slate-800/50
  transition-all duration-200
">
  Ver mais
</button>
```

#### Floating Action Button (estilo Nubank)
```jsx
<button className="
  w-14 h-14 rounded-full
  bg-teal-500 hover:bg-teal-600
  text-slate-900
  shadow-lg shadow-teal-500/25
  flex items-center justify-center
  transition-all duration-200 hover:scale-105
">
  <Plus className="w-6 h-6" />
</button>
```

### 5.2 Cards de Transação
```jsx
<div className="
  p-4 rounded-xl
  bg-slate-800/50 border border-slate-700/50
  hover:border-slate-600/50
  transition-colors duration-200
">
  <div className="flex justify-between items-start">
    <div>
      <p className="text-slate-200 font-medium">Alimentação</p>
      <p className="text-slate-400 text-sm">Supermercado</p>
    </div>
    <span className="font-mono text-expense font-semibold">
      - R$ 150,00
    </span>
  </div>
  <p className="text-slate-500 text-xs mt-2">14 de fev. 2026</p>
</div>
```

### 5.3 Inputs
```jsx
<input className="
  w-full px-4 py-3 rounded-xl
  bg-slate-800/50 border border-slate-600
  text-slate-200 placeholder-slate-500
  focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50
  transition-colors duration-200
" placeholder="Descrição" />
```

### 5.4 Card de Saldo
```jsx
<div className="
  p-6 rounded-2xl
  bg-gradient-to-br from-slate-800 to-slate-900
  border border-slate-700/50
  shadow-xl
">
  <p className="text-slate-400 text-sm">Saldo do mês</p>
  <p className="font-mono text-2xl text-slate-100 mt-1">
    R$ 2.450,00
  </p>
</div>
```

### 5.5 Gráfico (estilo)
- Cores: usar `--teal-*` e `--slate-*` para barras/linhas
- Fundo: `transparent` ou `slate-800/30`
- Grid: linhas sutis `slate-700/30`

### 5.6 Modal
```jsx
<div className="
  fixed inset-0 z-50
  bg-slate-900/80 backdrop-blur-sm
  flex items-center justify-center p-4
">
  <div className="
    w-full max-w-md rounded-2xl
    bg-slate-800 border border-slate-700
    shadow-2xl
  ">
    {/* Conteúdo */}
  </div>
</div>
```

### 5.7 Badge (Receita/Despesa)
```jsx
<span className="
  px-2 py-0.5 rounded-md text-xs font-medium
  bg-income/20 text-income
">
  Receita
</span>
<span className="
  px-2 py-0.5 rounded-md text-xs font-medium
  bg-expense/20 text-expense
">
  Despesa
</span>
```

## 6. Ícones

### 6.1 Biblioteca
```bash
npm install lucide-react
```

### 6.2 Ícones Principais
```tsx
import {
  Wallet,           // Dashboard
  TrendingUp,       // Receitas
  TrendingDown,     // Despesas
  Plus,             // Adicionar
  Minus,            // Remover
  Calendar,         // Período
  PieChart,         // Gráfico
  FileDown,         // Exportar PDF
  LogIn,            // Login
  LogOut,           // Logout
  User,             // Perfil
  Settings,         // Configurações
  Tag,              // Categorias
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  Edit,
  Trash2,
} from 'lucide-react';
```

### 6.3 Tamanhos
```css
--icon-xs: 1rem;   /* 16px */
--icon-sm: 1.25rem;/* 20px */
--icon-md: 1.5rem; /* 24px */
--icon-lg: 2rem;   /* 32px */
```

## 7. Animações

### 7.1 Transições
```css
--transition-fast: 150ms ease-out;
--transition-base: 200ms ease-out;
--transition-slow: 300ms ease-out;
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
```

### 7.2 Keyframes (Tailwind)
```js
keyframes: {
  'fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  'slide-up': {
    '0%': { transform: 'translateY(8px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
}
```

### 7.3 Diretrizes
- Transições suaves e discretas (não chamativas)
- Fade-in para modais e overlays
- Slide-up sutil para listas

## 8. Efeitos Especiais

### 8.1 Gradientes
```css
/* Card de saldo */
--gradient-card: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);

/* Overlay melancólico */
--gradient-overlay: linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.8) 100%);
```

### 8.2 Sombras
```css
--shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2);
--shadow-modal: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 20px rgba(20, 184, 166, 0.15);
```

### 8.3 Border Radius
```css
--radius-sm: 0.5rem;   /* 8px */
--radius-md: 0.75rem;  /* 12px */
--radius-lg: 1rem;     /* 16px */
--radius-xl: 1.5rem;   /* 24px */
--radius-full: 9999px;
```

## 9. Breakpoints

```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

## 10. Configuração Tailwind (Resumo)

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        slate: {
          800: '#1e293b',
          900: '#0f172a',
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
};
```

## 11. Guidelines

### 11.1 Acessibilidade
- Contraste mínimo 4.5:1 para texto
- Estados de foco visíveis (ring teal)
- Suporte a navegação por teclado

### 11.2 Responsividade
- Mobile-first
- Touch targets mínimo 44px
- Valores monetários legíveis em mobile

### 11.3 Consistência Melancólica
- Evitar cores saturadas demais
- Transições lentas e discretas
- Espaços em branco (ou escuros) generosos

---

**Versão**: 1.0  
**Última Atualização**: Fevereiro 2026  
**Estética**: Tecnológica + Melancólica
