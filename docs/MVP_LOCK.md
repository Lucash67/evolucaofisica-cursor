# MVP LOCK — Product Scope v1

> **Versão:** 1.0  
> **Status:** ESCOPO CONGELADO — alterações requerem revisão formal  
> **Última atualização:** Julho 2026  
> **Referências:** `PRODUCT_BIBLE.md` · `CONCEPTUAL_ARCHITECTURE.md`

---

## Prefácio

Este documento congela **o que será construído** — e, com igual importância, **o que não será**.

A Product Bible define quem somos. A Arquitetura Conceitual define como pensamos. O MVP LOCK define **o mínimo necessário para provar que valemos a pena**.

Regra de ouro deste documento:

> Se uma funcionalidade não fortalece o Core Loop ou não é indispensável para provar a hipótese principal, **não entra no MVP**.

---

## Índice

1. [A hipótese principal](#1-a-hipótese-principal)
2. [O Core Loop](#2-o-core-loop)
3. [Funcionalidades obrigatórias](#3-funcionalidades-obrigatórias)
4. [Funcionalidades proibidas no MVP](#4-funcionalidades-proibidas-no-mvp)
5. [Critérios para aceitar uma nova funcionalidade](#5-critérios-para-aceitar-uma-nova-funcionalidade)
6. [Critérios de sucesso](#6-critérios-de-sucesso)
7. [Roadmap de evolução](#7-roadmap-de-evolução)
8. [Ordem de implementação](#8-ordem-de-implementação)
9. [Revisão crítica](#9-revisão-crítica)

---

# 1. A hipótese principal

## A única hipótese que este MVP precisa provar

> **Pessoas que buscam evolução física retornam por 30 dias quando treino, nutrição e hábitos existem em um único loop diário com feedback contextual — mesmo sem IA avançada, wearables ou conteúdo premium.**

### Desdobramento

| Elemento | O que estamos testando |
|----------|------------------------|
| **Integração** | Unificar treino + nutrição + hábitos gera mais valor percebido do que apps separados |
| **Loop diário** | Uma experiência central ("Seu Dia") reduz paralisia e aumenta consistência |
| **Feedback contextual** | O usuário entende *por que* fez o que fez hoje — e quer voltar amanhã |
| **Retenção** | Consistência de 30 dias é possível sem gamificação agressiva ou promessas milagrosas |

### O que NÃO estamos provando no MVP

- Se nossa IA é superior a um chatbot genérico
- Se integrações com wearables aumentam retenção
- Se profissionais pagariam por uma camada B2B
- Se comunidade gera engajamento
- Se conseguimos escalar para milhões de usuários

Essas hipóteses são **fases futuras**. Prová-las agora dilui foco e atrasa validação do que importa.

### Critério de continuidade

```
SE retenção D30 ≥ 25%
   E usuários completam ≥ 2 ciclos semanais do Core Loop
   E satisfação (CSAT check-in) ≥ 3.5/5
ENTÃO justifica investir em V1 (inteligência profunda, diferenciação)

SE NÃO
ENTÃO pivotar o loop, não adicionar features
```

---

# 2. O Core Loop

## O ciclo diário ideal

```
┌─────────────────────────────────────────────────────────────────┐
│                         CORE LOOP                                │
│                                                                  │
│   ENTRADA ──► AÇÃO ──► REGISTRO ──► FEEDBACK ──► PRÓXIMA AÇÃO  │
│      ▲                                              │            │
│      │                                              │            │
│      └──────────── RETORNO D+1 ◄────────────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Entrada

O usuário abre o app e vê **"Seu Dia"** — uma tela que responde em menos de 10 segundos:

- O que fazer hoje (treino, metas nutricionais, hábitos)
- Como foi ontem (resumo breve)
- Uma observação contextual (não genérica)

**Exemplo:**
> *"Bom dia, Lucas. Hoje: treino de pernas (45 min). Você está 2/3 treinos esta semana. Proteína de ontem: 145g — quase na meta."*

A entrada **não** é um dashboard com 15 widgets. É um ponto de partida claro.

---

### Ação

O usuário executa **pelo menos uma** das três dimensões integradas:

| Dimensão | Ação típica |
|----------|-------------|
| Treino | Segue o treino prescrito ou adaptado |
| Nutrição | Registra refeições em direção à meta macro |
| Hábitos | Marca sono, água ou check-in rápido |

Não exigimos perfeição. Exigimos **participação**.

---

### Registro

Cada ação gera um **evento** na timeline do usuário:

- Treino concluído (com RPE opcional e notas)
- Refeição registrada (estimativa de proteína/calorias)
- Hábito marcado (sono, água)
- Peso registrado (opcional, semanal)

Registro deve ser **rápido** — máximo 60 segundos por interação. Registro detalhado é opcional, nunca obrigatório.

---

### Feedback

Após registro, o sistema responde com **feedback significativo** — não silêncio, não gráfico vazio:

| Tipo | Exemplo |
|------|---------|
| **Confirmação** | "Treino concluído. 3/4 esta semana." |
| **Contexto** | "Proteína acumulada: 95g de 160g." |
| **Conexão** | "Dias com proteína >140g, seu treino costuma render mais." *(apenas após 14+ dias de dados)* |
| **Encorajamento honesto** | "Semana irregular, mas você voltou. Próximo treino: quinta." |

No MVP, feedback contextual profundo é **limitado** — regras simples, não correlações complexas. Honestidade > sofisticação.

---

### Próxima ação

O loop fecha indicando **o que vem depois**:

- "Próximo: registrar almoço"
- "Amanhã: treino de costas, 40 min"
- "Check-in semanal disponível domingo"

O usuário nunca termina uma sessão sem saber quando e por que voltar.

---

### Retorno no dia seguinte

No D+1, "Seu Dia" reflete o que aconteceu:

- Progresso semanal visível
- Plano ajustado se houve desvio (treino remarcado, não "atrasado")
- Continuidade narrativa — o app lembra, o usuário não precisa reconstruir contexto

---

## Por que este ciclo gera retenção

| Mecanismo | Como funciona |
|-----------|---------------|
| **Clareza** | Elimina "o que faço hoje?" — principal causa de abandono |
| **Progresso visível** | Tendências semanais, não números isolados |
| **Investimento acumulado** | Cada registro enriquece a timeline — sair = perder história |
| **Feedback imediato** | Dopamina funcional (conclusão + contexto), não streaks vazios |
| **Baixa fricção** | 60 segundos por registro — sustentável por 30+ dias |
| **Recuperação graciosa** | Quebrar um dia não destrói o loop — crítico para D30 |
| **Integração percebida** | "Meu treino e minha comida conversam" — diferencial vs. 3 apps |

---

# 3. Funcionalidades obrigatórias

Organizadas por módulo. Apenas o **mínimo indispensável**.

Legenda de prioridade:
- **P0** — Bloqueante. Sem isso, não há produto.
- **P1** — Essencial para o Core Loop funcionar.
- **P2** — Importante, mas pode ser simplificado no lançamento.

---

## Módulo A: Identidade & Onboarding

| # | Funcionalidade | Objetivo | Prioridade | Dependências | Valor entregue |
|---|----------------|----------|------------|--------------|----------------|
| A1 | Criação de conta | Estabelecer identidade | P0 | — | Acesso persistente |
| A2 | Onboarding mínimo (≤3 min) | Capturar dados para personalização inicial | P0 | A1 | Plano utilizável no dia 1 |
| A3 | Definição de objetivo (único) | Filtrar prescrições e feedback | P0 | A2 | Direção clara |
| A4 | Perfil básico (peso, altura, idade, sexo) | Calcular metas | P0 | A2 | Baseline físico |
| A5 | Preferências de treino (dias/semana, duração, local) | Gerar plano realista | P0 | A2 | Plano aderente à rotina |
| A6 | Restrições declaradas (lesões, alimentos) | Segurança e relevância | P1 | A2 | Evita prescrições inadequadas |

**Escopo do onboarding mínimo (A2):**
- Objetivo (hipertrofia / emagrecimento / saúde geral / força)
- Frequência semanal (2–5 dias)
- Duração por sessão (30 / 45 / 60 min)
- Local (academia / casa)
- Equipamentos disponíveis (lista simplificada)

**Fora do onboarding MVP:** histórico detalhado, fotos, medidas corporais, questionário longo.

---

## Módulo B: Seu Dia (Hub Central)

| # | Funcionalidade | Objetivo | Prioridade | Dependências | Valor entregue |
|---|----------------|----------|------------|--------------|----------------|
| B1 | Tela "Seu Dia" | Centro de gravidade diário | P0 | A3, C1, D1, E1 | Clareza imediata |
| B2 | Resumo do dia anterior | Continuidade narrativa | P1 | B1, eventos | Contexto sem esforço |
| B3 | Indicador de progresso semanal | Visibilidade de tendência | P1 | B1, C3, D3 | Motivação honesta |
| B4 | Próxima ação sugerida | Fechar o loop | P0 | B1 | Razão para voltar |

---

## Módulo C: Treino

| # | Funcionalidade | Objetivo | Prioridade | Dependências | Valor entregue |
|---|----------------|----------|------------|--------------|----------------|
| C1 | Plano de treino semanal | Prescrição clara | P0 | A5 | O que treinar |
| C2 | Sessão de treino guiada | Executar treino | P0 | C1 | Ação principal |
| C3 | Registro de conclusão | Gerar evento | P0 | C2 | Feedback e histórico |
| C4 | Registro simplificado (feito + RPE opcional) | Baixa fricção | P0 | C3 | 60 segundos máximo |
| C5 | Biblioteca básica de exercícios | Referência de execução | P1 | C2 | Segurança e clareza |
| C6 | Substituição manual de exercício | Adaptar a limitações | P1 | C2, C5 | Flexibilidade |
| C7 | Remarcação de treino (não cumprido) | Recuperação graciosa | P1 | C1 | Evita abandono por culpa |

**Escopo C5 (biblioteca básica):** nome, músculos, instrução textual, 1 imagem estática. Sem vídeo no MVP.

**Escopo C1 (plano):** templates pré-definidos personalizados por objetivo + frequência + equipamento. Não periodização automática.

---

## Módulo D: Nutrição

| # | Funcionalidade | Objetivo | Prioridade | Dependências | Valor entregue |
|---|----------------|----------|------------|--------------|----------------|
| D1 | Meta macro diária (calorias + proteína) | Direção nutricional | P0 | A3, A4 | Alvo claro |
| D2 | Registro simplificado de refeição | Gerar evento | P0 | D1 | Tracking mínimo viável |
| D3 | Estimativa por refeição (não por alimento) | Baixa fricção | P0 | D2 | 30 segundos por refeição |
| D4 | Progresso macro do dia | Feedback imediato | P0 | D2 | "95g de 160g proteína" |
| D5 | Ajuste de meta por objetivo | Coerência treino ↔ nutrição | P1 | D1, A3 | Integração percebida |

**Escopo D2/D3:** usuário registra "almoço — ~40g proteína, ~600 kcal" ou seleciona preset (pequeno/médio/grande). **Não** busca de alimentos item a item no MVP.

---

## Módulo E: Hábitos

| # | Funcionalidade | Objetivo | Prioridade | Dependências | Valor entregue |
|---|----------------|----------|------------|--------------|----------------|
| E1 | Hábito: sono (horas + qualidade) | Contexto de recuperação | P0 | — | Dado crítico para feedback |
| E2 | Hábito: hidratação (sim/não ou copos) | Comportamento de suporte | P1 | — | Completude do loop |
| E3 | Registro em ≤15 segundos | Baixa fricção | P0 | E1 | Sustentabilidade |
| E4 | Visualização semanal de hábitos | Tendência, não streak punitivo | P1 | E1, E2 | Progresso honesto |

**MVP: apenas 2 hábitos** (sono + hidratação). Consistência de treino é inferida dos eventos de treino — não é hábito separado.

**Fora do MVP:** passos, meal prep, meditação, streaks com freeze, correlação hábito↔performance.

---

## Módulo F: Progresso & Feedback

| # | Funcionalidade | Objetivo | Prioridade | Dependências | Valor entregue |
|---|----------------|----------|------------|--------------|----------------|
| F1 | Registro de peso (opcional) | Métrica de evolução | P1 | A4 | Tendência corporal |
| F2 | Resumo semanal | Check-in de reflexão | P0 | C3, D2, E1 | Fechamento do ciclo semanal |
| F3 | Aderência semanal (% treinos, dias com registro) | Honestidade sobre consistência | P0 | F2 | Feedback acionável |
| F4 | Ajuste de plano pós check-in | Adaptação básica | P1 | F2 | Sistema que reage |
| F5 | Histórico de eventos (timeline simples) | Memória do sistema | P1 | Todos os registros | Investimento acumulado |

**Escopo F4 (ajuste básico):** remarcar treinos, ajustar meta calórica ±100–200 kcal, sugerir redução de frequência se aderência <50%. Regras determinísticas — não IA.

---

## Módulo G: Inteligência (Mínima)

| # | Funcionalidade | Objetivo | Prioridade | Dependências | Valor entregue |
|---|----------------|----------|------------|--------------|----------------|
| G1 | Prescrição inicial por regras | Plano no dia 1 | P0 | A2, A3 | Valor imediato |
| G2 | Feedback por regras (templates contextuais) | Respostas significativas | P0 | Eventos | Feedback > silêncio |
| G3 | Detecção de desvio (treino não feito, registro ausente) | Omissão como evento | P1 | Eventos | Adaptação graciosa |
| G4 | 1 correlação simples (sono → feedback de treino) | Diferencial percebido | P2 | E1, C3, ≥14 dias dados | "Integração real" |

**Escopo G4:** apenas após 14 dias de dados. Exemplo: *"Você dormiu menos de 6h ontem — considere treino mais leve hoje."* Uma correlação, não um motor.

**Fora do MVP:** chatbot, recomendações com confiança %, explicabilidade avançada, knowledge graph, predição.

---

## Módulo H: Conta & Configurações

| # | Funcionalidade | Objetivo | Prioridade | Dependências | Valor entregue |
|---|----------------|----------|------------|--------------|----------------|
| H1 | Login / logout | Segurança básica | P0 | A1 | Conta protegida |
| H2 | Editar objetivo | Mudança de direção | P1 | A3 | Flexibilidade |
| H3 | Editar preferências de treino | Adaptar rotina | P1 | A5 | Controle do usuário |
| H4 | Excluir conta | LGPD / confiança | P1 | A1 | Compliance |

**Fora do MVP:** assinatura paga, notificações push elaboradas, integrações, export de dados.

---

## Resumo: contagem de funcionalidades MVP

| Módulo | P0 | P1 | P2 | Total |
|--------|----|----|----|----|
| A — Identidade | 5 | 1 | 0 | 6 |
| B — Seu Dia | 2 | 2 | 0 | 4 |
| C — Treino | 4 | 3 | 0 | 7 |
| D — Nutrição | 4 | 1 | 0 | 5 |
| E — Hábitos | 2 | 2 | 0 | 4 |
| F — Progresso | 2 | 3 | 0 | 5 |
| G — Inteligência | 2 | 1 | 1 | 4 |
| H — Conta | 1 | 3 | 0 | 4 |
| **Total** | **22** | **16** | **1** | **39** |

**39 funcionalidades. Nenhuma a mais.**

---

# 4. Funcionalidades proibidas no MVP

| Funcionalidade | Motivo da exclusão | Fase futura |
|----------------|-------------------|-------------|
| Chatbot / assistente conversacional | Gimmick sem dados suficientes; alto custo; não prova a hipótese | V1 |
| Integração Apple Health / Google Fit / Garmin / Whoop / Oura | Complexidade de integração; MVP valida loop manual primeiro | V2 |
| Vídeos de exercícios | Custo de produção; imagem + texto suficiente para validar | V1 |
| Busca de alimentos / base nutricional completa | Fricção alta; registro por refeição prova o loop | V1 |
| Receitas e cardápios | Escopo de produto diferente; distrai do loop | V2 |
| Lista de compras | Derivado de receitas — não existe ainda | V2 |
| Periodização automática (mesociclos) | Requer inteligência madura; templates bastam | V1 |
| Deload automático | Regras complexas; ajuste manual no check-in semanal | V1 |
| Knowledge Graph | Arquitetura completa prematura; 1 correlação basta | V2 |
| Insights com confiança % | UX sofisticada demais para poucos dados | V1 |
| Predição de platôs | Requer meses de dados | V3 |
| Múltiplos objetivos simultâneos | Paralisa decisões; um objetivo foca o MVP | V2 |
| Gamificação (badges, XP, rankings) | Contradiz Product Bible; streaks punitivos proibidos | Longo prazo (se ever) |
| Comunidade / desafios / feed social | Não prova hipótese de retenção individual | V2 |
| Modo profissional (personal / nutri) | B2B2C prematuro; zero usuários B2C ainda | V2 |
| Marketplace (suplementos, equipamentos) | Conflito de interesse (Product Bible) | Longo prazo |
| Assinatura paga / billing | Validar valor antes de cobrar; beta gratuito | V1 |
| Notificações push inteligentes | Risco de spam; retenção orgânica primeiro | V1 |
| Modo offline completo | Complexidade técnica; online-first para MVP | V1 |
| Dark mode | Desejável, não bloqueante | V1 |
| PWA / app nativo dual | Escolher um canal; não dois | Decisão técnica separada |
| Registro por exercício (série a série) | Fricção excessiva; sessão completa basta | V1 |
| 5 hábitos simultâneos | Dispersa foco; 2 hábitos + treino inferido | V1 |
| Correlações múltiplas | Uma correlação (sono→treino) prova integração | V1 |
| Fotos de progresso | Privacidade, moderação, escopo visual | V2 |
| Medidas corporais (circunferências) | Dado secundário; peso basta | V1 |
| Export de dados | Poucos dados para exportar; LGPD delete basta | V1 |
| Onboarding >3 minutos | Abandono no dia 1; enriquecimento progressivo depois | — |
| Conteúdo educacional (artigos, vídeos) | Product Bible: sistema, não conteúdo | V2 |
| Benchmarks ("pessoas como você") | Requer massa crítica de usuários | V3 |
| Exames laboratoriais / genética | Integração complexa, regulatório | V3 |
| Internacionalização (EN, ES) | Mercado lusófono primeiro | V2 |
| Modo viagem | Caso de uso válido, não essencial para D30 | V1 |
| Modo reintrodução pós-ausência | Importante, mas fluxo de retorno simples basta | V1 |
| Trocar de academia (inventário equipamentos) | Editar preferências manualmente basta | V1 |
| Suplementos (registro) | Dado de nicho; não prova hipótese | V2 |
| Cardio como módulo separado | Treino cobre; cardio específico depois | V1 |
| Multi-plataforma (web + mobile + tablet) | Um canal focado; expandir depois | V1 |

---

# 5. Critérios para aceitar uma nova funcionalidade

## Checklist obrigatória

Toda funcionalidade proposta — por qualquer pessoa, incluindo founders — deve passar por **todas** as perguntas:

| # | Pergunta | Se "Não" → |
|---|----------|------------|
| 1 | **Resolve um problema recorrente** (≥30% dos usuários, ≥2x/semana)? | Fora |
| 2 | **Está alinhada à Product Bible?** (não viola "O que nunca faremos") | Fora |
| 3 | **Fortalece o Core Loop?** (entrada → ação → registro → feedback → retorno) | Fora |
| 4 | **Pode ser construída sem aumentar significativamente a complexidade?** (≤2 semanas de esforço incremental) | Adiar |
| 5 | **É necessária para provar a hipótese principal?** | Adiar para V1+ |
| 6 | **Existe alternativa mais simples que entrega 80% do valor?** | Construir a alternativa |
| 7 | **A Arquitetura Conceitual já prevê este conceito?** (não inventar fora do modelo) | Revisar arquitetura primeiro |
| 8 | **Podemos medir se funcionou?** (métrica clara de sucesso) | Fora |

### Regras de decisão

```
Todas "Sim" (1–8)     → Pode entrar no backlog priorizado
Qualquer "Não" (1–3)  → Fora do escopo, sem discussão
"Não" em 4 ou 5       → Adiar para fase futura explícita
"Não" em 6            → Construir alternativa simples
"Não" em 7            → Revisar arquitetura, depois reavaliar
"Não" em 8            → Definir métrica antes de construir
```

### Processo de exceção

Se alguém insistir em uma funcionalidade que falhou na checklist:

1. Documentar justificativa por escrito
2. Identificar o que será **removido** para compensar (escopo zero-sum)
3. Aprovação unânime de Product + Engineering + Founder
4. Incrementar versão deste documento

**Sem exceção silenciosa.**

---

# 6. Critérios de sucesso

## Métrica norte

> **Retenção D30 ≥ 25%**

Se atingirmos isso com o Core Loop funcionando, a hipótese principal está validada.

---

## Métricas detalhadas

### Ativação

| Métrica | Definição | Meta MVP | Por quê |
|---------|-----------|----------|---------|
| **Onboarding completo** | Usuário finaliza A2 + A3 + primeiro plano gerado | ≥ 70% dos cadastros | Sem onboarding, não há loop |
| **Primeira ação em 24h** | Completa treino, registra refeição ou marca hábito | ≥ 55% | Valor no dia 1 |
| **Time to first value** | Tempo do cadastro até primeira ação | ≤ 10 minutos | Fricção inicial mata |

### Retenção

| Métrica | Definição | Meta MVP | Por quê |
|---------|-----------|----------|---------|
| **D1** | Retorna no dia seguinte | ≥ 45% | Loop diário iniciado |
| **D7** | Ativo 7 dias após cadastro | ≥ 35% | Hábito em formação |
| **D14** | Ativo 14 dias após cadastro | ≥ 30% | Primeira correlação possível |
| **D30** | Ativo 30 dias após cadastro | ≥ 25% | **Métrica norte** |

**Definição de "ativo":** completou ≥1 ação do Core Loop (treino, refeição ou hábito) na janela.

### Uso semanal

| Métrica | Definição | Meta MVP | Por quê |
|---------|-----------|----------|---------|
| **Sessões/semana** | Aberturas do app com ação | ≥ 3 | Consistência mínima |
| **Treinos/semana** | Treinos completados | ≥ 2 (média) | Aderência ao plano |
| **Dias com registro nutricional** | ≥1 refeição registrada | ≥ 3/semana | Integração nutrição |
| **Check-in semanal completado** | F2 realizado | ≥ 50% das semanas ativas | Fechamento do ciclo |

### Uso diário

| Métrica | Definição | Meta MVP | Por quê |
|---------|-----------|----------|---------|
| **DAU/MAU** | Usuários diários / mensais | ≥ 25% | Engajamento diário |
| **Ações/dia (ativos)** | Média de registros por usuário ativo | ≥ 1.5 | Loop completo |
| **Tempo por sessão** | Duração média | 2–5 min | Eficiência, não doom-scrolling |

### Conclusão de treinos

| Métrica | Definição | Meta MVP | Por quê |
|---------|-----------|----------|---------|
| **Taxa de conclusão** | Treinos completados / treinos planejados | ≥ 60% | Plano é realista |
| **Treinos com RPE** | % de conclusões com RPE registrado | ≥ 30% | Dado para feedback futuro |
| **Remarcações vs. abandono** | Treinos remarcados vs. simplesmente perdidos | Remarcar > 2× abandonar | Recuperação graciosa funciona |

### Registro de refeições

| Métrica | Definição | Meta MVP | Por quê |
|---------|-----------|----------|---------|
| **Dias com ≥1 refeição** | % de dias ativos com registro | ≥ 50% | Nutrição no loop |
| **Refeições/dia (registradores)** | Média entre quem registra | ≥ 2 | Tracking útil |
| **Abandono nutricional** | Para de registrar refeições antes do treino | Treino > Nutrição | Priorização natural OK |

### Retorno após 30 dias

| Métrica | Definição | Meta MVP | Por quê |
|---------|-----------|----------|---------|
| **Retorno D30–D45** | Usuários inativos D15–D30 que voltam | ≥ 15% | Recuperação graciosa |
| **Ações na primeira sessão de retorno** | Completa ação no retorno | ≥ 60% | Retorno efetivo, não curiosidade |

### Satisfação

| Métrica | Definição | Meta MVP | Por quê |
|---------|-----------|----------|---------|
| **CSAT check-in semanal** | "Como foi sua semana?" (1–5) | ≥ 3.5 | Satisfação mínima |
| **NPS (D30)** | Net Promoter Score | ≥ 20 | Indicação orgânica |
| **Feedback qualitativo** | "O app me ajudou a..." em entrevistas | ≥ 60% positivo | Valor percebido |

---

## Critérios de falha (pivot triggers)

| Sinal | Ação |
|-------|------|
| D7 < 20% | Revisar onboarding e primeira ação — não adicionar features |
| D30 < 15% após 3 meses | Pivotar Core Loop ou proposta de valor |
| Conclusão treinos < 40% | Planos irrealistas — simplificar prescrição |
| CSAT < 3.0 | Entrevistar 10 usuários antes de construir mais |
| Registro nutricional < 30% | Nutrição sai do loop MVP ou simplifica mais |

---

# 7. Roadmap de evolução

```
MVP ──► V1 ──► V2 ──► V3 ──► Longo Prazo
 │       │       │       │         │
 │       │       │       │         └── Plataforma completa
 │       │       │       └── Ecossistema
 │       │       └── Inteligência profunda
 │       └── Diferenciação
 └── Validação
```

---

## MVP (Congelado — este documento)

**Objetivo:** Provar hipótese de retenção via Core Loop integrado.

- Seu Dia (hub)
- Treino (plano + execução + registro simples)
- Nutrição (meta macro + registro por refeição)
- Hábitos (sono + água)
- Check-in semanal + ajuste básico
- Inteligência mínima (regras + 1 correlação)
- Onboarding ≤3 min

**Métrica:** D30 ≥ 25%

---

## V1 — Diferenciação

**Objetivo:** Entregar o diferencial prometido na Product Bible.

| Entrega | Origem |
|---------|--------|
| Periodização básica (mesociclos manuais) | Product Bible Fase 2 |
| Deload sugerido (com confirmação) | Conceptual Architecture |
| Biblioteca exercícios com vídeo | Product Bible Fase 2 |
| Busca de alimentos simplificada | Product Bible Fase 2 |
| 3–5 hábitos com correlação | Product Bible Fase 1 original |
| Feedback explicável ("por quê") | Diferencial D2 |
| Notificações push básicas | Product Bible Fase 2 |
| Assinatura paga (monetização) | Product Bible |
| Modo viagem / reintrodução | Conceptual Architecture |
| Dark mode | Design principles |
| Insights com confiança | Conceptual Architecture |

**Métrica:** NPS ≥ 40, sessões/semana ≥ 4

---

## V2 — Inteligência profunda

**Objetivo:** Motor de inteligência como diferencial competitivo real.

| Entrega | Origem |
|---------|--------|
| Motor de correlação (sono↔perf, nutri↔energia) | Product Bible Fase 2 |
| IA explicável v2 (alternativas, confiança) | Conceptual Architecture |
| Integrações wearables (Apple Health, Google Fit) | Product Bible Fase 3 |
| Modo profissional (personal/nutri) | Product Bible Fase 3 |
| Comunidade moderada | Product Bible Fase 3 |
| Knowledge Graph (parcial) | Conceptual Architecture |
| Nutrição avançada (substituições, sugestões) | Product Bible Fase 2 |
| Fotos de progresso | — |
| Internacionalização ES | Product Bible Fase 4 |

**Métrica:** MAU growth 15% MoM, Pro tier ≥ 10%

---

## V3 — Ecossistema

**Objetivo:** Plataforma, não app.

| Entrega | Origem |
|---------|--------|
| Garmin, Whoop, Oura | Conceptual Architecture |
| Predição de platôs | Product Bible Fase 4 |
| Benchmarks anonimizados | Product Bible Fase 4 |
| Marketplace profissional | Product Bible Fase 4 |
| B2B wellness | Product Bible Fase 4 |
| Exames laboratoriais | Conceptual Architecture |
| API pública | Product Bible Fase 3 |
| Conteúdo educacional contextual | Product Bible Fase 3 |

**Métrica:** LTV/CAC ≥ 3, churn ≤ 5%/mês

---

## Longo Prazo

| Entrega | Origem |
|---------|--------|
| Genética | Conceptual Architecture |
| Internacionalização EN | Product Bible Fase 4 |
| Marketplace produtos | Conceptual Architecture |
| Dispositivos inteligentes | Conceptual Architecture |
| Inteligência preditiva completa | Product Bible Fase 4 |
| B2B academias | Product Bible |

---

# 8. Ordem de implementação

Sequência lógica que minimiza retrabalho. Cada etapa **depende** da anterior.

```
ETAPA 1 ──► ETAPA 2 ──► ETAPA 3 ──► ETAPA 4 ──► ETAPA 5 ──► ETAPA 6 ──► ETAPA 7
Identidade   Treino     Nutrição   Hábitos    Seu Dia    Progresso  Inteligência
```

---

## Etapa 1: Identidade & Onboarding

**Entregáveis:** A1–A6

**Por que primeiro:**
- Sem usuário e perfil, nada se personaliza
- Objetivo e preferências alimentam todos os módulos seguintes
- Onboarding é a primeira impressão — define D1

**Critério de conclusão:** Usuário completa onboarding e recebe confirmação "seu plano está pronto".

---

## Etapa 2: Treino (Core Action)

**Entregáveis:** C1–C7

**Por que segundo:**
- Treino é a **ação principal** do Core Loop
- Maior valor percebido no dia 1
- Gera o evento mais importante (training.session.completed)
- Plano de treino depende de A3 (objetivo) + A5 (preferências)

**Critério de conclusão:** Usuário completa 1 treino inteiro e vê confirmação.

---

## Etapa 3: Nutrição (Segunda perna da integração)

**Entregáveis:** D1–D5

**Por que terceiro:**
- Nutrição integrada ao treino prova o diferencial
- Meta macro depende de A3 + A4
- Registro de refeição é segunda ação mais frequente
- Depende de identidade (Etapa 1), não de treino (paralelo possível, mas sequencial reduz risco)

**Critério de conclusão:** Usuário registra 1 refeição e vê progresso macro do dia.

---

## Etapa 4: Hábitos (Contexto de recuperação)

**Entregáveis:** E1–E4

**Por que quarto:**
- Sono alimenta a única correlação do MVP (G4)
- Baixa complexidade — pode ser paralelo à Etapa 3
- Completa as 3 dimensões integradas
- Depende de identidade, não de treino/nutrição

**Critério de conclusão:** Usuário registra sono e vê visualização semanal.

---

## Etapa 5: Seu Dia (Hub — integração)

**Entregáveis:** B1–B4

**Por que quinto:**
- Seu Dia **agrega** treino + nutrição + hábitos
- Construir hub antes dos módulos = hub vazio
- Construir hub depois = integração real desde o dia 1
- É a "entrada" do Core Loop — depende de tudo existir

**Critério de conclusão:** Usuário abre app, vê plano do dia integrado, executa ação.

---

## Etapa 6: Progresso & Check-in Semanal

**Entregáveis:** F1–F5

**Por que sexto:**
- Progresso requer eventos acumulados (treino, nutrição, hábitos)
- Check-in semanal é o fechamento do ciclo — depende de 7 dias de dados
- Ajuste de plano (F4) depende de aderência calculada (F3)
- Timeline simples depende de eventos existentes

**Critério de conclusão:** Usuário completa 1 check-in semanal e vê aderência + ajuste.

---

## Etapa 7: Inteligência Mínima

**Entregáveis:** G1–G4

**Por que último:**
- Prescrição inicial (G1) pode ser desenvolvida cedo, mas **integrada** por último
- Feedback contextual (G2) depende de eventos reais
- Detecção de desvio (G3) depende de planos + omissões
- Correlação sono→treino (G4) depende de ≥14 dias de dados — **só ativa pós-lançamento**

**Critério de conclusão:** Sistema gera plano no onboarding, responde a registros, detecta treino não feito.

---

## Diagrama de dependências

```
Etapa 1 (Identidade)
    │
    ├──────────────────┬──────────────────┐
    ▼                  ▼                  ▼
Etapa 2 (Treino)   Etapa 3 (Nutrição)  Etapa 4 (Hábitos)
    │                  │                  │
    └──────────────────┼──────────────────┘
                       ▼
                 Etapa 5 (Seu Dia)
                       │
                       ▼
                 Etapa 6 (Progresso)
                       │
                       ▼
                 Etapa 7 (Inteligência)
```

**Paralelismo possível:** Etapas 2, 3 e 4 podem ser desenvolvidas em paralelo após Etapa 1. Etapas 5, 6, 7 são sequenciais.

---

# 9. Revisão crítica

## O que ainda parece grande demais?

| Área | Risco | Recomendação |
|------|-------|--------------|
| **39 funcionalidades** | Escopo creep disfarçado de "mínimo" | Manter lista; cortar P2 (G4) se atrasar |
| **7 módulos** | Complexidade de integração | Aceitável — são domínios conceituais, não microserviços |
| **Nutrição no MVP** | Registro alimentar tem baixa aderência historicamente | Manter, mas D3 (estimativa por refeição) é não-negociável — sem busca de alimentos |
| **Check-in semanal** | Usuários podem ignorar | Manter — é o fechamento do loop; simplificar ao máximo (3 perguntas) |
| **Biblioteca de exercícios** | Pode virar projeto de conteúdo | MVP: 30–50 exercícios cobrindo templates. Não 500. |

---

## O que poderia ser removido?

| Funcionalidade | Argumento para remover | Veredicto |
|----------------|----------------------|-----------|
| G4 (correlação sono→treino) | Requer 14 dias; cold start | **Remover do lançamento.** Ativar via update D14. |
| E2 (hidratação) | Sono sozinho basta | **Manter** — 15 segundos, completa loop |
| F1 (peso) | Opcional, poucos registram | **Manter** — opcional, zero fricção se ignorado |
| C6 (substituição manual) | Edge case | **Manter** — lesões acontecem; alternativa = abandono |
| D5 (ajuste meta por objetivo) | Pode ser fixo | **Manter** — integração percebida depende disso |
| F5 (timeline simples) | Nice to have | **Reduzir** — mostrar últimos 7 dias, não timeline completa |

### Corte recomendado se prazo apertar

```
CORTAR:
  - G4 (correlação) → V1
  - F5 (timeline) → mostrar só resumo semanal
  - C5 (biblioteca) → lista de nomes, sem imagens

MANTER A TODO CUSTO:
  - B1 (Seu Dia)
  - C2 + C3 (treino + registro)
  - D2 + D4 (refeição + progresso macro)
  - E1 (sono)
  - F2 + F3 (check-in + aderência)
  - G1 + G2 (prescrição + feedback)
```

---

## O que provavelmente será adicionado cedo demais?

| Tentação | Por que resistir | Quando |
|----------|----------------|--------|
| "Só um chatbot simples" | Não prova hipótese; distrai | V1 |
| "Vamos integrar Apple Health" | Complexidade; dados manuais bastam | V2 |
| "Usuários pedem busca de alimentos" | Feature request ≠ validação | V1 |
| "Precisamos cobrar logo" | Validar valor antes de preço | V1 |
| "Vamos adicionar cardio" | Treino cobre; dilui foco | V1 |
| "Notificações push vão reter" | Pode irritar; orgânico primeiro | V1 |
| "Vamos gamificar streaks" | Product Bible proíbe | Nunca |

---

## O que realmente diferencia este MVP?

| Diferencial | Presente no MVP? | Como |
|-------------|------------------|------|
| **Integração treino + nutrição + hábitos** | ✅ Sim | Seu Dia unifica as 3 dimensões |
| **Loop diário claro** | ✅ Sim | Entrada → ação → feedback → retorno |
| **Feedback contextual (não genérico)** | ✅ Parcial | Regras + templates, 1 correlação pós-D14 |
| **Recuperação graciosa** | ✅ Sim | Remarcação, não punição |
| **IA explicável** | ❌ Não | V1 |
| **Correlações profundas** | ❌ Não | V2 |
| **Wearables** | ❌ Não | V2 |
| **Periodização automática** | ❌ Não | V1 |

### Verdade incômoda

O MVP diferencia-se de apps fitness existentes **pela integração e pelo loop**, não pela inteligência. Isso é intencional — provamos retenção antes de investir em IA.

> *"Antes eu tinha cinco apps. Agora tenho um sistema."* — essa frase deve ser possível no MVP, mesmo sem IA avançada.

---

# ESCOPO FINAL CONGELADO — MVP v1

## O que entra

```
┌─────────────────────────────────────────────────────────────────┐
│                      MVP v1 — CONGELADO                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  IDENTIDADE          Onboarding ≤3 min, 1 objetivo, perfil     │
│                                                                 │
│  SEU DIA             Hub diário integrado                       │
│                                                                 │
│  TREINO              Plano semanal, execução, registro simples  │
│                      30–50 exercícios (texto + imagem)          │
│                                                                 │
│  NUTRIÇÃO            Meta calórica + proteína, registro         │
│                      por refeição (estimativa, não busca)       │
│                                                                 │
│  HÁBITOS             Sono + hidratação                           │
│                                                                 │
│  PROGRESSO           Check-in semanal, aderência, peso opcional │
│                                                                 │
│  INTELIGÊNCIA        Regras + feedback templates + desvio       │
│                      (correlação sono→treino: update D14)       │
│                                                                 │
│  CONTA               Login, editar perfil, excluir conta         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  FUNCIONALIDADES: 36 P0/P1 (+ 1 P2 adiada pós-lançamento)      │
│  MÉTRICA NORTE:   Retenção D30 ≥ 25%                            │
│  HIPÓTESE:        Loop integrado retém sem IA avançada          │
└─────────────────────────────────────────────────────────────────┘
```

## O que NÃO entra

```
✗ Chatbot / IA conversacional
✗ Wearables
✗ Vídeos de exercícios
✗ Busca de alimentos
✗ Receitas / cardápios
✗ Periodização automática
✗ Gamificação / streaks punitivos
✗ Comunidade / social
✗ Profissionais / B2B
✗ Assinatura paga
✗ Push notifications
✗ Knowledge Graph
✗ Múltiplos objetivos
✗ 5 hábitos
✗ Correlações múltiplas (lançamento)
```

## Compromisso

Este escopo está **congelado**. Qualquer adição exige:
1. Passar pela checklist (Seção 5)
2. Remover equivalente em escopo (zero-sum)
3. Aprovação formal
4. Nova versão deste documento

---

## Controle de Versão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | Jul 2026 | Product Team | Escopo MVP congelado |

---

## Referências cruzadas

| Documento | Papel |
|-----------|-------|
| `PRODUCT_BIBLE.md` | Quem somos, por que existimos |
| `CONCEPTUAL_ARCHITECTURE.md` | Como o produto pensa |
| `MVP_LOCK.md` | **O que construir agora** |
| *Próximo* | User Journey Maps + Tech Stack Decision |

---

*Este documento protege o produto de si mesmo. A tentação de adicionar será constante. A disciplina de não adicionar será o que separa um MVP que valida de um MVP que apenas demora.*
