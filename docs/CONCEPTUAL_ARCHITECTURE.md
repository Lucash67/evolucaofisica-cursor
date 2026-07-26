# Arquitetura Conceitual — Evolução Física

> **Versão:** 1.0  
> **Status:** Documento fundacional de arquitetura — referência para toda implementação futura  
> **Última atualização:** Julho 2026  
> **Escopo:** Modelo mental, domínios, eventos, contexto, inteligência e adaptação. Sem tecnologia, sem interfaces, sem código.

---

## Prefácio

A Product Bible responde **quem somos**, **por que existimos** e **qual problema resolvemos**.

Este documento responde uma única pergunta:

> **"Como esse produto enxerga, interpreta e aprende com a vida do usuário?"**

Não descrevemos módulos de software. Descrevemos um **organismo cognitivo** — um sistema que observa a vida física de uma pessoa, constrói entendimento contínuo, e age com prudência.

Toda implementação futura — frontend, backend, IA, persistência, APIs — deve ser derivada deste modelo, nunca imposta sobre ele.

---

## Índice

1. [Modelo Mental do Produto](#1-modelo-mental-do-produto)
2. [Core Domain](#2-core-domain)
3. [Event Driven Thinking](#3-event-driven-thinking)
4. [Context Engine](#4-context-engine)
5. [Intelligence Loop](#5-intelligence-loop)
6. [Timeline da Evolução](#6-timeline-da-evolução)
7. [Adaptive System](#7-adaptive-system)
8. [Knowledge Graph](#8-knowledge-graph)
9. [Future Scalability](#9-future-scalability)
10. [Diagramas Conceituais](#10-diagramas-conceituais)
11. [Cenários Reais](#11-cenários-reais)
12. [Revisão Crítica](#12-revisão-crítica)

---

# 1. Modelo Mental do Produto

## 1.1 Como o sistema enxerga a evolução física

Evolução física não é uma lista de tarefas. É um **processo contínuo de adaptação biológica** influenciado por comportamento, ambiente, recuperação, nutrição, emoção e tempo.

O produto não enxerga o usuário como alguém que "cumpre um plano". Enxerga o usuário como um **organismo em transformação**, atravessando fases, respondendo a estímulos, acumulando história.

```
                    TEMPO ──────────────────────────────────────►

    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ Eventos │───►│ Contexto│───►│ Insights│───►│ Decisões│
    │ (vida)  │    │ (signif)│    │ (entend)│    │ (ação)  │
    └─────────┘    └─────────┘    └─────────┘    └─────────┘
         ▲                                              │
         │                                              │
         └──────────────── Feedback loop ───────────────┘
```

O corpo muda devagar. O sistema deve pensar em **tendências**, não em instantes isolados. Um treino ruim não define nada. Três semanas de sono ruim definem muito.

---

## 1.2 A unidade fundamental: o Evento

**Definição:** Um Evento é qualquer acontecimento registrável — observado pelo usuário, inferido pelo sistema, ou importado de fonte externa — que altera o estado do organismo ou do seu entorno.

O Evento é a unidade atômica de toda a arquitetura. Sem eventos, não há contexto. Sem contexto, não há inteligência.

### Propriedades essenciais de um Evento

| Propriedade | Significado |
|-------------|-------------|
| **Ocorrência** | Quando aconteceu (timestamp, duração) |
| **Tipo** | O que aconteceu (treinou, comeu, dormiu, pesou) |
| **Origem** | Quem registrou (usuário, sistema, wearable, profissional) |
| **Confiança** | Quão certo estamos desse registro |
| **Payload** | Dados específicos do evento (exercícios, macros, horas de sono) |
| **Vínculos** | Relações com outros eventos, objetivos, fases |

### Exemplos de Eventos

```
Evento: sleep.completed
  Ocorrência: 2026-07-25 06:42
  Payload: { duration: 5h48m, quality: "ruim", interruptions: 3 }
  Origem: wearable + confirmação do usuário
  Confiança: 0.85

Evento: training.session.completed
  Ocorrência: 2026-07-25 07:30–08:15
  Payload: { type: "força", exercises: [...], RPE: 8, notes: "cansado" }
  Origem: usuário
  Confiança: 0.95

Evento: nutrition.meal.logged
  Ocorrência: 2026-07-25 08:45
  Payload: { meal: "café", protein_g: 35, calories_est: 520 }
  Origem: usuário
  Confiança: 0.70  (estimativa, não pesagem)
```

**Por que Evento e não "registro" ou "dado"?**

Porque eventos têm **narrativa temporal**. Dados estáticos ("peso = 82kg") são snapshots. Eventos ("pesou 82kg após semana de bulking com sono ruim") carregam causalidade potencial.

---

## 1.3 O que representa um Contexto

**Definição:** Contexto é o significado derivado de um ou mais eventos, agregado no tempo, filtrado pelo objetivo e pela fase atual do usuário.

Contexto responde: **"O que isso significa, agora, para esta pessoa?"**

Um Evento isolado é fato. Contexto é interpretação situada.

```
Eventos brutos:
  - Dormiu 5h
  - RPE 9 no treino
  - Pulou café da manhã

Contexto imediato derivado:
  - "Estado de recuperação comprometido"
  - "Risco elevado de overreaching nas próximas 48h"
  - "Ingestão proteica matinal abaixo do padrão desta fase"
```

Contexto **nunca é digitado pelo usuário**. É **construído** pelo sistema a partir de eventos, objetivos, fases e histórico.

Contexto tem **validade temporal**. Contexto imediato expira em horas. Contexto de fase persiste por semanas.

---

## 1.4 O que representa um Objetivo

**Definição:** Um Objetivo é a intenção estratégica declarada (ou inferida) que orienta todas as interpretações e recomendações do sistema.

Objetivos não são metas numéricas isoladas. São **vetores de decisão**.

| Objetivo | O que muda no sistema |
|----------|----------------------|
| Hipertrofia | Prioriza volume, superávit moderado, recuperação |
| Emagrecimento | Prioriza déficit sustentável, preservação de massa |
| Força | Prioriza progressão de carga, descanso entre séries |
| Saúde geral | Prioriza consistência, habitabilidade, baixo risco |
| Retorno pós-lesão | Prioriza segurança, progressão conservadora |
| Performance esportiva | Prioriza periodização específica do esporte |

Um usuário pode ter **um objetivo primário** e **objetivos secundários** (ex: hipertrofia + melhorar sono).

**Objetivo altera a lente.** O mesmo evento "perdeu 1kg" significa coisas diferentes em cutting vs. bulking vs. recuperação de doença.

```
                    ┌─────────────────┐
                    │    OBJETIVO     │
                    │  (lente ativa)  │
                    └────────┬────────┘
                             │ filtra
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
    Evento A            Evento B            Evento C
    "neutral"           "positivo"          "alerta"
```

---

## 1.5 O que representa uma Fase

**Definição:** Uma Fase é um período delimitado dentro da jornada do usuário, com características, prioridades e regras de adaptação específicas.

Fases estruturam o tempo. Objetivos definem direção; Fases definem **como** percorrer essa direção em um intervalo.

### Exemplos de Fases

| Fase | Duração típica | Características |
|------|----------------|-----------------|
| Adaptação inicial | 2–4 semanas | Aprendizado de padrões, cargas conservadoras |
| Accumulation (volume) | 4–6 semanas | Volume crescente, intensidade moderada |
| Intensification | 3–4 semanas | Carga alta, volume reduzido |
| Deload | 1 semana | Recuperação ativa, redução 40–60% |
| Cutting | 8–16 semanas | Déficit calórico, preservação muscular |
| Bulking | 12–20 semanas | Superávit controlado, progressão |
| Manutenção | Indefinido | Estabilização, habit building |
| Recuperação (lesão/doença) | Variável | Restrições, progressão mínima |
| Reintrodução | 2–4 semanas | Retorno gradual pós-pausa |

Fases podem ser **declaradas** (usuário inicia bulking), **prescritas** (sistema sugere deload), ou **inferidas** (padrão de comportamento indica platô).

```
Objetivo: Hipertrofia
    │
    ├── Fase 1: Adaptação (semanas 1–3)
    ├── Fase 2: Accumulation (semanas 4–9)
    ├── Fase 3: Intensification (semanas 10–13)
    └── Fase 4: Deload (semana 14)
            │
            └──► Nova iteração ou transição de objetivo
```

---

## 1.6 O que representa um Plano

**Definição:** Um Plano é a materialização operacional do objetivo e da fase atual — um conjunto de intenções futuras (treinos, metas nutricionais, hábitos) que o sistema propõe para um horizonte definido.

Plano **não é ordem**. Plano é **hipótese de ação**.

| Aspecto | Plano | Evento |
|---------|-------|--------|
| Temporalidade | Futuro | Passado/presente |
| Natureza | Intenção | Fato |
| Mutabilidade | Alta — recalculado constantemente | Imutável (append-only) |
| Exemplo | "Treino de pernas amanhã, 45min" | "Treinou pernas hoje, 52min" |

Planos existem em múltiplos horizontes:

- **Plano imediato** — hoje, próximas horas
- **Plano diário** — restante do dia
- **Plano semanal** — distribuição de treinos, metas macro
- **Plano de fase** — periodização do mesociclo

Quando um Plano encontra a realidade (Eventos), nasce **desvio**. Desvio alimenta adaptação.

```
    PLANO (hipótese)              EVENTOS (realidade)
         │                              │
         └──────────┬───────────────────┘
                    ▼
               DESVIO medido
                    │
                    ▼
            ADAPTAÇÃO do plano
```

---

## 1.7 O que representa um Insight

**Definição:** Um Insight é uma conclusão derivada pelo sistema — padrão detectado, correlação significativa, tendência identificada, ou anomalia relevante — que aumenta o entendimento sobre o usuário.

Insights **informam**, não necessariamente **prescrevem**.

### Tipos de Insight

| Tipo | Exemplo |
|------|---------|
| **Tendência** | "Volume de treino subiu 15% nas últimas 3 semanas" |
| **Correlação** | "Dias com <6h sono precedem queda de 12% na performance" |
| **Anomalia** | "Peso subiu 2kg em 4 dias — acima do esperado para bulking moderado" |
| **Marco** | "Maior carga no supino em 6 meses" |
| **Padrão comportamental** | "Treinos de segunda têm 40% mais aderência que quinta" |
| **Predição** | "Com aderência atual, atingirá meta de força em ~5 semanas" |

Insights têm **confiança** e **janela de validade**. Um insight baseado em 5 dias de dados é frágil. Um baseado em 90 dias é robusto.

```
Eventos (100+) ──► Correlação ──► Insight ──► Recomendação?
                       │              │
                       │              └── Pode ficar só informativo
                       └── Confiança proporcional à amostra
```

---

## 1.8 O que representa uma Recomendação

**Definição:** Uma Recomendação é uma sugestão acionável do sistema, derivada de contexto e insights, com explicação explícita e grau de confiança.

Recomendações são **propostas**, não ordens.

### Anatomia de uma Recomendação

```
Recomendação:
  Ação: "Reduzir volume de treino em 30% esta semana"
  Razão: "Três noites consecutivas <6h sono + queda de performance"
  Confiança: 0.78
  Alternativas:
    - Manter treino, reduzir intensidade
    - Trocar por sessão de mobilidade
  Horizonte: próximos 5 dias
  Reversível: sim
  Requer confirmação: não (ajuste automático leve) / sim (mudança de fase)
```

Recomendações respeitam **limites de autonomia** definidos na Product Bible: o usuário pode aceitar, modificar ou ignorar — e o sistema aprende com cada escolha.

---

## 1.9 O que representa uma Decisão

**Definição:** Uma Decisão é o momento em que uma Recomendação (ou opção do usuário) se torna compromisso — alterando planos, fases, ou gerando novos eventos.

Decisões podem ser:

| Origem | Exemplo |
|--------|---------|
| **Sistema (automática)** | Ajuste de carga após RPE alto |
| **Sistema (proposta → aceita)** | Usuário aceita deload sugerido |
| **Usuário (espontânea)** | "Quero mudar para cutting" |
| **Usuário (override)** | Ignora recomendação, mantém treino pesado |
| **Profissional** | Nutricionista altera meta de proteína |
| **Sistema (por omissão)** | Usuário não treinou → plano recalculado |

Toda Decisão gera um **Evento de decisão** — auditável, rastreável, aprendível.

```
Recomendação: "Deload esta semana"
        │
        ├── Usuário aceita ──► Decisão ──► Evento: phase.deload.started
        ├── Usuário adia ──► Decisão ──► Evento: recommendation.deferred
        └── Usuário rejeita ──► Decisão ──► Evento: recommendation.rejected
                                              └── Sistema aprende preferência
```

---

## 1.10 Relações entre os conceitos — O organismo completo

```
                         ┌──────────────────────────────────┐
                         │           USUÁRIO (organismo)     │
                         │  Objetivo ativo + Fase atual      │
                         └───────────────┬──────────────────┘
                                         │
              ┌──────────────────────────┼──────────────────────────┐
              │                          │                          │
              ▼                          ▼                          ▼
        ┌──────────┐              ┌──────────┐              ┌──────────┐
        │  EVENTOS │─────────────►│ CONTEXTO │─────────────►│ INSIGHTS │
        │  (vida)  │   alimenta   │(signif.) │   gera       │(entend.) │
        └────▲─────┘              └────┬─────┘              └────┬─────┘
             │                         │                         │
             │                         ▼                         ▼
             │                   ┌──────────┐              ┌──────────────┐
             │                   │   PLANO  │◄─────────────│ RECOMENDAÇÃO │
             │                   │(intenção)│   ajusta     │   (ação?)    │
             │                   └────┬─────┘              └──────┬───────┘
             │                        │                         │
             │                        │                         ▼
             │                        │                   ┌──────────┐
             └────────────────────────┴───────────────────│ DECISÃO  │
                        feedback                           │(compromis)│
                                                           └──────────┘
```

### Fluxo narrativo completo (exemplo)

1. **Evento:** Lucas dorme 5h (wearable)
2. **Evento:** Lucas treina pernas, RPE 9, performance -15% vs. semana passada
3. **Contexto imediato:** Recuperação comprometida + overreaching provável
4. **Contexto de fase:** Semana 8 de accumulation — volume acumulado alto
5. **Insight:** Correlação sono-performance confirmada pela 12ª vez
6. **Recomendação:** Deload parcial — reduzir volume 40% por 5 dias
7. **Decisão:** Lucas aceita
8. **Plano:** Recalculado — próximos treinos com volume reduzido
9. **Evento:** `decision.deload.accepted` registrado
10. **Aprendizado:** Sistema reforça peso da variável sono para este usuário

---

# 2. Core Domain

## 2.1 Princípio de organização

Os domínios não são "módulos de app". São **capacidades cognitivas** do organismo digital — cada um com responsabilidade clara, fronteiras explícitas, e regras de comunicação.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DOMÍNIO: USUÁRIO                            │
│  Identidade, preferências, restrições, histórico de vida            │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         DOMÍNIO: EVENTOS                            │
│  Tudo que acontece — fonte de verdade temporal                      │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         DOMÍNIO: CONTEXTO                           │
│  Significado derivado — múltiplas camadas temporais               │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ DOMÍNIO:         │ │ DOMÍNIO:         │ │ DOMÍNIO:         │
│ OBJETIVOS        │ │ FASES            │ │ PLANOS           │
│ (direção)        │ │ (estrutura temp.)│ │ (intenção)       │
└────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DOMÍNIOS DE AÇÃO                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   TREINO     │  │  NUTRIÇÃO    │  │   HÁBITOS    │              │
│  │ (estímulo)   │  │ (combustível)│  │ (suporte)    │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
└─────────┼─────────────────┼─────────────────┼───────────────────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DOMÍNIO: PROGRESSO                            │
│  Tendências, marcos, aderência, narrativa de evolução              │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DOMÍNIO: INTELIGÊNCIA                            │
│  Interpretação, correlação, recomendação, aprendizado               │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DOMÍNIO: INSIGHTS                             │
│  Conclusões derivadas — saída da inteligência                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2.2 Descrição de cada domínio

### Usuário
**Responsabilidade:** Representar quem é esta pessoa — não apenas dados demográficos, mas preferências, restrições, histórico de lesões, relação com comida, tolerância a volume, padrões de aderência.

**Emite:** preferências, restrições, declarações de objetivo  
**Consome:** insights, recomendações, narrativa de progresso

### Eventos
**Responsabilidade:** Registrar tudo que acontece. Fonte única de verdade temporal. Imutável (append-only).

**Emite:** fatos para Contexto e Progresso  
**Consome:** nada diretamente — Eventos são folha da árvore

### Contexto
**Responsabilidade:** Derivar significado de eventos em múltiplas janelas temporais, filtrado por objetivo e fase.

**Emite:** estado interpretado para Inteligência e Planos  
**Consome:** Eventos, Objetivos, Fases, histórico

### Objetivos
**Responsabilidade:** Manter a direção estratégica ativa. Filtrar interpretações.

**Emite:** lentes de decisão, critérios de sucesso  
**Consome:** Progresso, Insights, declarações do usuário

### Fases
**Responsabilidade:** Estruturar o tempo em blocos com regras distintas.

**Emite:** parâmetros de plano, limites de adaptação  
**Consome:** Objetivos, Progresso, Inteligência

### Planos
**Responsabilidade:** Materializar intenções futuras coerentes com objetivo + fase + contexto.

**Emite:** prescrições para Treino, Nutrição, Hábitos  
**Consome:** Contexto, Objetivos, Fases, Recomendações

### Treino / Nutrição / Hábitos
**Responsabilidade:** Domínios de ação — onde planos viram eventos concretos.

Cada um:
- **Recebe** prescrições do Plano
- **Gera** Eventos quando executado
- **Nunca interpreta** — apenas executa e registra

### Progresso
**Responsabilidade:** Medir tendências, calcular aderência, identificar marcos, construir narrativa.

**Emite:** métricas, tendências, marcos para Inteligência e Objetivos  
**Consome:** Eventos (agregados)

### Inteligência
**Responsabilidade:** Interpretar, correlacionar, recomendar, aprender.

**Emite:** Insights, Recomendações, ajustes de Plano  
**Consome:** Contexto, Progresso, Eventos, Objetivos, Fases

### Insights
**Responsabilidade:** Armazenar conclusões derivadas — reutilizáveis, referenciáveis, com confiança e validade.

**Emite:** informação para Recomendações, Progresso (narrativa), Usuário (feedback)  
**Consome:** saída da Inteligência

---

## 2.3 Matriz de dependências

```
           Depende de →
           USR  EVT  CTX  OBJ  FAS  PLN  TRN  NUT  HAB  PRG  INT  INS
USR         -    ·    ·    ·    ·    ·    ·    ·    ·    ·    ·    ◄
EVT         ·    -    ►    ·    ·    ·    ►    ►    ►    ►    ►    ·
CTX         ►    ►    -    ►    ►    ·    ·    ·    ·    ·    ►    ·
OBJ         ►    ·    ·    -    ►    ►    ·    ·    ·    ►    ►    ►
FAS         ►    ·    ►    ►    -    ►    ·    ·    ·    ►    ►    ·
PLN         ►    ·    ►    ►    ►    -    ►    ►    ►    ·    ►    ►
TRN         ·    ►    ·    ·    ·    ◄    -    ·    ·    ·    ·    ·
NUT         ·    ►    ·    ·    ·    ◄    ·    -    ·    ·    ·    ·
HAB         ·    ►    ·    ·    ·    ◄    ·    ·    -    ·    ·    ·
PRG         ·    ►    ·    ►    ·    ·    ·    ·    ·    -    ►    ►
INT         ►    ►    ►    ►    ►    ►    ·    ·    ·    ►    -    ►
INS         ·    ·    ·    ►    ·    ·    ·    ·    ·    ►    ◄    -

► = depende de    ◄ = é consumido por    · = sem dependência direta
```

---

## 2.4 Dependências proibidas

Estas dependências **nunca** devem existir — violam a integridade do modelo:

| Proibido | Por quê |
|----------|---------|
| **Treino → Inteligência** (direto) | Domínios de ação não interpretam; geram eventos |
| **Nutrição → Treino** (direto) | Comunicação via Contexto ou Plano, nunca acoplamento |
| **Plano → Evento** (escrita) | Planos não alteram passado; apenas propõem futuro |
| **Insight → Evento** (escrita) | Insights são derivados, não fonte de fatos |
| **Inteligência → Usuário** (escrita direta) | Inteligência propõe; Decisão altera usuário |
| **Progresso → Plano** (direto) | Progresso informa Inteligência, que ajusta Plano |

**Regra de ouro:** Domínios de ação (Treino, Nutrição, Hábitos) **só emitem eventos**. Domínios cognitivos (Contexto, Inteligência) **só consomem eventos e emitem interpretações**.

```
     CORRETO                          INCORRETO

  Treino ──► Evento              Treino ──► Nutrição
                │                      (acoplamento direto)
                ▼
            Contexto
                │
                ▼
           Inteligência
                │
                ▼
            Plano ──► Nutrição
```

---

# 3. Event Driven Thinking

## 3.1 Por que orientação a eventos

A vida física de uma pessoa é uma **sequência contínua de acontecimentos**. Não é um estado estático consultado periodicamente.

Apps tradicionais modelam "formulários" — o usuário abre, preenche peso, fecha. O produto esquece até a próxima visita.

Nossa arquitetura modela **fluxo** — cada ação, omissão, sensor ou declaração é um evento que:

1. **Enriquece** o contexto imediatamente
2. **Pode disparar** reavaliação de planos
3. **Alimenta** correlações de longo prazo
4. **Permanece** no histórico para sempre

```
Modelo estático (rejeitado):          Modelo orientado a eventos:

  Usuário consulta app               Vida acontece continuamente
         │                                    │
         ▼                                    ▼
  Lê "estado atual"                    Eventos fluem constantemente
         │                                    │
         ▼                                    ▼
  Preenche formulário                  Contexto se reconstrói
         │                                    │
         ▼                                    ▼
  Estado salvo                         Inteligência reage quando necessário
         │                                    │
         ▼                                    ▼
  App esquece até próxima visita       Timeline cresce indefinidamente
```

### Benefícios arquiteturais

| Benefício | Explicação |
|-----------|------------|
| **Auditabilidade** | Toda decisão tem rastreabilidade até eventos causadores |
| **Temporalidade nativa** | Ordem, duração, simultaneidade são first-class |
| **Integração futura** | Wearables, labs, profissionais — todos emitem eventos |
| **Desacoplamento** | Consumidores reagem a eventos sem conhecer emissores |
| **Replay** | Possível reconstruir contexto de qualquer ponto no tempo |
| **Aprendizado** | Modelos melhoram com histórico rico, não snapshots |

---

## 3.2 Taxonomia de eventos

### Eventos de vida (Life Events)
Acontecimentos do dia a dia que compõem a rotina física.

```
lifecycle.wake          — acordou
sleep.completed         — terminou período de sono
sleep.quality.reported  — qualidade subjetiva do sono
training.session.started
training.session.completed
training.exercise.skipped
nutrition.meal.logged
nutrition.water.logged
nutrition.supplement.taken
body.weight.recorded
body.measurement.recorded
cardio.session.completed
habit.completed
habit.missed
mood.reported
energy.reported
```

### Eventos de sistema (System Events)
Gerados pelo produto, não pelo corpo.

```
plan.generated
plan.adjusted
phase.started
phase.completed
objective.changed
recommendation.presented
recommendation.accepted
recommendation.rejected
recommendation.deferred
insight.discovered
context.recalculated
```

### Eventos de mundo (World Events)
Mudanças no entorno que afetam capacidade ou comportamento.

```
environment.gym.changed       — trocou de academia
environment.travel.started    — início de viagem
environment.travel.ended
environment.schedule.changed  — mudança de rotina de trabalho
environment.equipment.added   — comprou equipamento
environment.equipment.removed
health.injury.reported
health.illness.reported
health.recovery.declared
```

### Eventos de integração (Integration Events)
Importados de fontes externas (futuro).

```
integration.healthkit.sleep.imported
integration.garmin.hrv.imported
integration.whoop.recovery.imported
integration.lab.result.imported
professional.prescription.received
```

---

## 3.3 Um dia na vida — fluxo de eventos

```
06:15  lifecycle.wake
         └── Contexto imediato: início do dia, energia desconhecida

06:20  sleep.completed { duration: 6h10m, source: wearable }
         └── Contexto imediato: sono abaixo da meta (7.5h)
         └── Contexto diário: terceira noite curta na semana
         └── Insight potencial: padrão de sono irregular

07:00  training.session.completed { type: upper, RPE: 7, duration: 55m }
         └── Contexto imediato: treino executado apesar de sono ruim
         └── Contexto de fase: aderência mantida — semana 6/8
         └── Progresso: volume acumulado +1 sessão

08:30  nutrition.meal.logged { meal: breakfast, protein: 40g }
         └── Contexto imediato: proteína matinal adequada
         └── Contexto de fase: média proteica 7d dentro da meta

12:45  nutrition.meal.logged { meal: lunch, protein: 45g }
         └── Contexto diário: 85g proteína até agora (meta: 160g)

15:00  mood.reported { value: "cansado", scale: 1-5 → 2 }
         └── Contexto imediato: fadiga acumulada (sono + treino + mood)
         └── Correlação reforçada: sono → mood → performance

18:30  training.session.skipped { reason: "sem tempo" }
         └── Contexto diário: plano desviado
         └── Plano: cardio remarcado ou absorvido na semana
         └── Decisão automática: não penalizar — recalcular semana

22:00  habit.completed { habit: "preparo refeições" }
         └── Contexto semanal: 4/7 dias de meal prep

23:15  sleep.started
         └── Contexto imediato: dormindo tarde novamente
```

---

## 3.4 Como eventos geram contexto

Eventos não geram contexto isoladamente. A **Context Engine** (Capítulo 4) agrega, pondera e filtra.

```
Evento único:                    Agregação contextual:

sleep.completed                  Contexto imediato:
{ duration: 6h }        ──►       "Recuperação insuficiente hoje"

                                 Contexto diário:
                                 "Segundo dia consecutivo <6.5h"

                                 Contexto semanal:
                                 "Média sono: 6.4h (meta: 7.5h)"

                                 Contexto histórico:
                                 "Lucas tende a dormir mal seg/ter"

                                 Contexto de fase:
                                 "Em accumulation — risco de overreaching"

                                 Contexto de objetivo:
                                 "Hipertrofia requer recuperação — alerta"
```

### Eventos que influenciam outros eventos (causalidade)

```
sleep.completed (curto)
       │
       ├──► Influencia interpretação de training.session (performance esperada menor)
       ├──► Influencia nutrition.recommendation (priorizar recuperação vs. superávit)
       ├──► Influencia habit.priority (sugerir alongamento vs. cardio)
       └──► Influencia plan.adjustment (reduzir volume amanhã?)

training.session.completed (RPE alto + performance baixa)
       │
       ├──► Confirma contexto de sono ruim
       ├──► Dispara insight.correlation (sono → performance)
       └──► Dispara recommendation (deload parcial?)
```

---

## 3.5 Eventos de omissão

**O que não aconteceu também é evento.**

```
training.session.missed     — treino planejado não executado
nutrition.day.incomplete    — dia sem registro nutricional
habit.streak.broken         — hábito não cumprido
app.inactive                — usuário não abriu app em X dias
plan.expired.unused         — plano não seguido
```

Omissões são **first-class citizens**. Ignorar omissão leva a recomendações desconectadas da realidade.

```
Plano: 4 treinos/semana
Realidade: 1 treino em 10 dias

Sem eventos de omissão → sistema acha que usuário está no plano
Com eventos de omissão → contexto de aderência baixa → adaptação
```

---

## 3.6 Eventos alimentam inteligência

```
                    ┌─────────────────────────────────┐
                    │         FLUXO DE EVENTOS         │
                    └─────────────────┬───────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              ▼                       ▼                       ▼
       ┌────────────┐          ┌────────────┐          ┌────────────┐
       │  Contexto  │          │ Progresso  │          │  Timeline  │
       │  (agora)   │          │ (tendência)│          │ (história) │
       └─────┬──────┘          └─────┬──────┘          └─────┬──────┘
             │                       │                       │
             └───────────────────────┼───────────────────────┘
                                     ▼
                          ┌────────────────────┐
                          │   INTELIGÊNCIA     │
                          │                    │
                          │ • Detecta padrões  │
                          │ • Correlaciona     │
                          │ • Prediz           │
                          │ • Recomenda        │
                          │ • Aprende          │
                          └────────────────────┘
```

**Regra:** Inteligência nunca acessa "estado mutável". Sempre reconstrói a partir de eventos + contexto derivado.

---

# 4. Context Engine

## 4.1 O que é o Context Engine

O Context Engine é o **sistema nervoso** do produto — transforma eventos brutos em compreensão situada, continuamente, em múltiplas resoluções temporais.

Não é cache. Não é banco de dados. É **processo de derivação contínua**.

```
Eventos (infinitos, imutáveis)
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTEXT ENGINE                            │
│                                                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐│
│  │Imediato │ │ Diário  │ │ Semanal │ │ Mensal  │ │Histórico││
│  │ (horas) │ │ (24h)   │ │ (7d)    │ │ (30d)   │ │ (tudo) ││
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └───┬────┘│
│       │           │           │           │          │     │
│  ┌────┴───────────┴───────────┴───────────┴──────────┴───┐│
│  │              Contexto de Objetivo                        ││
│  └──────────────────────────┬───────────────────────────────┘│
│                             │                                │
│  ┌──────────────────────────┴───────────────────────────────┐│
│  │              Contexto de Fase                             ││
│  └──────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
         │
         ▼
   Estado interpretado → Inteligência, Planos, Insights
```

---

## 4.2 Camadas de contexto

### Contexto Imediato (0–12 horas)
**Pergunta:** "Como está AGORA?"

| Input | Output contextual |
|-------|-------------------|
| Sono de 5h + treino pesado hoje cedo | Estado de fadiga elevado |
| Duas refeições proteicas consumidas | Ingestão parcial no caminho certo |
| Mood "cansado" reportado | Confirmação subjetiva de estado |

**Validade:** Expira em horas. Recalculado a cada evento relevante.

**Influencia:** Recomendações do restante do dia — "vale cardio?", "priorize proteína no jantar"

---

### Contexto Diário (últimas 24 horas)
**Pergunta:** "Como foi HOJE?"

| Input | Output contextual |
|-------|-------------------|
| Treino feito + 120g proteína + 7h sono | Dia alinhado ao plano |
| Treino pulado + registro incompleto | Dia de desvio — sem culpa, com recálculo |
| 3L água consumidos | Hidratação adequada |

**Validade:** Expira à meia-noite local (ou janela de sono do usuário).

**Influencia:** Resumo do dia, ajuste do plano de amanhã

---

### Contexto Semanal (últimos 7 dias)
**Pergunta:** "Como está a SEMANA?"

| Input | Output contextual |
|-------|-------------------|
| 3/4 treinos completados | Aderência 75% — aceitável |
| Média sono 6.2h | Déficit crônico de recuperação |
| Peso +0.3kg | Dentro do esperado para bulking moderado |
| Performance estável | Adaptação positiva ao volume |

**Validade:** Rolling window de 7 dias.

**Influencia:** Check-in semanal, decisões de micro-periodização, recomendações de fase

---

### Contexto Mensal (últimos 30 dias)
**Pergunta:** "Qual a TENDÊNCIA do mês?"

| Input | Output contextual |
|-------|-------------------|
| Volume treino +12% vs. mês anterior | Progressão adequada |
| Peso +1.5kg em 30 dias | Bulking no ritmo esperado |
| 80% aderência nutricional | Consistência boa |
| 2 deloads não realizados | Risco acumulado de overreaching |

**Validade:** Rolling window de 30 dias.

**Influencia:** Relatórios, avaliação de fase, transições de objetivo

---

### Contexto Histórico (toda a jornada)
**Pergunta:** "Quem é esta pessoa ao longo do TEMPO?"

| Input | Output contextual |
|-------|-------------------|
| 8 meses de dados | Padrões robustos |
| Lesão de ombro há 6 meses, recuperada | Restrição histórica — evitar movimentos específicos |
| Melhor aderência treinando de manhã | Preferência inferida |
| Responde bem a deloads de 5 dias | Personalização de recuperação |

**Validade:** Permanente, enriquecido continuamente.

**Influencia:** Personalização profunda, predições, onboarding de novas fases

---

### Contexto do Objetivo
**Pergunta:** "O que importa DADO o que a pessoa quer?"

Filtra e pondera todos os outros contextos pela lente do objetivo ativo.

```
Mesmo contexto semanal:
  Peso -0.8kg

  Objetivo = Cutting  → "Progresso positivo, manter estratégia"
  Objetivo = Bulking  → "Alerta — possível déficit involuntário"
  Objetivo = Manutenção → "Dentro da faixa esperada"
```

---

### Contexto da Fase Atual
**Pergunta:** "Onde estamos DENTRO desta jornada?"

| Fase | Contexto derivado |
|------|-------------------|
| Semana 2 de adaptação | Cargas ainda conservadoras, padrões emergindo |
| Semana 7 de accumulation | Volume alto, monitorar recuperação |
| Semana 1 de deload | Redução intencional — performance baixa é esperada |
| Semana 10 de cutting | Fadiga acumulada, considerar diet break |

---

## 4.3 Construção contínua de conhecimento

```
Novo evento chega
       │
       ▼
┌──────────────────┐
│ Evento relevante │──── Não ──► Armazenado, sem recálculo imediato
│ para contexto?   │
└────────┬─────────┘
         │ Sim
         ▼
┌──────────────────┐
│ Recalcular       │
│ camadas afetadas │
└────────┬─────────┘
         │
         ├── Contexto imediato (sempre)
         ├── Contexto diário (se evento do dia)
         ├── Contexto semanal (se impacto na semana)
         ├── Contexto mensal (se tendência alterada)
         ├── Contexto histórico (se padrão novo)
         ├── Contexto de objetivo (se desvio significativo)
         └── Contexto de fase (se marco ou transição)
         │
         ▼
┌──────────────────┐
│ Disparar         │
│ reavaliação de   │──── Se limiar atingido
│ inteligência     │
└──────────────────┘
```

**Princípio:** Nem todo evento dispara inteligência. Eventos triviais (copo d'água #7) atualizam contexto diário mas não disparam recomendação.

**Limiares de reavaliação:**
- Desvio de plano significativo
- Anomalia detectada
- Marco atingido
- Padrão emergente confirmado
- Fim de janela temporal (check-in semanal)

---

## 4.4 Como camadas influenciam recomendações

```
Recomendação: "Considere deload parcial"

Evidências por camada:
  Contexto imediato:    RPE 9, mood baixo
  Contexto diário:      Treino pesado após noite ruim
  Contexto semanal:     Performance -10%, sono médio 6h
  Contexto mensal:      Volume +15% sem deload
  Contexto histórico:   Responde bem a deloads de 5 dias
  Contexto de objetivo: Hipertrofia — recuperação é prioridade
  Contexto de fase:     Semana 8/8 de accumulation — deload programado

Ponderação:
  Camadas recentes pesam mais para urgência
  Camadas históricas pesam mais para personalização
  Contexto de objetivo/fase filtra o que é relevante
```

---

# 5. Intelligence Loop

## 5.1 O ciclo principal

Inteligência não é um chatbot. É um **ciclo contínuo de raciocínio** que transforma observação em adaptação.

```
    ┌─────────────────────────────────────────────────────────────┐
    │                                                             │
    │    OBSERVAR ──► REGISTRAR ──► INTERPRETAR ──► CORRELACIONAR│
    │        ▲                                           │        │
    │        │                                           ▼        │
    │    ADAPTAR ◄── APRENDER ◄── RECOMENDAR ◄── EXPLICAR      │
    │                                                             │
    └─────────────────────────────────────────────────────────────┘
```

Cada etapa tem inputs definidos, outputs definidos, e informação que persiste.

---

## 5.2 OBSERVAR

**O que faz:** Captura tudo que pode ser conhecido sobre o usuário neste momento.

**Inputs:**
- Eventos recentes (stream)
- Contexto em todas as camadas
- Estado do plano atual
- Objetivo e fase ativos

**Outputs:**
- Conjunto de observações priorizadas por relevância

**O que persiste:** Nada — observação é efêmera, reconstruída a cada ciclo

**Exemplo:**
```
Observações (2026-07-25 15:00):
  [ALTA] Sono 5h48m — terceira noite consecutiva <6h
  [ALTA] Treino upper completado — RPE 8, performance -12%
  [MÉDIA] Proteína 85/160g até agora
  [MÉDIA] Mood reportado: "cansado"
  [BAIXA] 2.1L água consumidos
  [INFO] Semana 6 de accumulation — 2 treinos restantes
```

---

## 5.3 REGISTRAR

**O que faz:** Garante que observações significativas viram eventos duráveis.

**Inputs:**
- Observações do usuário (input manual, wearable, importação)
- Observações inferidas pelo sistema (omissões, padrões)

**Outputs:**
- Eventos append-only na timeline

**O que persiste:** Eventos — permanentemente

**Exemplo:**
```
Usuário reporta mood "cansado"
  → Evento: mood.reported { value: 2, timestamp: ... }

Sistema detecta treino não feito após 24h do plano
  → Evento: training.session.missed { planned: "legs", reason: "unknown" }

Wearable sincroniza HRV
  → Evento: integration.garmin.hrv.imported { value: 42, ... }
```

---

## 5.4 INTERPRETAR

**O que faz:** Atribui significado às observações, filtradas por objetivo e fase.

**Inputs:**
- Eventos recentes
- Contexto (todas as camadas)
- Regras de interpretação por objetivo/fase

**Outputs:**
- Estados interpretados
- Flags de alerta
- Classificações (normal, desvio, anomalia, marco)

**O que persiste:** Atualização das camadas de contexto

**Exemplo:**
```
Eventos: sono 5h48m + RPE 8 + performance -12% + mood cansado

Interpretação:
  Estado geral: RECUPERAÇÃO COMPROMETIDA
  Classificação: Desvio significativo do esperado
  Alerta: Risco de overreaching se mantido
  Marco: Não
  Normal para fase: Não — accumulation requer recuperação adequada
```

---

## 5.5 CORRELACIONAR

**O que faz:** Conecta interpretações atuais com padrões históricos.

**Inputs:**
- Interpretação atual
- Contexto histórico
- Insights existentes
- Biblioteca de correlações conhecidas (sono→performance, proteína→recuperação)

**Outputs:**
- Correlações confirmadas, refutadas ou novas
- Insights candidatos

**O que persiste:** Insights (se significativos e confiáveis)

**Exemplo:**
```
Interpretação atual: sono ruim → performance baixa

Correlação histórica (Lucas):
  12 ocorrências de sono <6h
  10 seguidas de performance -8% a -15%
  Confiança: 0.83

Insight candidato:
  "Sono <6h prediz queda de performance de ~10% para Lucas"
  Confiança: 0.83
  Amostra: 12 ocorrências
  → Promovido a Insight permanente
```

---

## 5.6 EXPLICAR

**O que faz:** Traduz correlações e interpretações em linguagem humana compreensível.

**Inputs:**
- Insights
- Interpretações
- Contexto de objetivo/fase

**Outputs:**
- Explicações estruturadas (razão, evidência, confiança, limitações)

**O que persiste:** Explicações vinculadas a recomendações (audit trail)

**Exemplo:**
```
Explicação:
  "Suas últimas 3 noites tiveram menos de 6 horas de sono.
   Nas últimas 12 vezes que isso aconteceu, sua performance
   no treino caiu em média 10% no dia seguinte.
   Hoje você reportou RPE 8 com queda de 12% — consistente
   com esse padrão.

   Confiança: alta (83%, baseado em 12 ocorrências)
   Limitação: não consideramos outros fatores (estresse, alimentação)"
```

---

## 5.7 RECOMENDAR

**O que faz:** Propõe ações concretas baseadas em explicações.

**Inputs:**
- Explicações
- Plano atual
- Restrições do usuário
- Guardrails de segurança

**Outputs:**
- Recomendações estruturadas (ação, razão, alternativas, confiança, horizonte)

**O que persiste:** Recomendações apresentadas + eventos de resposta

**Exemplo:**
```
Recomendação primária:
  Ação: Reduzir volume em 40% nos próximos 3 treinos
  Razão: Recuperação comprometida + padrão histórico confirmado
  Confiança: 0.78
  Alternativas:
    A) Manter volume, reduzir intensidade (RPE máx 6)
    B) Substituir 1 treino por sessão de mobilidade
    C) Iniciar deload formal de 5 dias
  Horizonte: 3–5 dias
  Reversível: sim
  Requer confirmação: sim (mudança significativa)
```

---

## 5.8 APRENDER

**O que faz:** Incorpora feedback do usuário e outcomes para refinar modelos.

**Inputs:**
- Decisões do usuário (aceitar, rejeitar, modificar recomendações)
- Outcomes observados após recomendações
- Novos eventos pós-decisão

**Outputs:**
- Pesos ajustados por usuário
- Preferências inferidas
- Confiança recalibrada

**O que persiste:** Modelo de preferências do usuário, histórico de eficácia de recomendações

**Exemplo:**
```
Recomendação: deload de 5 dias
Decisão: Lucas rejeitou — preferiu reduzir intensidade
Outcome (5 dias depois): Performance recuperou, volume mantido

Aprendizado:
  Lucas prefere manter volume e reduzir intensidade vs. deload formal
  Pesos atualizados: deload_formal -0.2, reduce_intensity +0.3
  Confiança da preferência: 0.65 (1 ocorrência — aguardar confirmação)
```

---

## 5.9 ADAPTAR

**O que faz:** Aplica aprendizado e decisões ao plano futuro.

**Inputs:**
- Decisões confirmadas
- Aprendizado acumulado
- Contexto atualizado

**Outputs:**
- Plano recalculado
- Possível transição de fase
- Novos eventos de sistema (plan.adjusted, phase.started)

**O que persiste:** Novo plano, eventos de adaptação

**Exemplo:**
```
Decisão: Lucas escolheu alternativa A (manter volume, RPE máx 6)

Adaptação:
  Plano treino (próximos 3 dias):
    - Volume mantido
    - Intensidade cap: RPE 6
    - Descanso entre séries +30s
  Plano nutrição:
    - Priorizar carboidratos pré-treino
    - Manter proteína elevada
  Hábitos:
    - Priorizar hábito "dormir antes 23h"

  Evento: plan.adjusted { reason: "recovery_priority", ... }
```

---

## 5.10 Loop completo — dados e persistência

```
Etapa          │ Entrada                    │ Saída                     │ Persiste
───────────────┼────────────────────────────┼───────────────────────────┼──────────────────
Observar       │ Eventos, contexto, plano   │ Observações priorizadas   │ Nada
Registrar      │ Inputs do usuário/sistema  │ Eventos                   │ Eventos (forever)
Interpretar    │ Eventos, contexto          │ Estados interpretados     │ Contexto (derivado)
Correlacionar  │ Interpretação, histórico   │ Insights candidatos       │ Insights (se válidos)
Explicar       │ Insights, contexto         │ Explicações               │ Audit trail
Recomendar     │ Explicações, plano         │ Recomendações             │ Recomendações + eventos
Aprender       │ Decisões, outcomes         │ Preferências ajustadas    │ Modelo do usuário
Adaptar        │ Decisões, aprendizado      │ Plano recalculado         │ Plano + eventos sistema
```

---

# 6. Timeline da Evolução

## 6.1 A Timeline como eixo central

Toda a vida do usuário no produto é uma **Timeline contínua e imutável** — uma sequência ordenada de eventos, decisões, transições de fase e marcos.

```
Timeline de Lucas (simplificada):

2026-01-15  objective.started { goal: "hipertrofia" }
2026-01-15  phase.started { phase: "adaptação", duration: 3w }
2026-01-16  training.session.completed { ... }
2026-01-16  nutrition.meal.logged { ... }
    ...
2026-02-05  phase.completed { phase: "adaptação" }
2026-02-05  phase.started { phase: "accumulation", duration: 6w }
    ...
2026-03-20  body.weight.recorded { value: 78.5kg }
2026-03-22  insight.discovered { "Lucas responde bem a volume alto" }
    ...
2026-04-01  environment.gym.changed { from: "SmartFit", to: "Academia do prédio" }
2026-04-02  plan.adjusted { reason: "equipment_change" }
    ...
2026-04-15  health.injury.reported { area: "ombro", severity: "leve" }
2026-04-15  phase.started { phase: "recuperação", duration: "indefinido" }
    ...
2026-05-01  health.recovery.declared { area: "ombro" }
2026-05-01  phase.started { phase: "reintrodução", duration: 3w }
    ...
2026-06-01  objective.changed { from: "hipertrofia", to: "cutting" }
2026-06-01  phase.started { phase: "cutting", duration: 12w }
    ...
2026-07-25  training.session.completed { ... }  ← HOJE
```

A Timeline **nunca é editada**. Eventos podem ser corrigidos por novos eventos (`event.corrected`), nunca apagados.

---

## 6.2 Tipos de marcos na Timeline

### Marcos de intenção
```
objective.started / objective.changed / objective.completed
phase.started / phase.completed
plan.generated / plan.adjusted
```

### Marcos de vida
```
environment.gym.changed
environment.travel.started / ended
health.injury.reported / illness.reported
health.recovery.declared
body.weight.recorded (quando significativo)
```

### Marcos de performance
```
training.pr.recorded { exercise: "supino", value: 100kg }
insight.discovered
progress.milestone.reached
```

### Marcos de comportamento
```
habit.streak.reached { habit: "sono", days: 30 }
recommendation.accepted / rejected (padrões de preferência)
app.returned { after_days: 21 }  — retorno após ausência
```

---

## 6.3 Como marcos alteram comportamento da IA

Cada tipo de marco **reconfigura** parâmetros do sistema:

```
┌─────────────────────────────────────────────────────────────────┐
│ MARCO                        │ EFEITO NO SISTEMA                │
├──────────────────────────────┼──────────────────────────────────┤
│ objective.changed            │ Recalcula todas as lentes        │
│                              │ Reseta contexto de objetivo    │
│                              │ Gera novo plano de fase          │
├──────────────────────────────┼──────────────────────────────────┤
│ phase.started (bulking)      │ Ajusta metas calóricas (+300kcal)│
│                              │ Prioriza progressão de carga   │
│                              │ Peso subindo = positivo          │
├──────────────────────────────┼──────────────────────────────────┤
│ phase.started (cutting)      │ Ajusta déficit (-400kcal)        │
│                              │ Preserva treino de força         │
│                              │ Peso caindo = positivo           │
├──────────────────────────────┼──────────────────────────────────┤
│ phase.started (deload)       │ Reduz volume/intensidade         │
│                              │ Performance baixa = esperado     │
│                              │ Não gera alertas de regressão    │
├──────────────────────────────┼──────────────────────────────────┤
│ environment.gym.changed      │ Recalcula exercícios disponíveis │
│                              │ Sugere substituições             │
│                              │ Período de adaptação equipamento   │
├──────────────────────────────┼──────────────────────────────────┤
│ health.injury.reported       │ Restrições de movimento          │
│                              │ Progressão conservadora          │
│                              │ Nutrição favorece recuperação    │
├──────────────────────────────┼──────────────────────────────────┤
│ environment.travel.started   │ Modo flexível ativado            │
│                              │ Treinos adaptados (hotel, tempo) │
│                              │ Nutrição por estimativa          │
├──────────────────────────────┼──────────────────────────────────┤
│ training.pr.recorded         │ Atualiza baselines               │
│                              │ Insight de progresso             │
│                              │ Possível progressão de carga     │
├──────────────────────────────┼──────────────────────────────────┤
│ app.returned (após ausência) │ Modo reintrodução                │
│                              │ Sem guilt, foco em retomada      │
│                              │ Plano simplificado               │
└──────────────────────────────┴──────────────────────────────────┘
```

---

## 6.4 Timeline e memória do sistema

A Timeline é a **memória autobiográfica** do usuário dentro do produto.

```
Pergunta: "Por que o sistema recomenda deload agora?"

Resposta rastreável:
  Evento 2026-07-23: sleep.completed { 5h12m }
  Evento 2026-07-24: sleep.completed { 5h45m }
  Evento 2026-07-25: sleep.completed { 5h48m }
  Evento 2026-07-25: training.session { RPE: 8, perf: -12% }
  Insight 2026-06-10: "Sono <6h → performance -10%" (conf: 0.83)
  Fase atual: accumulation semana 8/8
  Fase anterior: deload há 8 semanas
  
  → Recomendação: deload parcial
  → Explicação completa disponível
```

---

# 7. Adaptive System

## 7.1 Princípios de adaptação

1. **Adaptação é reação a desvio, não a perfeição** — o sistema ajusta quando realidade ≠ plano
2. **Adaptação é graduada** — micro-ajustes antes de macro-mudanças
3. **Adaptação é explicada** — usuário entende por que algo mudou
4. **Adaptação respeita autonomia** — mudanças significativas requerem confirmação
5. **Adaptação é reversível** — rollback possível quando usuário discorda

```
Nível de adaptação:

  Nível 1 (automático, silencioso):
    Ajuste de carga ±2.5kg baseado em RPE

  Nível 2 (automático, informado):
    Remarcar treino não feito para dia disponível

  Nível 3 (proposto, requer confirmação):
    Iniciar deload parcial

  Nível 4 (proposto, requer confirmação):
    Transição de fase ou objetivo

  Nível 5 (proposto, requer confirmação + reflexão):
    Pausa prolongada, mudança de estratégia major
```

---

## 7.2 Cenários de adaptação

### Usuário para de treinar

```
Gatilho: 0 treinos em 7 dias (quando plano previa 3+)

Contexto derivado:
  Aderência: crítica
  Causa: desconhecida (não houve injury/illness/travel)

Adaptação graduada:
  Dia 1-3 sem treino:
    → Nenhuma ação agressiva
    → Notificação suave: "Seu treino de ontem ainda está disponível"

  Dia 4-7 sem treino:
    → Plano pausado (não acumula "pendências")
    → Recomendação: "Retomar com sessão reduzida?"
    → Modo: reintrodução

  Dia 8-14 sem treino:
    → Fase suspensa
    → Check-in empático (não punitivo)
    → Plano simplificado: 2 treinos/semana, 30min

  Dia 15+ sem treino:
    → Evento: app.inactive { days: 15 }
    → Retorno: onboarding parcial — "O que mudou?"
    → Plano reconstruído do zero com histórico preservado

Nunca:
  ✗ Perder streak com shame
  ✗ Acumular treinos "atrasados"
  ✗ Assumir abandono permanente
```

---

### Usuário muda de objetivo

```
Gatilho: objective.changed { from: "hipertrofia", to: "cutting" }

Adaptação:
  1. Contexto de objetivo recalculado imediatamente
  2. Fase atual encerrada (evento: phase.completed)
  3. Nova fase iniciada (evento: phase.started { cutting })
  4. Planos de treino: mantém força, reduz volume opcional
  5. Planos de nutrição: déficit calculado (~400kcal)
  6. Interpretação de peso invertida: queda = positivo
  7. Insights anteriores preservados mas re-filtrados
  8. Timeline: marco visível de transição

  Recomendação:
    "Transição gradual de 1-2 semanas recomendada
     para ajuste metabólico. Confirma?"
```

---

### Usuário ganha peso

```
Contexto: body.weight.recorded { +1.2kg em 14 dias }

Adaptação depende de objetivo + fase:

  Objetivo = Bulking, Fase = accumulation:
    → Interpretação: POSITIVO (se dentro de 0.5-1kg/semana)
    → Ação: nenhuma, reforço positivo
    → Insight: "Ritmo de ganho adequado"

  Objetivo = Bulking, Fase = accumulation:
    → Interpretação: ALERTA (se >1.5kg/semana)
    → Ação: recomendar reduzir superávit
    → Recomendação: "Ganho acelerado — ajustar +200kcal?"

  Objetivo = Cutting, Fase = cutting:
    → Interpretação: ALERTA (ganho durante cutting)
    → Ação: revisar aderência nutricional
    → Recomendação: "Peso subiu — revisar registros ou ajustar déficit?"

  Objetivo = Manutenção:
    → Interpretação: NEUTRO (se dentro de ±1kg)
    → Ação: monitorar tendência
```

---

### Usuário perde peso

```
Espelho lógico de "ganha peso" — interpretação invertida por objetivo.

  Cutting: positivo (se ritmo saudável 0.5-1kg/semana)
  Bulking: alerta (déficit involuntário)
  Manutenção: neutro ou alerta se >1kg
```

---

### Usuário dorme mal

```
Gatilho: sleep.completed { duration < 6h } × 2+ noites consecutivas

Adaptação imediata (Nível 1-2):
  → Treino do dia: reduzir intensidade sugerida (RPE cap)
  → Nutrição: priorizar refeições fáceis, manter proteína
  → Hábitos: sugerir cafeína moderada, evitar treino tarde

Adaptação curto prazo (Nível 3, após 3 noites):
  → Recomendação: reduzir volume 20-30% por 3-5 dias
  → Insight reforçado: correlação sono-performance

Adaptação médio prazo (Nível 4, após 7+ noites):
  → Recomendação: deload ou pausa ativa
  → Hábito prioritário: sono (max 1-2 outros hábitos ativos)
  → Questionar: "O que está atrapalhando seu sono?"
```

---

### Usuário melhora muito

```
Gatilho: performance +15% em 2 semanas OU PR em 3+ exercícios

Adaptação:
  → Insight: "Progressão acelerada detectada"
  → Verificar: sono, nutrição, consistência — o que mudou?
  → Recomendação: considerar progressão de carga/volume
  → Alerta: progressão rápida pode preceder platô ou lesão
  → Sugestão: consolidar ganhos antes de empurrar mais

  Se em deload ou recuperação:
    → Não progredir — performance alta é esperada pós-descanso
```

---

### Usuário fica doente

```
Gatilho: health.illness.reported { type: "gripe", severity: "moderada" }

Adaptação imediata:
  → Treino: pausado (evento: plan.suspended { reason: "illness" })
  → Nutrição: foco em hidratação, proteína mantida se possível
  → Hábitos: apenas essenciais (sono, água)
  → Notificações: reduzidas

Adaptação recuperação:
  → Aguardar: health.recovery.declared (usuário declara)
  → Fase: reintrodução (2-3 semanas)
  → Volume: 50% → 70% → 100% gradual
  → Nenhuma pressão por retorno rápido

  Guardrail: nunca recomendar treino intenso durante doença
```

---

### Usuário viaja

```
Gatilho: environment.travel.started { duration: 5 days, destination: "SP" }

Adaptação:
  → Modo viagem ativado
  → Treinos: versões hotel/bodyweight/30min
  → Equipamentos: inferidos como limitados
  → Nutrição: estimativas, não precisão
  → Aderência: expectativa reduzida (50% = sucesso)
  → Notificações: mínimas

Retorno:
  → environment.travel.ended
  → 1-2 treinos de "retomada" antes de volume normal
  → Sem acumular "treinos perdidos"
```

---

### Usuário fica semanas sem abrir o app

```
Gatilho: app.inactive { days: 21 }

Adaptação:
  → Nenhuma notificação agressiva acumulada
  → Eventos de omissão registrados silenciosamente
  → Plano congelado (não gera "atrasos")

Retorno (app.returned):
  → Evento: app.returned { after_days: 21 }
  → UX: "Bem-vindo de volta. O que aconteceu?"
  → Opções: pausa intencional / vida ocupada / desmotivado / outro
  → Plano: reconstruído baseado em resposta + histórico
  → Fase: reintrodução independente de onde parou
  → Histórico: 100% preservado — nada apagado

  Filosofia: retorno é celebrado, não punido
```

---

### Usuário troca de academia

```
Gatilho: environment.gym.changed { new_equipment: [...] }

Adaptação:
  → Inventário de equipamentos atualizado
  → Exercícios indisponíveis: substituições automáticas
  → Período de adaptação: 1-2 semanas
  → Cargas: conservadoras (novos equipamentos calibrados)
  → Insight futuro: "Lucas treina melhor com barra livre vs. máquina"
```

---

## 7.3 Matriz de adaptação

```
                    Leve         Moderada      Significativa    Major
                    (auto)       (informa)     (confirma)       (confirma+)
─────────────────────────────────────────────────────────────────────────
Carga ±2.5kg        ✓
Remarcar treino                  ✓
Reduzir volume 20%               ✓
Deload parcial                                 ✓
Mudança de fase                                ✓
Mudança de objetivo                                          ✓
Pausa prolongada                                               ✓
Reset de plano                                                 ✓
```

---

# 8. Knowledge Graph

## 8.1 O grafo de conhecimento

Todas as informações do usuário formam um **grafo conectado** — não tabelas isoladas, mas entidades relacionadas que geram valor cruzado.

```
                         ┌─────────────┐
                         │   USUÁRIO   │
                         └──────┬──────┘
                                │
            ┌───────────────────┼───────────────────┐
            │                   │                   │
            ▼                   ▼                   ▼
     ┌────────────┐      ┌────────────┐      ┌────────────┐
     │  OBJETIVO  │      │    FASE    │      │ PREFERÊNCIA│
     └─────┬──────┘      └─────┬──────┘      └─────┬──────┘
           │                   │                   │
           └───────────────────┼───────────────────┘
                               │
                               ▼
                        ┌────────────┐
                        │   EVENTO   │◄─────────────────┐
                        └─────┬──────┘                   │
                              │                            │
              ┌───────────────┼───────────────┐            │
              ▼               ▼               ▼            │
       ┌────────────┐  ┌────────────┐  ┌────────────┐     │
       │   TREINO   │  │  NUTRIÇÃO  │  │   HÁBITO   │     │
       └─────┬──────┘  └─────┬──────┘  └─────┬──────┘     │
             │               │               │            │
             └───────────────┼───────────────┘            │
                             │                            │
                             ▼                            │
                      ┌────────────┐                      │
                      │  CONTEXTO  │──────────────────────┘
                      └─────┬──────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
       ┌────────────┐ ┌────────────┐ ┌────────────┐
       │  INSIGHT   │ │CORRELAÇÃO  │ │   PADRÃO   │
       └─────┬──────┘ └─────┬──────┘ └─────┬──────┘
             │              │              │
             └──────────────┼──────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ RECOMENDAÇÃO  │
                    └───────────────┘
```

---

## 8.2 Exemplo: uma refeição no grafo

```
Evento: nutrition.meal.logged
  { meal: "almoço", protein: 55g, carbs: 80g, fat: 20g, calories: 720 }

Conexões geradas:

  nutrition.meal.logged
       │
       ├──► [CONTEXTO DIÁRIO] Proteína acumulada: 110/160g
       │
       ├──► [CONTEXTO DE FASE] Aderência nutricional: 85% (7d)
       │
       ├──► [CORRELAÇÃO] Refeições >40g proteína → performance +8%
       │         └── Insight reforçado (confiança: 0.71)
       │
       ├──► [TREINO PLANEJADO] Treino de pernas em 2h
       │         └── Recomendação: carbs pré-treino adequados ✓
       │
       ├──► [HÁBITO] Meal prep completado hoje ✓
       │
       ├──► [PROGRESSO] Média proteica 7d: 152g (meta: 160g)
       │
       ├──► [OBJETIVO: Hipertrofia] Ingestão alinhada ✓
       │
       └──► [PADRÃO HISTÓRICO] Almoços com 50g+ proteína
                 correlacionam com recovery score +12%

Valor futuro:
  - Próxima recomendação nutricional considera este padrão
  - Insight de correlação proteína-recuperação fortalecido
  - Contexto de aderência atualizado
  - Se performance boa pós-treino: correlação confirmada
  - Se performance ruim: investigar outros fatores
```

---

## 8.3 Princípio: nenhum dado morto

```
                    DADO REGISTRADO
                          │
                          ▼
              ┌───────────────────────┐
              │  Existe conexão no    │
              │  grafo?               │
              └───────────┬───────────┘
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
         SIM                          NÃO
            │                           │
            ▼                           ▼
    Gera valor imediato          Armazenado com
    + fortalece grafo            potencial de conexão
            │                           │
            └─────────────┬─────────────┘
                          ▼
              Evento futuro pode
              ativar conexão retroativa
                          │
                          ▼
              Insight emergente:
              "Padrão detectado usando
               dados de 3 meses atrás"
```

**Exemplo de conexão retroativa:**

```
Mês 1: Usuário registra mood "estressado" 8 vezes
Mês 2: Usuário registra mood "estressado" 6 vezes
Mês 3: Performance estagnada

Sistema conecta retroativamente:
  → Insight: "Períodos de mood estressado precedem
              estagnação de performance em 2-3 semanas"
  → Usa dados de 3 meses atrás
  → Dados nunca estavam "mortos" — aguardavam contexto
```

---

## 8.4 Tipos de relações no grafo

| Relação | Exemplo |
|---------|---------|
| **causa** | sono_ruim → performance_baixa |
| **correlaciona** | proteína_alta ↔ recovery_alta |
| **precede** | deload → performance_alta |
| **contradiz** | cutting + peso_subindo |
| **reforça** | aderência_alta → progresso |
| **substitui** | exercício_A → exercício_B (equipamento) |
| **depende** | treino_pesado → sono_adequado |
| **pertence** | evento → fase → objetivo |

---

## 8.5 Densidade do grafo ao longo do tempo

```
Densidade de conexões

    ▲
    │                              ╭────────────
    │                         ╭────╯
    │                    ╭────╯
    │               ╭────╯
    │          ╭────╯
    │     ╭────╯
    │ ╭───╯
    └─┴──────────────────────────────────────────► Tempo
      1w   1m    3m    6m    1y

Semana 1:   Poucas conexões — recomendações baseadas em regras gerais
Mês 1:      Padrões emergem — correlações preliminares
Mês 3:      Grafo denso — personalização real
Mês 6+:     Alta confiança — predições confiáveis
```

---

# 9. Future Scalability

## 9.1 Princípio de extensibilidade

A arquitetura conceitual foi desenhada para que **novas fontes, atores e capacidades** se conectem via Eventos e relações no Grafo — sem reestruturar o núcleo.

```
                    ARQUITETURA ATUAL (core)
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
    ┌─────────┐      ┌─────────┐      ┌─────────┐
    │ Eventos │      │ Contexto│      │  Grafo  │
    │ (bus)   │      │ (engine)│      │(conhec.)│
    └────┬────┘      └────┬────┘      └────┬────┘
         │                │                │
         └────────────────┼────────────────┘
                          │
    ┌─────────────────────┼─────────────────────┐
    │                     │                     │
    ▼                     ▼                     ▼
 Wearables            Laboratório          Profissionais
 Apple Health         Exames               Personal/Nutri
 Google Fit           Genética             Prescrições
 Garmin               Biomarcadores        Acompanhamento
 Whoop                                     
 Oura                                       
    │                     │                     │
    ▼                     ▼                     ▼
 Marketplace          Comunidade           Dispositivos
 Suplementos          Desafios             Balança inteligente
 Equipamentos         Grupos               Bike conectada
 Serviços             Accountability       Espelho/forma
```

**Regra:** Toda extensão emite Eventos. Toda extensão consome Contexto. Nenhuma extensão acessa domínios de ação diretamente.

---

## 9.2 Integração de wearables

### Apple Health / Google Fit / Garmin / Whoop / Oura

```
Integração futura:

  Dispositivo                    Sistema
  ───────────                    ───────
  Sono (duration, stages)   ──►  sleep.completed
  HRV                       ──►  integration.*.hrv.imported
  Recovery score            ──►  integration.*.recovery.imported
  Passos                    ──►  habit.steps.imported
  Calorias ativas           ──►  context.activity.updated
  FC repouso                ──►  context.cardio.updated

  Fluxo:
    1. Dispositivo emite dados
    2. Adaptador traduz para Eventos canonicais
    3. Eventos entram na Timeline
    4. Context Engine recalcula
    5. Inteligência correlaciona com dados existentes
    6. Insights enriquecidos ("HRV caiu → sono ruim confirmado")
```

**Por que não reconstruir:**
- Eventos são a interface universal
- Adaptadores são plugáveis
- Context Engine não sabe (nem precisa saber) a fonte
- Correlações existentes se fortalecem automaticamente

---

## 9.3 Exames laboratoriais e genética

```
Integração futura:

  Dado laboratorial              Evento canonico
  ─────────────────              ───────────────
  Hemograma                      lab.result.imported
  Vitamina D                     lab.marker.recorded { marker: "vitd", value: 28 }
  Testosterona                   lab.marker.recorded { marker: "testo", value: 450 }
  Glicemia                       lab.marker.recorded { marker: "glucose", value: 92 }

  Genética                       genetic.trait.imported
                                 { trait: "caffeine_metabolism", value: "slow" }

  Impacto no grafo:
    Vitamina D baixa ──► correlaciona com ──► mood baixo, recovery lenta
    Genética cafeína ──► personaliza ──► recomendação de timing de café
    Testosterona ──► contexto de ──► capacidade de recuperação/volume
```

**Guardrails:**
- Dados sensíveis — consentimento explícito
- Nunca diagnosticar — apenas contextualizar
- Profissional pode interpretar — sistema sugere, não prescreve

---

## 9.4 Marketplace e profissionais

```
Marketplace:
  Evento: marketplace.purchase { product: "whey", ... }
  Conexão: suplemento ──► nutrição ──► objetivo
  Valor: correlacionar suplementação com outcomes

Profissionais:
  Evento: professional.prescription.received
          { from: "nutricionista", type: "macro_adjustment", ... }
  
  Fluxo:
    Profissional ──► Prescrição ──► Evento ──► Plano ajustado
    Usuário executa ──► Eventos ──► Profissional vê progresso
  
  O profissional opera SOBRE o grafo — não cria sistema paralelo
```

---

## 9.5 Comunidade

```
Comunidade:
  Evento: community.challenge.joined { challenge: "30d consistency" }
  Evento: community.post.shared { type: "milestone", ... }

  Conexão:
    Desafio ──► hábito reforçado ──► aderência
    Marco compartilhado ──► progresso ──► motivação

  Privacidade:
    Compartilhamento é opt-in
    Dados de saúde nunca compartilhados automaticamente
    Benchmarks sempre anonimizados
```

---

## 9.6 Dispositivos inteligentes

```
Balança inteligente:
  → body.weight.recorded + body.composition.recorded
  → Enriquece contexto de composição corporal

Bike/esteira conectada:
  → cardio.session.completed (automático)
  → Dados de FC, calorias, distância

Espelho de forma (futuro):
  → form.check.recorded
  → Correlaciona com injury prevention
```

---

## 9.7 Padrão de extensão

Qualquer integração futura segue este contrato:

```
┌─────────────────────────────────────────────────────────────┐
│                  CONTRATO DE EXTENSÃO                        │
├─────────────────────────────────────────────────────────────┤
│ 1. Emite Eventos canonicos (ou mapeia para existentes)      │
│ 2. Declara confiança dos dados importados                   │
│ 3. Não escreve em Contexto diretamente                      │
│ 4. Não acessa Plano ou Inteligência                         │
│ 5. Consome Contexto apenas se necessário (ex: profissional)│
│ 6. Respeita consentimento e privacidade do usuário          │
└─────────────────────────────────────────────────────────────┘
```

---

# 10. Diagramas Conceituais

## 10.1 Fluxo completo do sistema

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           MUNDO DO USUÁRIO                               │
│  (treina, come, dorme, pesa, vive)                                      │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         CAMADA DE CAPTURA                                │
│  Input manual │ Wearables │ Importações │ Profissionais │ Sistema       │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         TIMELINE DE EVENTOS                            │
│                    (append-only, imutável)                             │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
         ┌──────────┐    ┌──────────┐    ┌──────────┐
         │ Context  │    │ Progress │    │ Knowledge│
         │ Engine   │    │ Tracker  │    │ Graph    │
         └────┬─────┘    └────┬─────┘    └────┬─────┘
              │               │               │
              └───────────────┼───────────────┘
                              ▼
                    ┌──────────────────┐
                    │   INTELIGÊNCIA   │
                    │                  │
                    │ Observe→Interpret│
                    │ →Correlate→Explain│
                    │ →Recommend→Learn │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
       ┌──────────┐   ┌──────────┐   ┌──────────┐
       │ Insights │   │  Planos  │   │ Decisões │
       └──────────┘   └────┬─────┘   └────┬─────┘
                           │              │
                           └──────┬───────┘
                                  ▼
                    ┌──────────────────────────┐
                    │   DOMÍNIOS DE AÇÃO       │
                    │  Treino │ Nutri │ Hábitos │
                    └──────────────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │      USUÁRIO             │
                    │  (executa, decide, vive) │
                    └──────────────────────────┘
                                  │
                                  └──────► (novo ciclo)
```

---

## 10.2 Fluxo da IA

```
                    ┌─────────────────┐
                    │  EVENTOS NOVOS  │
                    │  + CONTEXTO     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    OBSERVAR     │
                    │ Priorizar por   │
                    │ relevância     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   INTERPRETAR   │
                    │ Significado     │
                    │ situado         │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  CORRELACIONAR  │◄──── Knowledge Graph
                    │ Com histórico   │       Insights existentes
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    EXPLICAR     │
                    │ Linguagem humana│
                    │ + confiança     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  RECOMENDAR     │◄──── Guardrails
                    │ Ação + alternat.│       Objetivo/Fase
                    └────────┬────────┘       Preferências
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
         Aceita         Rejeita         Modifica
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                    ┌─────────────────┐
                    │    APRENDER     │
                    │ Ajustar pesos   │
                    │ Preferências    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    ADAPTAR      │
                    │ Plano recalc.   │
                    │ Fase transit.   │
                    └─────────────────┘
```

---

## 10.3 Fluxo de eventos

```
FONTE                    EVENTO CANONICO              CONSUMIDORES
─────                    ───────────────              ────────────

Usuário treina     ──►   training.session.completed ──► Context Engine
                                                         Progress Tracker
                                                         Knowledge Graph

Wearable sincro    ──►   sleep.completed           ──► Context Engine
                                                         Intelligence (se limiar)

Usuário pesa       ──►   body.weight.recorded      ──► Context Engine
                                                         Progress Tracker
                                                         Intelligence (se anomalia)

Sistema detecta    ──►   training.session.missed   ──► Context Engine
omissão                                                  Plan Adapter
                                                         Intelligence

Usuário aceita     ──►   recommendation.accepted   ──► Learning Engine
recomendação                                             Plan Adapter
                                                         Timeline

Profissional       ──►   professional.prescription ──► Plan Adapter
prescreve                                                Timeline
```

---

## 10.4 Fluxo de contexto

```
EVENTOS
   │
   ▼
┌──────────────────────────────────────────────────────────┐
│                   CONTEXT ENGINE                          │
│                                                          │
│   ┌─────────────────────────────────────────────────┐   │
│   │              Agregação temporal                  │   │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐│   │
│   │  │Imediato │ │ Diário  │ │ Semanal │ │ Mensal ││   │
│   │  └────┬────┘ └────┬────┘ └────┬────┘ └───┬────┘│   │
│   └───────┼───────────┼───────────┼──────────┼─────┘   │
│           └───────────┴───────────┴──────────┘         │
│                           │                             │
│   ┌───────────────────────┴───────────────────────┐   │
│   │         Filtro: Objetivo + Fase               │   │
│   └───────────────────────┬───────────────────────┘   │
│                           │                             │
│   ┌───────────────────────┴───────────────────────┐   │
│   │         Enriquecimento: Histórico              │   │
│   └───────────────────────┬───────────────────────┘   │
└───────────────────────────┼─────────────────────────────┘
                            │
                            ▼
                    CONTEXTO DERIVADO
                            │
         ┌──────────────────┼──────────────────┐
         ▼                  ▼                  ▼
   Inteligência         Planos          Apresentação
   (decisões)           (prescrições)   (resumos)
```

---

## 10.5 Fluxo de adaptação

```
         DESVIO DETECTADO
    (plano ≠ realidade)
              │
              ▼
     ┌────────────────┐
     │  Classificar   │
     │  severidade    │
     └───────┬────────┘
             │
   ┌─────────┼─────────┐
   ▼         ▼         ▼
 Leve    Moderado   Crítico
   │         │         │
   ▼         ▼         ▼
 Auto     Informa   Propõe
 ajuste   + ajuste  + confirma
   │         │         │
   └─────────┼─────────┘
             ▼
     ┌────────────────┐
     │ Plano ajustado │
     │ Evento: plan.  │
     │ adjusted       │
     └───────┬────────┘
             │
             ▼
     ┌────────────────┐
     │ Monitorar      │
     │ outcome        │
     └───────┬────────┘
             │
             ▼
     ┌────────────────┐
     │ Aprender       │
     │ (funcionou?)   │
     └────────────────┘
```

---

## 10.6 Mapa dos domínios

```
                    ┌─────────────────┐
                    │     USUÁRIO     │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
  │  OBJETIVOS  │    │    FASES    │    │ PREFERÊNCIAS│
  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
         │                  │                  │
         └──────────────────┼──────────────────┘
                            │
                            ▼
                    ┌─────────────┐
                    │   EVENTOS   │ ◄─── Fonte de verdade
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  CONTEXTO   │ ◄─── Derivado
                    └──────┬──────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
  │   TREINO    │   │  NUTRIÇÃO   │   │   HÁBITOS   │
  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘
         │                 │                 │
         └─────────────────┼─────────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  PROGRESSO  │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │INTELIGÊNCIA │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  INSIGHTS   │
                    └─────────────┘
```

---

## 10.7 Mapa das relações

```
        USUÁRIO ──────declara──────► OBJETIVO
           │                            │
           │                            │ orienta
           │                            ▼
           │                         FASE
           │                            │
           │                            │ estrutura
           ▼                            ▼
        EVENTO ◄─────gera──────── PLANO
           │                            │
           │ alimenta                   │ prescreve
           ▼                            ▼
        CONTEXTO ────informa────► DOMÍNIOS DE AÇÃO
           │                     (Treino/Nutri/Hábitos)
           │
           │ deriva
           ▼
        INSIGHT ◄─────correlaciona──── KNOWLEDGE GRAPH
           │
           │ gera
           ▼
        RECOMENDAÇÃO
           │
           │ vira
           ▼
        DECISÃO ──────gera──────► EVENTO (novo ciclo)
```

---

# 11. Cenários Reais

## Cenário 1: Bulking com sono ruim e overreaching

### Contexto inicial
```
Usuário: Lucas, 32 anos
Objetivo: Hipertrofia
Fase: Accumulation (semana 7 de 8)
Plano: 4 treinos/semana, superávit +400kcal, 160g proteína/dia
Histórico: 7 semanas de progressão consistente
```

### Sequência de eventos

```
Segunda:
  06:00  sleep.completed { 5h30m, quality: "ruim" }
  07:00  training.session.completed { upper, RPE: 8, perf: -5% }
  Contexto imediato: fadiga elevada, treino completado apesar disso

Terça:
  06:15  sleep.completed { 5h45m }
  Contexto semanal: 2 noites <6h
  Insight reforçado: correlação sono-performance (conf: 0.80)

Quarta:
  06:00  sleep.completed { 5h15m }
  07:00  training.session.completed { lower, RPE: 9, perf: -15% }
  mood.reported { "exaustо", 2/5 }
  Contexto imediato: RECUPERAÇÃO CRÍTICA
  Contexto de fase: semana 7/8, volume acumulado máximo

  Intelligence Loop:
    Observar: 3 noites <6h, performance -15%, RPE 9, mood baixo
    Interpretar: overreaching provável
    Correlacionar: 12 ocorrências históricas de sono<6h → perf -10%
    Explicar: "Três noites curtas + queda de 15% consistente com seu padrão"
    Recomendar: Deload parcial — volume -40% por 5 dias
    Confiança: 0.81

  Decisão: Lucas aceita

Quinta-Sexta:
  plan.adjusted { deload_partial, volume: -40%, intensity_cap: RPE 6 }
  Treinos completados com RPE 5-6, performance estável

Segunda seguinte:
  sleep.completed { 7h30m, quality: "boa" }
  performance restaurada
  Insight: "Deload de 5 dias após sono ruim → recovery em 3 dias"
  Fase: deload completado, retorno a accumulation
```

### Raciocínio completo

```
CAUSA:     Sono crônico <6h (trabalho, estresse)
EFEITO:    Performance -15%, RPE elevado, mood baixo
PADRÃO:    Confirmado 12x no histórico de Lucas
FASE:      Accumulation semana 7 — volume máximo, deload programado
DECISÃO:   Deload antecipado (aceito)
OUTCOME:   Recovery em 3 dias
APRENDIZADO: Lucas responde bem a deload parcial vs. formal
             Peso deload_partial +0.3 vs. deload_formal
```

---

## Cenário 2: Cutting com platô e adaptação nutricional

### Contexto inicial
```
Usuária: Ana, 28 anos
Objetivo: Emagrecimento (cutting)
Fase: Cutting (semana 8 de 12)
Plano: Déficit -450kcal, 4 treinos/semana, 130g proteína
Progresso: -4.2kg em 7 semanas (ritmo saudável)
```

### Sequência de eventos

```
Semana 8:
  body.weight.recorded { 68.0kg }  — igual à semana 7
  body.weight.recorded { 68.1kg }  — +0.1kg
  body.weight.recorded { 68.0kg }  — estável

  Contexto semanal: peso estável por 10 dias
  Contexto mensal: -4.2kg total, ritmo desacelerando
  Contexto de fase: semana 8/12, déficit contínuo

  Intelligence Loop:
    Observar: platô de peso 10 dias, aderência 85%, treinos consistentes
    Interpretar: adaptação metabólica provável OU retenção hídrica
    Correlacionar: platôs anteriores de Ana duraram 12-14 dias
    Explicar: "Seu peso estabilizou por 10 dias. Em cutting anterior,
              isso durou 12 dias antes de retomar. Aderência está boa."
    Recomendar:
      Primária: Manter estratégia por 7 dias + refeed day
      Alternativa: Reduzir déficit em 100kcal
      Alternativa: Aumentar NEAT (passos +2000/dia)
    Confiança: 0.72

  Decisão: Ana escolhe refeed day no sábado

Sábado:
  Evento: phase.refeed.executed { calories: maintenance }
  Nutrição: carboidratos elevados, proteína mantida

Segunda (D+2):
  body.weight.recorded { 67.4kg }  — -0.6kg (efeito refeed + retomada)
  Insight: "Refeed após platô de 10d → retomada de perda em 2 dias"
  Contexto: platô quebrado
```

### Raciocínio completo

```
CAUSA:     Adaptação metabólica + possível retenção hídrica
CONTEXTO:  Aderência alta — não é falta de disciplina
HISTÓRICO: Platôs de Ana duram ~12 dias
DECISÃO:   Refeed (escolha da usuária)
OUTCOME:   Peso retomou queda em 2 dias
APRENDIZADO: Refeed efetivo para Ana após platô de 10+ dias
```

---

## Cenário 3: Retorno após lesão de ombro

### Contexto inicial
```
Usuário: Marco, 45 anos
Objetivo: Saúde geral + força
Fase: Accumulation (semana 4)
Histórico: Retornando após 6 meses parado
```

### Sequência de eventos

```
Quarta:
  training.session.completed { upper, inclui supino }
  Durante treino: desconforto ombro direito

  Evento: health.discomfort.reported { area: "ombro_d", severity: "moderado" }

  Intelligence Loop:
    Observar: desconforto durante supino, histórico de lesão ombro (2025)
    Interpretar: possível reagravamento
    Correlacionar: lesão 2025 durou 8 semanas, iniciou com desconforto similar
    Recomendar:
      Primária: Parar exercícios de ombro, consultar profissional
      Alternativa: Substituir supino por variantes sem dor
    Confiança: 0.85 (histórico de lesão)

  Decisão: Marco para exercícios de ombro

Quinta:
  Evento: health.injury.reported { area: "ombro_d", severity: "leve" }
  Evento: phase.started { phase: "recuperação", reason: "injury" }

  Adaptação:
    Plano treino: elimina supino, overhead press, lateral raise
    Substituições: leg press, remada neutra, core
    Volume: -30% geral
    Nutrição: proteína elevada (recuperação)
    Hábitos: prioriza sono

Semanas 1-3 (recuperação):
  Treinos com restricões, sem desconforto
  Eventos: habit.sleep.completed × 18 (priorizado)

Semana 4:
  Evento: health.recovery.declared { area: "ombro_d" }
  Evento: phase.started { phase: "reintrodução", duration: 3w }

  Plano reintrodução:
    Semana 1: movimentos leves de ombro, RPE máx 5
    Semana 2: supino leve, RPE máx 6
    Semana 3: progressão normal se sem dor

Semana 7:
  Supino retomado, carga 60% do PR anterior
  Insight: "Marco recupera ombro em ~6 semanas com restrição precoce"
```

### Raciocínio completo

```
GATILHO:   Desconforto durante exercício + histórico de lesão
AÇÃO:      Restrição imediata (não "treinar até a dor")
FASE:      Recuperação → Reintrodução (6 semanas total)
OUTCOME:   Retorno seguro, sem reagravamento
APRENDIZADO: Marco responde bem a restrição precoce
             Histórico de lesão pesa em recomendações futuras
```

---

## Cenário 4: Viagem de trabalho e modo flexível

### Contexto inicial
```
Usuária: Julia, 35 anos
Objetivo: Manutenção + saúde
Fase: Manutenção
Plano: 3 treinos/semana, nutrição flexível
```

### Sequência de eventos

```
Domingo:
  Evento: environment.travel.started {
    destination: "São Paulo",
    duration: 5 days,
    type: "trabalho",
    hotel: true,
    gym: "incerto"
  }

  Adaptação automática:
    Modo: viagem ativado
    Expectativa aderência: 50% = sucesso
    Treinos: versões 20-30min, bodyweight/hotel gym
    Nutrição: estimativas, foco em proteína
    Notificações: mínimas

Segunda (SP):
  training.session.completed {
    type: "hotel_gym",
    duration: 25min,
    exercises: [adaptados]
  }
  nutrition.meal.logged { estimativa, protein: ~35g }

Quarta:
  training.session.missed { reason: "reuniões" }
  Contexto: 1/2 treinos até agora — dentro da expectativa viagem

Sexta:
  Evento: environment.travel.ended

  Adaptação retorno:
    Modo: reintrodução (1 sessão)
    Plano sábado: treino normal, carga 90%
    Plano domingo+: retorno completo

  Insight: "Julia mantém 50%+ aderência em viagens — acima da média"
```

### Raciocínio completo

```
CONTEXTO:  Viagem de trabalho, 5 dias, gym incerto
ADAPTAÇÃO: Modo flexível — expectativas recalibradas
REALIDADE: 1/2 treinos = sucesso no contexto
RETORNO:   Reintrodução gradual, sem "treinos acumulados"
APRENDIZADO: Julia adere bem em viagem — expectativa futura ajustada
```

---

## Cenário 5: Abandono e retorno após 28 dias

### Contexto inicial
```
Usuário: Pedro, 29 anos
Objetivo: Hipertrofia
Fase: Accumulation (semana 3)
Último evento: 2026-06-27 (training.session.completed)
```

### Sequência de eventos

```
28 dias sem eventos do usuário (exceto app.inactive automáticos):

  Eventos de omissão registrados silenciosamente:
    training.session.missed × 9
    nutrition.day.incomplete × 28
    habit.missed × múltiplos

  Plano: congelado (não acumula pendências)
  Notificações: nenhuma agressiva enviada

Dia 28:
  Evento: app.returned { after_days: 28 }

  Intelligence Loop:
    Observar: retorno após 28 dias, histórico de 3 semanas boas antes
    Interpretar: pausa prolongada, causa desconhecida
    Correlacionar: Pedro abandonou 1x antes (2025), retornou em 14 dias
    Recomendar:
      NÃO: "Você perdeu 28 dias de progresso!"
      SIM: "Bem-vindo de volta. O que aconteceu?"
      Opções: vida ocupada / desmotivado / problemas pessoais / doença

  Decisão: Pedro seleciona "vida ocupada"

  Adaptação:
    Fase anterior: encerrada (não retomada)
    Nova fase: reintrodução (4 semanas)
    Plano:
      Semana 1: 2 treinos, 30min, full body
      Semana 2: 3 treinos, 40min
      Semana 3: 3 treinos, 50min
      Semana 4: retorno ao plano original
    Nutrição: simplificada — apenas proteína/dia
    Hábitos: 2 ativos (sono + água)

  Histórico: 100% preservado
  Insights anteriores: ativos
  Progresso anterior: visível ("Seu PR de supino continua 80kg")
```

### Raciocínio completo

```
SITUAÇÃO:  28 dias inativo
FILOSOFIA: Retorno celebrado, não punido
CAUSA:     Vida ocupada (declarada)
ADAPTAÇÃO: Reintrodução gradual, plano simplificado
PRESERVA:  Histórico, PRs, insights — nada apagado
APRENDIZADO: Pedro retorna após pausas — padrão comportamental
```

---

## Cenário 6: Mudança de objetivo mid-journey

### Contexto inicial
```
Usuária: Carla, 31 anos
Objetivo: Hipertrofia (8 semanas)
Fase: Accumulation (semana 6)
Progresso: +2.8kg, força +12%, aderência 90%
```

### Sequência de eventos

```
Carla declara:
  Evento: objective.change.requested { new: "cutting", reason: "evento em 3 meses" }

  Intelligence Loop:
    Observar: 8 semanas bulking, +2.8kg, força boa, evento em 3 meses
    Interpretar: transição viável, timing apertado
    Correlacionar: transições abruptas → perda de massa muscular
    Explicar: "Você fez progresso sólido. Para cutting de 12 semanas,
              recomendo transição gradual de 2 semanas."
    Recomendar:
      Primária: 2 semanas manutenção → 12 semanas cutting
      Alternativa: cutting imediato (maior risco muscular)
    Confiança: 0.76

  Decisão: Carla aceita transição gradual

  Evento: objective.changed { from: "hipertrofia", to: "cutting" }
  Evento: phase.started { phase: "transição", duration: 2w }
  Evento: phase.completed { phase: "accumulation" }

  Adaptação:
    Semanas 1-2 (transição):
      Calorias: manutenção (0 déficit)
      Treino: mantém volume e intensidade
      Monitora: peso estável

    Semana 3+:
      Evento: phase.started { phase: "cutting", duration: 12w }
      Calorias: -400kcal
      Treino: mantém força, volume -10%
      Interpretação peso: queda = positivo

  Timeline: marco visível de transição
  Insight: "Carla transicionou bulking→cutting com fase de manutenção"
```

### Raciocínio completo

```
MUDANÇA:   Hipertrofia → Cutting (motivada por evento)
RISCO:     Perda muscular com transição abrupta
MITIGAÇÃO: 2 semanas manutenção
OUTCOME:   Preserva ganhos, inicia cutting com base sólida
APRENDIZADO: Carla prefere transições graduais
```

---

# 12. Revisão Crítica

## 12.1 Possíveis limitações

### L1 — Cold start (primeiros 14-30 dias)
**Limitação:** Com poucos eventos, correlações são frágeis e personalização é limitada.

**Impacto:** Recomendações baseadas em regras gerais, não no usuário específico.

**Mitigação conceitual:**
- Onboarding rico captura preferências, restrições, histórico declarado
- Regras de domínio (evidence-based) guiam fase inicial
- Comunicar honestamente: "Ainda estou aprendendo seu padrão"
- Confiança explícita baixa nas recomendações iniciais

---

### L2 — Dependência de input do usuário
**Limitação:** Nem todo usuário registra consistentemente. Omissões podem distorcer contexto.

**Impacto:** Sistema pode supor aderência baixa quando é falta de registro.

**Mitigação conceitual:**
- Diferenciar "não fez" de "não registrou"
- Perguntar quando incerteza é alta
- Wearables reduzem dependência (futuro)
- Valor mesmo com registro parcial — não exigir perfeição

---

### L3 — Correlação ≠ causalidade
**Limitação:** Padrões detectados podem ser coincidência, especialmente com poucos dados.

**Impacto:** Recomendações baseadas em correlações espúrias.

**Mitigação conceitual:**
- Limiares mínimos de amostra para insights
- Confiança explícita e limitações comunicadas
- Preferir recomendações conservadoras quando confiança <0.7
- Usuário pode contestar — sistema aprende

---

### L4 — Complexidade cognitiva do modelo
**Limitação:** Múltiplas camadas de contexto, grafo, loop de inteligência — complexo de implementar e debugar.

**Impacto:** Risco de bugs silenciosos, recomendações incoerentes, dificuldade de explicar "por que o sistema fez X".

**Mitigação conceitual:**
- Audit trail completo (toda recomendação rastreável a eventos)
- Modo "explicar" sempre disponível
- Testes de cenário (como os deste documento) como suite de validação
- Implementação incremental — MVP com camadas mínimas

---

### L5 — Variabilidade biológica individual
**Limitação:** Mesmo padrão (sono ruim → performance baixa) não se aplica universalmente.

**Impacto:** Recomendações genéricas disfarçadas de personalizadas.

**Mitigação conceitual:**
- Personalização cresce com dados do usuário específico
- Nunca assumir que padrão populacional = padrão do usuário
- Preferências explícitas override inferências

---

### L6 — Eventos de omissão inferidos
**Limitação:** "Usuário não treinou" é inferido, não confirmado. Pode ter treinado fora do app.

**Impacto:** Adaptações desnecessárias ou alertas falsos.

**Mitigação conceitual:**
- Confirmar antes de adaptações significativas
- Permitir registro retroativo
- Integrações futuras capturam atividade externa

---

## 12.2 Decisões que ainda precisam ser tomadas

| # | Decisão | Opções | Impacto |
|---|---------|--------|---------|
| D1 | **Granularidade de eventos** | Fine-grained (cada série) vs. coarse (sessão) | Volume de dados, precisão |
| D2 | **Frequência de recálculo de contexto** | Real-time vs. batch (horário) | Latência, custo computacional |
| D3 | **Limiar para disparar inteligência** | Sensível vs. conservador | Proatividade vs. ruído |
| D4 | **Autonomia do sistema (níveis 1-2)** | Quanto ajustar sem confirmar | Conveniência vs. controle |
| D5 | **Retenção de eventos** | Forever vs. arquivamento | Custo, utilidade histórica |
| D6 | **Peso de dados importados vs. manuais** | Wearable > manual ou igual | Confiança, conflitos |
| D7 | **Transição automática de fase** | Sistema propõe vs. usuário inicia | Automação vs. autonomia |
| D8 | **Múltiplos objetivos simultâneos** | Permitir ou forçar único | Complexidade, clareza |
| D9 | **Escopo de guardrails de saúde** | O que o sistema nunca recomenda | Segurança, responsabilidade |
| D10 | **Modelo de confiança** | Escala, limiares, decay temporal | Qualidade das recomendações |

---

## 12.3 Riscos da arquitetura conceitual

### R1 — Over-engineering antes de validação
**Risco:** Construir Context Engine + Knowledge Graph + Intelligence Loop completos antes de validar retenção básica.

**Probabilidade:** Alta  
**Impacto:** Alto (tempo, recursos)  
**Mitigação:** MVP com loop simplificado (Observar → Recomendar → Adaptar), evoluir incrementalmente

---

### R2 — Recomendações erradas com aparência de certeza
**Risco:** Sistema apresenta recomendações com confiança alta quando dados são insuficientes.

**Probabilidade:** Média  
**Impacto:** Alto (confiança do usuário, segurança)  
**Mitigação:** Confiança conservadora, limitações explícitas, guardrails de saúde

---

### R3 — Fadiga de notificações/recomendações
**Risco:** Sistema proativo demais → usuário ignora ou abandona.

**Probabilidade:** Média  
**Impacto:** Médio  
**Mitigação:** Limiares altos para interrupção, batching de insights, preferências de frequência

---

### R4 — Privacidade e dados sensíveis
**Risco:** Timeline rica em dados de saúde → vulnerabilidade, regulatório (LGPD).

**Probabilidade:** Média  
**Impacto:** Alto  
**Mitigação:** Privacy by design, consentimento granular, direito ao esquecimento, criptografia

---

### R5 — Dependência de IA para valor core
**Risco:** Se IA falha, produto perde diferencial.

**Probabilidade:** Média  
**Impacto:** Alto  
**Mitigação:** Fallback para regras determinísticas, valor mesmo sem IA (tracking integrado)

---

### R6 — Complexidade de onboarding
**Risco:** Modelo rico exige setup inicial pesado → abandono no dia 1.

**Probabilidade:** Alta  
**Impacto:** Alto  
**Mitigação:** Onboarding progressivo, valor imediato com dados mínimos

---

## 12.4 Pontos que merecem validação antes da implementação

### V1 — Entrevistas com usuários potenciais
**Validar:** Dores reais, disposição para registro, confiança em recomendações de IA

**Perguntas-chave:**
- Você registraria treino/refeição/sono diariamente? Por quanto tempo?
- Confiaria em recomendação automática de deload?
- O que faria você abandonar o app?

---

### V2 — Protótipo de conceito (sem código)
**Validar:** Compreensão do loop diário, proposta de valor, linguagem

**Entregável:** Fluxo de papel ou Figma de baixa fidelidade do "Seu Dia"

---

### V3 — Teste de cenários com usuários
**Validar:** Cenários deste documento fazem sentido para usuários reais

**Método:** Apresentar cenários, perguntar "o que você faria?" vs. "o que o sistema deveria fazer?"

---

### V4 — Validação com profissionais
**Validar:** Personal/nutricionista veem valor na camada profissional

**Perguntas-chave:**
- Usaria plataforma para acompanhar clientes?
- O que precisa ter para substituir planilha/WhatsApp?

---

### V5 — Benchmark de concorrentes
**Validar:** Diferenciais propostos são percebidos como únicos

**Método:** Análise de apps existentes contra diferenciais D1-D7 da Product Bible

---

### V6 — Definição de guardrails de saúde
**Validar:** Com profissional de saúde, o que o sistema pode/não pode recomendar

**Entregável:** Documento de guardrails antes de implementar Intelligence Loop

---

### V7 — MVP scope lock
**Validar:** Qual subconjunto mínimo do modelo entrega valor

**Candidatos a MVP:**
- Eventos: treino, nutrição básica, peso, sono
- Contexto: imediato + diário + semanal
- Inteligência: regras determinísticas + 1-2 correlações simples
- Adaptação: níveis 1-2 apenas

---

## 12.5 Síntese final

Esta arquitetura conceitual define um **organismo digital** que:

1. **Observa** a vida física via eventos
2. **Interpreta** via camadas de contexto
3. **Conecta** via grafo de conhecimento
4. **Raciocina** via loop de inteligência
5. **Adapta** via planos flexíveis
6. **Aprende** via feedback contínuo

A implementação deve ser **incremental**, validando cada camada antes de adicionar complexidade. O MVP não precisa do grafo completo — precisa do loop básico funcionando com valor real.

```
Implementação sugerida:

  Fase 1: Eventos + Contexto (imediato/diário) + Planos + Regras
  Fase 2: + Contexto semanal/mensal + Correlações simples
  Fase 3: + Intelligence Loop completo + Insights
  Fase 4: + Knowledge Graph + Personalização profunda
  Fase 5: + Integrações + Profissionais + Comunidade
```

---

## Controle de Versão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | Jul 2026 | Architecture Team | Documento fundacional |

---

## Referências cruzadas

- **Product Bible:** `docs/PRODUCT_BIBLE.md` — quem somos, por que existimos
- **Próximo documento:** Tech Stack Decision + Domain Model técnico (derivado deste)

---

*Este documento é a fonte oficial de arquitetura conceitual. Toda decisão técnica futura deve ser validada contra os princípios, domínios, fluxos e limites aqui definidos. Alterações requerem revisão explícita e incremento de versão.*

