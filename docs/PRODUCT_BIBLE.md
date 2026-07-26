# Product Bible — Evolução Física

> **Versão:** 1.0  
> **Status:** Documento fundacional — fonte oficial de decisões do produto  
> **Última atualização:** Julho 2026  
> **Escopo desta fase:** Estratégia, UX e arquitetura conceitual. Sem interfaces, sem código.

---

## Índice

1. [Manifesto do Produto](#1-manifesto-do-produto)
2. [Visão de Longo Prazo](#2-visão-de-longo-prazo)
3. [Missão](#3-missão)
4. [Problema Central](#4-problema-central)
5. [Dores Reais dos Usuários](#5-dores-reais-dos-usuários)
6. [Oportunidades de Mercado](#6-oportunidades-de-mercado)
7. [Filosofia do Produto](#7-filosofia-do-produto)
8. [Princípios de UX](#8-princípios-de-ux)
9. [Princípios de Design](#9-princípios-de-design)
10. [O Que Nunca Faremos](#10-o-que-nunca-faremos)
11. [Diferenciais Estratégicos](#11-diferenciais-estratégicos)
12. [Roadmap Macro do Produto](#12-roadmap-macro-do-produto)
13. [Estrutura Inicial dos Módulos](#13-estrutura-inicial-dos-módulos)

---

## 1. Manifesto do Produto

**Evolução física não é um destino. É um sistema.**

Acreditamos que transformar o corpo exige mais do que motivação pontual — exige clareza, consistência e adaptação contínua. O mercado está cheio de apps que prometem resultados rápidos, planos genéricos e métricas vazias. Nós existimos para fazer o oposto.

**Nosso compromisso:**

- Tratar cada pessoa como um sistema biológico único, não como um template de planilha.
- Unir treino, nutrição e hábitos em uma narrativa coerente — porque o corpo não separa essas dimensões, e nosso produto também não deve.
- Usar inteligência artificial como copiloto de decisão, nunca como oráculo infalível ou substituto de consciência corporal.
- Medir progresso de forma honesta: tendências, não snapshots; processo, não apenas resultado.
- Construir para quem quer evoluir por anos, não para quem busca um hack de 30 dias.

**Somos o sistema operacional da evolução física pessoal** — onde dados, rotina e inteligência se encontram para transformar intenção em progresso mensurável e sustentável.

---

## 2. Visão de Longo Prazo

**Em 5 anos, ser a plataforma de referência para evolução física orientada por dados e hábitos no mercado lusófono** — reconhecida por transformar comportamento de longo prazo, não por promessas de curto prazo.

### Horizonte estratégico

| Horizonte | Estado desejado |
|-----------|-----------------|
| **Ano 1** | Produto core validado: treino + nutrição + hábitos integrados, com IA contextual e base sólida de retenção |
| **Ano 2–3** | Ecossistema expandido: integrações wearables, comunidade qualificada, camada profissional (personal/nutricionista) |
| **Ano 4–5** | Plataforma de inteligência de performance pessoal: predição, periodização automática, benchmarks populacionais anonimizados |

### O que queremos que as pessoas digam

> *"Antes eu tinha cinco apps e nenhuma clareza. Agora tenho um sistema que entende minha rotina e me ajuda a evoluir sem me sobrecarregar."*

---

## 3. Missão

**Empoderar pessoas a evoluírem fisicamente de forma consciente, consistente e personalizada** — conectando treino, nutrição, hábitos e inteligência artificial em uma experiência unificada que respeita a individualidade biológica, emocional e de rotina de cada usuário.

---

## 4. Problema Central

### A fragmentação da evolução física

Pessoas que buscam evoluir fisicamente enfrentam um ecossistema digital **fragmentado, genérico e desconectado da realidade**:

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  App de treino  │   │ App de dieta    │   │ App de hábitos  │
│  (genérico)     │   │ (calorias only) │   │ (streaks vazios)│
└────────┬────────┘   └────────┬────────┘   └────────┬────────┘
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   USUÁRIO SOZINHO   │
                    │  juntando peças,    │
                    │  sem visão sistêmica│
                    └─────────────────────┘
```

**Consequências:**

- Planos de treino desalinhados com alimentação e recuperação
- Dados espalhados sem correlação (peso, sono, performance, humor)
- Abandono após 2–4 semanas por sobrecarga cognitiva ou falta de feedback significativo
- Dependência de conteúdo genérico ou de profissionais caros, sem caminho intermediário
- IA usada como gimmick (chat genérico) em vez de motor de personalização real

### O que resolvemos

Unificamos **treino + nutrição + hábitos + inteligência adaptativa** em um sistema coerente que:

1. **Contextualiza** — entende rotina, limitações, equipamentos, histórico
2. **Adapta** — ajusta planos com base em feedback real, não em suposições
3. **Conecta** — mostra como uma dimensão impacta a outra
4. **Simplifica** — reduz decisões desnecessárias, preserva autonomia nas importantes

---

## 5. Dores Reais dos Usuários

### Persona primária: *Evoluidor Consciente* (25–45 anos)

Busca resultados reais, já tentou apps/planos, tem alguma literacia fitness, mas falta sistema.

| Dor | Manifestação | Impacto |
|-----|--------------|---------|
| **Paralisia por informação** | Muitos métodos, influenciadores conflitantes | Não inicia ou muda de plano toda semana |
| **Desconexão treino ↔ nutrição** | Segue treino de um app e dieta de outro | Estagnação, fadiga, resultados inconsistentes |
| **Planos genéricos** | "Push/Pull/Legs" idêntico para todos | Lesões, desmotivação, sensação de "não é pra mim" |
| **Tracking tedioso** | Registrar tudo manualmente é exaustivo | Abandono do registro → perda de feedback |
| **Falta de feedback acionável** | Gráficos bonitos sem "e daí?" | Usuário não sabe o que mudar |
| **Ciclos de culpa** | Quebra streak → abandono total | Efeito yo-yo comportamental |
| **Custo de profissionais** | Personal + nutri = R$800–2000/mês | Inacessível para a maioria |
| **IA superficial** | Chatbot que repete dicas do Google | Desconfiança em "mais um app com IA" |
| **Invisibilidade do progresso** | Compara-se com highlight reels | Sensação de fracasso apesar de evoluir |
| **Rotina imprevisível** | Viagens, trabalho, filhos | Planos rígidos quebram na primeira exceção |

### Persona secundária: *Retornante* (30–50 anos)

Já treinou no passado, parou por lesão/vida/agenda, quer voltar com segurança.

| Dor | Manifestação |
|-----|--------------|
| Medo de lesão | Evita progressão ou exageros |
| Corpo diferente do passado | Frustração com comparação temporal |
| Tempo limitado | Precisa de eficiência, não volume |

### Persona terciária: *Profissional Parceiro* (personal, nutricionista)

| Dor | Manifestação |
|-----|--------------|
| Ferramentas desconectadas | Planilhas, WhatsApp, apps separados |
| Escala limitada | Atendimento 1:1 não escala |
| Falta de aderência do cliente | Cliente some entre consultas |

---

## 6. Oportunidades de Mercado

### Macro-tendências favoráveis

1. **Wellness como prioridade permanente** — mercado global de fitness apps: US$ 14B+ (2025), CAGR ~11%
2. **IA generativa madurando** — expectativa do usuário por personalização real, não marketing
3. **Wearables mainstream** — Apple Watch, Garmin, Whoop popularizaram dados de saúde
4. **Creator economy fitness saturada** — usuários cansados de conteúdo, famintos por sistema
5. **Brasil: mercado sub-atendido em integração** — apps locais focados em nicho único (só treino ou só dieta)

### Gaps competitivos identificados

| Concorrente / Categoria | Força | Fraqueza | Nossa oportunidade |
|-------------------------|-------|----------|-------------------|
| Apps de treino (Smartfit, MFIT, etc.) | Biblioteca de exercícios | Nutrição ausente ou superficial | Integração real |
| Apps de dieta (MyFitnessPal, Yazio) | Base alimentar | Treino ignorado | Periodização conjunta |
| Hábitos (Fabulous, Habitica) | Gamificação | Sem contexto fitness | Hábitos ancorados em performance |
| IA fitness (emergentes) | Novidade | Black box, sem dados do usuário | IA explicável + dados proprietários |
| Personal/Nutri presencial | Alta qualidade | Caro, não escala | Camada híbrida profissional |

### Segmentos de oportunidade

- **B2C premium:** Assinatura mensal por sistema completo (sweet spot: R$39–79/mês no BR)
- **B2B2C:** Parcerias com academias, empresas (wellness corporativo)
- **Pro tier:** Ferramentas para profissionais gerenciarem clientes na plataforma
- **Data insights (futuro):** Benchmarks anonimizados, relatórios de tendência

---

## 7. Filosofia do Produto

### Pilares filosóficos

#### 7.1 Sistema > Feature
Cada funcionalidade deve servir ao sistema integrado. Não adicionamos features isoladas que não conversam com o resto.

#### 7.2 Progressão > Perfeição
Celebramos consistência imperfeita. 70% de aderência sustentada vale mais que 100% por 5 dias.

#### 7.3 Contexto > Template
Planos nascem do contexto do usuário (tempo, equipamento, histórico, preferências), não de templates populares.

#### 7.4 Explicabilidade > Black Box
Quando a IA sugere algo, o usuário entende o porquê. Confiança vem de transparência.

#### 7.5 Autonomia assistida
O produto guia, não controla. O usuário sempre pode override — e o sistema aprende com isso.

#### 7.6 Longevidade > Sprint
Otimizamos para retenção em 12 meses, não para downloads na semana 1.

#### 7.7 Dados com consentimento
Coletamos o mínimo necessário, explicamos o uso, entregamos valor proporcional.

---

## 8. Princípios de UX

### P1 — Clareza antes de completude
Mostrar o essencial primeiro. Detalhes sob demanda. O usuário deve saber **o que fazer hoje** em menos de 10 segundos.

### P2 — Fluxo único diário
Existência de um "centro de gravidade" diário: uma tela/ação principal que ancora a experiência (check-in + plano do dia).

### P3 — Feedback imediato e significativo
Toda ação gera resposta contextual: "Você completou X → impacto estimado em Y". Nunca silêncio após input.

### P4 — Redução de carga cognitiva
- Defaults inteligentes
- Máximo 3 decisões significativas por sessão
- Autofill onde possível (histórico, padrões, IA)

### P5 — Recuperação graciosa
Erros, skips e quebras de rotina são normais. UX de "retomada" > UX de "punishment". Sem guilt-tripping.

### P6 — Progressive disclosure
Onboarding e features avançadas se revelam conforme maturidade do usuário, não no dia 1.

### P7 — Mobile-first, desktop-capable
Captura e check-in no mobile; análise e planejamento aprofundado no desktop.

### P8 — Acessibilidade como requisito
WCAG 2.1 AA como baseline. Contraste, touch targets, screen readers — não negociável.

### P9 — Linguagem humana
Sem jargão desnecessário. Tom: parceiro experiente, não coach gritando ou médico distante.

### P10 — Confiança visível
Mostrar fontes, incertezas e limites da IA. "Não tenho dados suficientes" é UX válida.

---

## 9. Princípios de Design

### Identidade visual (direção estratégica)

| Atributo | Direção | Evitar |
|----------|---------|--------|
| **Tom** | Confiante, calmo, premium-acessível | Aggressive gym bro, clinical cold |
| **Densidade** | Respirado, focado | Dashboards sobrecarregados |
| **Cor** | Paleta com contraste funcional + accent energético | Neon excessivo, vermelho alarmista |
| **Tipografia** | Sans-serif moderna, legível em movimento | Condensed agressiva |
| **Motion** | Funcional, indica progresso | Animações decorativas longas |
| **Data viz** | Tendências > números isolados | Gráficos sem contexto |

### Regras de design

1. **Hierarquia clara** — Uma ação primária por tela
2. **Consistência de padrões** — Mesmos componentes para mesmas funções em todo o produto
3. **Estados completos** — Empty, loading, error, partial, success — todos desenhados
4. **Dark mode nativo** — Não adaptação tardia; treino acontece em ambientes diversos
5. **Design tokens desde o início** — Escalabilidade visual garantida
6. **Celebração sutil** — Micro-recompensas visuais discretas, nunca infantilização
7. **Fotografia e ilustração** — Corpos reais, diversos, em movimento — nunca stock genérico de "fitness model"

---

## 10. O Que Nunca Faremos

Esta seção é **tão importante quanto o que faremos**. Serve como filtro de decisão.

| # | Compromisso | Razão |
|---|-------------|-------|
| 1 | **Prometer resultados garantidos** | Antiético, anti-científico, destrói confiança |
| 2 | **Vender suplementos ou produtos físicos como core** | Conflito de interesse com recomendações |
| 3 | **Usar shame/guilt como mecanismo de retenção** | Dano psicológico, churn disfarçado |
| 4 | **Planos alimentares restritivos extremos** | Risco à saúde, efeito rebote |
| 5 | **Diagnóstico ou prescrição médica** | Fora do escopo legal e ético |
| 6 | **Comparar usuários publicamente (rankings body-shaming)** | Tóxico, contrário à missão |
| 7 | **Vender dados de saúde a terceiros** | Violação de confiança fundamental |
| 8 | **IA que inventa informações (hallucination) sem salvaguardas** | Risco real à saúde |
| 9 | **Dark patterns de assinatura** | Cancelar deve ser tão fácil quanto assinar |
| 10 | **Feature bloat sem integração sistêmica** | Corrói a proposta de valor |
| 11 | **Conteúdo genérico copiado de influenciadores** | Commodity, sem diferencial |
| 12 | **Ignorar feedback negativo sistemático** | Arrogância de produto |

---

## 11. Diferenciais Estratégicos

### D1 — Integração sistêmica real
Não é "treino + aba de dieta". É um motor que entende trade-offs: "Você dormiu mal → treino ajustado + sugestão nutricional alterada."

### D2 — IA contextual e explicável
IA treinada no contexto do **usuário específico** (histórico, preferências, limitações), com explicações legíveis — não chatbot genérico.

### D3 — Loop de feedback fechado
Input (treino, refeição, hábito, sensação) → Processamento → Output acionável → Novo input. Ciclo contínuo.

### D4 — Adaptação a vida real
Planos flexíveis que absorvem imprevistos (15 min vs 60 min, casa vs academia, energia baixa).

### D5 — Narrativa de progresso
Storytelling de evolução baseado em dados reais do usuário — "Há 8 semanas você levantava X, hoje Y, e seu sono melhorou Z%."

### D6 — Camada profissional opcional
Ponte entre DIY e personal/nutri — profissional usa a plataforma, usuário mantém autonomia entre consultas.

### D7 — Privacidade como feature
Dados de saúde tratados com rigor. Transparência total sobre o que é coletado e por quê.

---

## 12. Roadmap Macro do Produto

### Fase 0 — Fundação (atual)
**Objetivo:** Product Bible, arquitetura conceitual, validação de hipóteses  
**Entregáveis:** Este documento, personas validadas, mapa de módulos, tech stack decision  
**Duração estimada:** 2–4 semanas

---

### Fase 1 — Core Loop (MVP)
**Objetivo:** Validar retenção D7/D30 com loop mínimo funcional  
**Duração estimada:** 3–4 meses

| Entrega | Descrição |
|---------|-----------|
| Onboarding inteligente | Perfil, objetivos, limitações, equipamentos |
| Plano de treino adaptativo | Geração + ajuste básico por IA |
| Registro simplificado | Treino concluído, sensação, notas |
| Nutrição básica | Metas macro + sugestões (não receitas complexas) |
| 3–5 hábitos ancorados | Sono, água, movimento — correlacionados |
| Dashboard diário | "Seu dia" — ação central |
| Check-in semanal | Reflexão + ajuste de plano |

**Métrica norte:** Retenção D30 ≥ 25%

---

### Fase 2 — Inteligência & Profundidade
**Objetivo:** Diferenciação via IA e correlação de dados  
**Duração estimada:** 3–4 meses

| Entrega | Descrição |
|---------|-----------|
| Motor de correlação | Sono ↔ performance, nutrição ↔ energia |
| IA explicável v2 | Justificativas, confiança, alternativas |
| Periodização automática | Mesociclos, deload, progressão |
| Biblioteca de exercícios rica | Vídeos, substituições, filtros |
| Nutrição avançada | Refeições, lista de compras, substituições |
| Notificações inteligentes | Timing baseado em comportamento, não spam |

**Métrica norte:** NPS ≥ 40, sessões/semana ≥ 4

---

### Fase 3 — Ecossistema
**Objetivo:** Expandir touchpoints e parceiros  
**Duração estimada:** 4–6 meses

| Entrega | Descrição |
|---------|-----------|
| Integrações wearables | Apple Health, Google Fit, Garmin, Whoop |
| Modo profissional | Dashboard para personal/nutri |
| Comunidade moderada | Desafios, grupos por objetivo |
| Conteúdo educacional | Microlearning contextual |
| API pública (beta) | Integrações terceiras |

**Métrica norte:** MAU growth 15% MoM, Pro tier adoption ≥ 10%

---

### Fase 4 — Plataforma
**Objetivo:** Inteligência preditiva e escala  
**Duração estimada:** 6+ meses

| Entrega | Descrição |
|---------|-----------|
| Predição de platôs | Alerta + intervenção proativa |
| Benchmarks anonimizados | "Pessoas como você..." |
| B2B wellness | Empresas, academias |
| Marketplace profissional | Conexão usuário ↔ profissional |
| Internacionalização | PT → ES → EN |

**Métrica norte:** LTV/CAC ≥ 3, churn mensal ≤ 5%

---

## 13. Estrutura Inicial dos Módulos

### Mapa de módulos (domínios)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PLATAFORMA CORE                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  Auth &  │  │  User    │  │Subscription│ │  Notification   │  │
│  │  Identity│  │  Profile │  │  & Billing │ │  Engine         │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│    TREINO     │     │   NUTRIÇÃO    │     │    HÁBITOS    │
│               │     │               │     │               │
│ • Exercícios  │     │ • Macros      │     │ • Tracking    │
│ • Programas   │     │ • Refeições   │     │ • Rotinas     │
│ • Sessões     │     │ • Alimentos   │     │ • Streaks     │
│ • Progressão  │     │ • Hidratação  │     │ • Correlação  │
└───────┬───────┘     └───────┬───────┘     └───────┬───────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
                ┌─────────────────────────┐
                │   MOTOR DE IA / REGRAS  │
                │                         │
                │ • Personalização        │
                │ • Correlação cruzada    │
                │ • Ajuste de planos      │
                │ • Explicabilidade       │
                └────────────┬────────────┘
                             ▼
                ┌─────────────────────────┐
                │   ANALYTICS & INSIGHTS  │
                │                         │
                │ • Progresso             │
                │ • Tendências            │
                │ • Relatórios            │
                │ • Export                │
                └─────────────────────────┘
```

---

### Módulo 1: Identity & Profile

**Responsabilidade:** Quem é o usuário, autenticamente e biologicamente.

| Entidade | Descrição |
|----------|-----------|
| User | Conta, auth, preferências |
| Profile | Dados físicos, objetivos, restrições |
| Preferences | Equipamentos, horários, dieta, notificações |
| OnboardingState | Progresso do setup inicial |

**Regras de negócio:**
- Onboarding progressivo — perfil mínimo para começar, enriquecimento contínuo
- Dados sensíveis (peso, medidas) com controle de visibilidade
- Objetivos mutáveis sem "reset" punitivo

---

### Módulo 2: Treino (Training)

**Responsabilidade:** Prescrição, execução e progressão de treinos.

| Entidade | Descrição |
|----------|-----------|
| Exercise | Movimento, músculos, equipamento, vídeo |
| WorkoutTemplate | Estrutura reutilizável |
| WorkoutSession | Instância executada |
| Program | Sequência periodizada (mesociclos) |
| ProgressionRule | Lógica de avanço/regressão |

**Regras de negócio:**
- Todo treino tem alternativas (equipamento, tempo, lesão)
- Registro mínimo: exercício + carga/reps OU "feito como prescrito"
- Deload automático baseado em performance + feedback

---

### Módulo 3: Nutrição (Nutrition)

**Responsabilidade:** Metas, registro e sugestões alimentares.

| Entidade | Descrição |
|----------|-----------|
| NutritionGoal | Macros, calorias, estratégia |
| FoodItem | Base alimentar |
| MealLog | Registro de refeição |
| MealSuggestion | Sugestão gerada (IA ou regra) |
| Restriction | Alergias, preferências, dieta |

**Regras de negócio:**
- Foco em aderência, não perfeição calórica
- Estimativas com faixas, não números falsamente precisos
- Integração com treino: dias de treino → ajuste de carboidratos

---

### Módulo 4: Hábitos (Habits)

**Responsabilidade:** Comportamentos de suporte correlacionados.

| Entidade | Descrição |
|----------|-----------|
| Habit | Definição (água, sono, passos, meditação) |
| HabitLog | Registro diário |
| HabitCorrelation | Relação estatística com performance |

**Hábitos core (MVP):**
1. Sono (horas + qualidade subjetiva)
2. Hidratação
3. Passos/movimento NEAT
4. Consistência de treino
5. Preparo de refeições

**Regras de negócio:**
- Máximo 5 hábitos ativos simultâneos (foco)
- Streaks com "freeze" gracioso (1–2/semana)
- Correlação visível apenas com dados suficientes (≥14 dias)

---

### Módulo 5: Motor de IA / Regras

**Responsabilidade:** Personalização, correlação e ajuste.

| Componente | Descrição |
|------------|-----------|
| RecommendationEngine | Sugestões de treino, refeição, hábito |
| CorrelationEngine | Cruzamento de dados entre módulos |
| AdaptationEngine | Ajuste de planos por feedback |
| ExplainabilityLayer | Tradução de decisões para linguagem humana |
| SafetyGuardrails | Limites, disclaimers, escalação |

**Regras de negócio:**
- IA nunca prescreve sem contexto mínimo (≥7 dias de dados ou onboarding completo)
- Toda sugestia tem: confiança, razão, alternativa
- Fallback para regras determinísticas quando IA incerta
- Log de decisões para auditoria e melhoria

---

### Módulo 6: Analytics & Insights

**Responsabilidade:** Visualização de progresso e narrativa.

| Componente | Descrição |
|------------|-----------|
| DailySummary | Resumo do dia |
| WeeklyReport | Check-in + tendências |
| ProgressTimeline | Narrativa de evolução |
| MetricDefinition | O que medimos e por quê |

**Métricas core:**
- Aderência (treino, nutrição, hábitos) — tendência, não absoluto
- Força/volume (treino)
- Composição corporal (se registrado)
- Energia/subjetivo (escala simples)
- Consistência (dias ativos/semana)

---

### Módulo 7: Platform Services

**Responsabilidade:** Infraestrutura transversal.

| Serviço | Descrição |
|---------|-----------|
| Auth | Login, OAuth, sessões |
| Subscription | Planos, pagamento, trial |
| Notification | Push, email, in-app — inteligente |
| Media | Vídeos de exercícios, imagens |
| AuditLog | Rastreabilidade de ações sensíveis |

---

### Dependências entre módulos

```
Identity ──► Treino ──┐
    │                 │
    ├──► Nutrição ────┼──► Motor IA ──► Analytics
    │                 │
    └──► Hábitos ─────┘
                           │
                    Platform Services
                    (transversal a todos)
```

**Princípio de acoplamento:** Módulos se comunicam via eventos e APIs internas. Nenhum módulo acessa diretamente o banco de outro.

---

## Apêndice A — Glossário

| Termo | Definição |
|-------|-----------|
| **Evoluidor** | Usuário ativo buscando progresso físico de longo prazo |
| **Core Loop** | Check-in diário → execução → registro → feedback → ajuste |
| **Aderência** | % de plano cumprido, medida por tendência semanal |
| **Periodização** | Organização de treino em ciclos com objetivos distintos |
| **Deload** | Semana de redução de volume/intensidade para recuperação |

---

## Apêndice B — Próximos Passos (pós-Bible)

1. **Validação de personas** — 5–10 entrevistas com potenciais usuários
2. **Naming & Brand** — Nome do produto, identidade verbal
3. **Tech Stack Decision** — Documento de arquitetura técnica
4. **User Journey Maps** — Fluxos detalhados por persona
5. **MVP Scope Lock** — Congelar escopo da Fase 1
6. **Métricas & Instrumentação** — Definir eventos de analytics desde o dia 1

---

## Controle de Versão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | Jul 2026 | Product Team | Documento fundacional |

---

*Este documento é a fonte oficial de decisões estratégicas do produto. Qualquer feature, design ou arquitetura deve ser validada contra os princípios aqui definidos. Alterações requerem revisão explícita e incremento de versão.*
