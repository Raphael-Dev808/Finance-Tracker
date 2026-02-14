# PRD - Finance Tracker

## 1. Visão Geral do Produto

### 1.1 Objetivo
Criar um sistema de controle financeiro pessoal (estilo mini Nubank Web) para gerenciamento de receitas e despesas, com visualização por período, gráficos e exportação de relatórios.

### 1.2 Proposta de Valor
- **Para o Usuário**: Controle total das finanças pessoais de forma simples e visual
- **Para o Negócio**: Produto escalável com autenticação e dados segregados por usuário

### 1.3 Público-Alvo
- Pessoas que buscam organizar as finanças pessoais
- Usuários de apps como Nubank, Organizze, GuiaBolso
- Faixa etária: 20-50 anos
- Acesso via web (mobile e desktop)

## 2. Requisitos Funcionais

### 2.1 Cadastro de Usuário
**RF-001**: Sistema deve permitir cadastro com email e senha

**RF-002**: Validação de email único (não duplicado)

**RF-003**: Senha com requisitos mínimos (8+ caracteres, letras e números)

### 2.2 Login
**RF-004**: Login com email e senha

**RF-005**: Persistência de sessão (manter logado)

**RF-006**: Recuperação de senha por email

### 2.3 Receitas e Despesas
**RF-007**: Adicionar receitas com: valor, descrição, data, categoria

**RF-008**: Adicionar despesas com: valor, descrição, data, categoria

**RF-009**: Editar e excluir transações existentes

**RF-010**: Listar transações ordenadas por data (mais recente primeiro)

### 2.4 Filtro por Mês
**RF-011**: Filtrar transações por mês/ano selecionado

**RF-012**: Seletor de período (mês/ano) visível no dashboard

**RF-013**: Resumo do saldo do período filtrado (receitas - despesas)

### 2.5 Gráfico de Gastos
**RF-014**: Exibir gráfico de despesas por categoria no período

**RF-015**: Formato visual intuitivo (pizza ou barras)

**RF-016**: Atualização em tempo real ao alterar filtro ou transações

### 2.6 Exportar PDF
**RF-017**: Exportar relatório do período em PDF

**RF-018**: PDF deve conter: resumo, lista de transações, gráfico (opcional)

### 2.7 Categorias Personalizadas
**RF-019**: Criar categorias customizadas (ex: Alimentação, Transporte)

**RF-020**: Definir tipo da categoria: receita ou despesa

**RF-021**: Associar cor/ícone à categoria (opcional)

**RF-022**: Categorias padrão pré-cadastradas para novo usuário

## 3. Requisitos Não-Funcionais

### 3.1 Performance
**RNF-001**: Tempo de carregamento inicial < 3 segundos

**RNF-002**: Transições suaves entre páginas (SPA-like)

**RNF-003**: Queries otimizadas para filtros por período

### 3.2 Usabilidade
**RNF-004**: Interface minimalista e intuitiva (estilo Nubank)

**RNF-005**: Design responsivo mobile-first

**RNF-006**: Feedback visual em todas as ações (loading, sucesso, erro)

**RNF-007**: Acessibilidade WCAG 2.1 nível AA

### 3.3 Segurança
**RNF-008**: HTTPS obrigatório

**RNF-009**: Dados isolados por usuário (RLS no Supabase)

**RNF-010**: Senhas hasheadas (Supabase Auth)

### 3.4 Compatibilidade
**RNF-011**: Chrome, Edge, Safari, Firefox (últimas versões)

**RNF-012**: Responsivo em telas 320px a 1920px

## 4. Stack Tecnológica

### 4.1 Frontend
```json
{
  "framework": "Next.js 14+ (App Router)",
  "linguagem": "TypeScript",
  "estilização": "TailwindCSS",
  "gráficos": "Recharts",
  "pdf": "jspdf + jspdf-autotable",
  "formulários": "React Hook Form",
  "validação": "Zod",
  "ícones": "Lucide React"
}
```

### 4.2 Backend / Infra
```json
{
  "banco": "Supabase (PostgreSQL)",
  "auth": "Supabase Auth",
  "storage": "Supabase (se necessário)",
  "api": "Next.js API Routes / Server Actions"
}
```

### 4.3 Deploy
```json
{
  "frontend": "Vercel",
  "alternativa": "Render",
  "banco": "Supabase Cloud"
}
```

## 5. Arquitetura do Projeto

### 5.1 Estrutura
```
FinanceTracker/
├── app/
│   ├── (auth)/           # login, cadastro
│   ├── (dashboard)/      # área logada
│   └── api/              # rotas API (se necessário)
├── components/
├── lib/
│   └── supabase/
├── types/
└── supabase/
    └── migrations/
```

### 5.2 Fluxo de Dados
- Next.js Server Components / Client Components
- Supabase Client (browser) e Server (cookies)
- RLS garante isolamento por user_id

## 6. Fluxo do Usuário

### 6.1 Jornada Principal
1. **Landing/Login**: Usuário acessa e faz login ou cadastro
2. **Dashboard**: Visualiza resumo do mês atual
3. **Adicionar**: Clica em "+" e preenche receita ou despesa
4. **Filtrar**: Altera mês/ano para ver períodos anteriores
5. **Gráfico**: Analisa gastos por categoria
6. **Exportar**: Gera PDF do período

### 6.2 Fluxos Alternativos
- Configurar categorias personalizadas
- Editar/excluir transação
- Recuperar senha

## 7. Métricas de Sucesso

### 7.1 KPIs Principais
- Taxa de retenção (usuários que voltam após 7 dias)
- Transações cadastradas por usuário
- Uso da exportação PDF

### 7.2 KPIs Secundários
- Tempo médio na sessão
- Taxa de conclusão de cadastro

## 8. Roadmap

### Fase 1 - MVP (4-6 semanas)
- [ ] Setup Next.js + Supabase
- [ ] Autenticação (cadastro, login)
- [ ] CRUD de receitas e despesas
- [ ] Filtro por mês
- [ ] Gráfico de gastos
- [ ] Categorias padrão
- [ ] Deploy Vercel

### Fase 2 - Melhorias (2-3 semanas)
- [ ] Exportar PDF
- [ ] Categorias personalizadas
- [ ] Recuperação de senha
- [ ] Ajustes de UX

### Fase 3 - Evolução (Contínuo)
- [ ] Metas de economia
- [ ] Gráficos adicionais
- [ ] Relatórios avançados
- [ ] PWA / App mobile

## 9. Riscos e Mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Limite free do Supabase | Alto | Médio | Monitorar uso, planejar upgrade |
| Performance do PDF no mobile | Médio | Baixo | Lazy load, otimizar biblioteca |
| UX confusa para iniciantes | Médio | Médio | Onboarding, tutoriais |
| Dados sensíveis vazando | Alto | Baixo | RLS rigoroso, auditoria |

## 10. Considerações de Design

### 10.1 Identidade Visual
- **Estilo**: Tecnológico e melancólico
- **Cores**: Tons escuros, ciano/teal, slate
- **Tipografia**: Geométrica, moderna
- **Referência**: Nubank, apps fintech minimalistas

### 10.2 UX Principles
- Simplicidade extrema
- Feedback imediato
- Mobile-first
- Consistência visual

---

**Versão**: 1.0  
**Data**: Fevereiro 2026  
**Status**: Em Desenvolvimento
