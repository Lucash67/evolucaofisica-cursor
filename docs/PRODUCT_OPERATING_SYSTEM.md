# Product Operating System — Evolução Física

> **Versão:** 1.0  
> **Status:** Referência unificadora — como todas as peças convivem no dia a dia  
> **Última atualização:** Julho 2026  
> **Referências:** Todos os documentos fundacionais em `docs/`

---

## Prefácio

Até aqui construímos cinco lentes sobre o mesmo produto:

| Documento | Responde |
|-----------|----------|
| `PRODUCT_BIBLE.md` | Quem somos |
| `CONCEPTUAL_ARCHITECTURE.md` | Como o sistema pensa |
| `MVP_LOCK.md` | O que construiremos agora |
| `EXPERIENCE_BLUEPRINT.md` | Como o usuário deve sentir |
| `REAL_USER_WORKFLOW.md` | Como um usuário real vive hoje |

Este documento responde a pergunta que une tudo:

> **"Como todas essas peças convivem no dia a dia dentro do produto?"**

Não descrevemos telas, cores ou wireframes. Descrevemos o **Sistema Operacional do Produto** — o ritmo, a navegação, os rituais e os ciclos que transformam módulos isolados em **um único organismo**.

Assim como um SO de computador gerencia processos, memória e tempo sem que o usuário pense em kernels, nosso produto gerencia evolução física sem que o usuário pense em módulos.

---

## Índice

1. [Ciclos do produto](#1-ciclos-do-produto)
2. [Unidade de navegação](#2-unidade-de-navegação)
3. [Organização do tempo](#3-organização-do-tempo)
4. [Operating System da Evolução](#4-operating-system-da-evolução)
5. [Rituais do produto](#5-rituais-do-produto)
6. [Orientação contínua do usuário](#6-orientação-contínua-do-usuário)
7. [Integração dos módulos](#7-integração-dos-módulos)
8. [Semana real completa](#8-semana-real-completa)
9. [Princípios anti-fragmentação](#9-princípios-anti-fragmentação)
10. [Revisão crítica](#10-revisão-crítica)

---

# 1. Ciclos do produto

## 1.1 O usuário vive em múltiplos ciclos simultâneos

Evolução física não acontece em uma única escala temporal. O produto reconhece **cinco ciclos aninhados**, do mais curto ao mais longo:

```
┌─────────────────────────────────────────────────────────────────┐
│  OBJETIVO (meses → anos)                                        │
│  ┌───────────────────────────────────────────────────────────┐│
│  │  FASE (semanas → meses)                                   ││
│  │  ┌─────────────────────────────────────────────────────┐  ││
│  │  │  SEMANA (7 dias)                                    │  ││
│  │  │  ┌───────────────────────────────────────────────┐  │  ││
│  │  │  │  DIA (24 horas)                               │  │  ││
│  │  │  │  ┌─────────────────────────────────────────┐  │  │  ││
│  │  │  │  │  SESSÃO (minutos — treino, refeição)    │  │  │  ││
│  │  │  │  └─────────────────────────────────────────┘  │  │  ││
│  │  │  └───────────────────────────────────────────────┘  │  ││
│  │  └─────────────────────────────────────────────────────┘  ││
│  └───────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

Cada ciclo tem função distinta. **Nenhum substitui outro.**

---

## 1.2 Ciclo do Dia — unidade de experiência

**Duração:** 24 horas (ancorado no ritmo circadiano do usuário, não meia-noite UTC).

**Função:** Onde a vida acontece. Onde o usuário **age e registra**.

**Unidade de produto:** **Seu Dia** — centro de gravidade diário.

**O que muda a cada dia:**
- Plano imediato (treino sim/não, metas nutricionais, hábitos)
- Pendências e conclusões
- Contexto imediato (sono, energia, humor)

**O usuário vive primariamente em dias.** Abre o app pensando "hoje" — não "semana 14 do mesociclo".

---

## 1.3 Ciclo da Semana — unidade de consistência

**Duração:** 7 dias, tipicamente domingo→sábado (configurável).

**Função:** Medir **aderência** e **ritmo**. Responder: "Esta semana foi coerente com a intenção?"

**Unidade de produto:** **Plano Semanal** + **Check-in Semanal**.

**O que muda a cada semana:**
- Distribuição de treinos e cardio
- Meta de aderência (ex: 4/4 treinos)
- Resumo agregado (macros médios, sono médio, peso)

**A semana é a unidade de accountability** — não punitiva, reflexiva.

---

## 1.4 Ciclo da Fase — unidade de estratégia

**Duração:** 4–16 semanas tipicamente (adaptação, accumulation, cutting, bulking, deload, manutenção).

**Função:** Estruturar **como** percorrer o objetivo. Define regras de interpretação.

**Unidade de produto:** **Fase Ativa** — filtro global.

**O que muda a cada fase:**
- Calorias alvo e expectativa de peso
- Volume e intensidade de treino
- O que "progresso" significa (subir vs. descer balança)
- Tolerância a desvios

**Exemplo:** Mesmo evento "peso +0,5kg" = positivo em bulking, alerta em cutting.

---

## 1.5 Ciclo do Objetivo — unidade de direção

**Duração:** Meses a anos. Pode conter múltiplas fases.

**Função:** Responder **para onde** o usuário vai (hipertrofia, emagrecimento, saúde, força, retorno pós-lesão).

**Unidade de produto:** **Objetivo Primário** — bússola.

**O que muda com objetivo:**
- Critérios de sucesso
- Prioridade treino vs. nutrição
- Linguagem de feedback
- Sugestões de fase

---

## 1.6 Ciclo da Linha da Vida — unidade de identidade

**Duração:** Indefinida — toda a jornada no produto.

**Função:** Memória autobiográfica. PRs, lesões, transições, marcos, padrões aprendidos.

**Unidade de produto:** **Timeline** — append-only, imutável.

**O que persiste:** Tudo. Eventos, decisões, fases completadas, insights confirmados.

---

## 1.7 Como os ciclos se relacionam

```
                    LINHA DA VIDA
                         │
              ┌──────────┴──────────┐
              │      OBJETIVO       │
              │   (direção)         │
              └──────────┬──────────┘
                         │
              ┌──────────┴──────────┐
              │       FASE          │
              │   (estratégia)      │
              └──────────┬──────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────┴────┐    ┌─────┴─────┐   ┌─────┴─────┐
    │ SEMANA  │    │  SEMANA   │   │  SEMANA   │  ...
    │   N     │    │   N+1     │   │   N+2     │
    └────┬────┘    └─────┬─────┘   └─────┬─────┘
         │               │               │
    ┌────┴────┐    ┌─────┴─────┐   ┌─────┴─────┐
    │ 7 DIAS  │    │  7 DIAS   │   │  7 DIAS   │
    └────┬────┘    └─────┬─────┘   └─────┬─────┘
         │               │               │
    SESSÕES         SESSÕES         SESSÕES
```

### Regras de relação entre ciclos

| Regra | Significado |
|-------|-------------|
| **R1 — Dias alimentam semanas** | Eventos diários agregam em aderência semanal |
| **R2 — Semanas alimentam fases** | 4–8 semanas de dados informam transição de fase |
| **R3 — Fases servem objetivos** | Fase sem objetivo é operação sem direção |
| **R4 — Objetivo filtra interpretação** | Mesmo dado, significados diferentes |
| **R5 — Tudo alimenta a Timeline** | Nenhum evento se perde |
| **R6 — Ciclo curto nunca contradiz longo sem explicar** | Alerta se dia atípico vs. tendência de fase |
| **R7 — Ciclo longo nunca bloqueia ciclo curto** | Usuário pode agir hoje mesmo em fase incerta |

---

## 1.8 Qual ciclo domina quando

| Momento do usuário | Ciclo dominante | O que o produto mostra |
|--------------------|-----------------|------------------------|
| Abre app de manhã | **Dia** | Seu Dia |
| Pergunta "como foi minha semana?" | **Semana** | Resumo + aderência |
| Pergunta "devo continuar bulking?" | **Fase** | Progresso da fase + sugestão |
| Pergunta "para onde vou?" | **Objetivo** | Direção + fases restantes |
| Pergunta "quanto evolui?" | **Linha da Vida** | Timeline + marcos |

**Princípio:** Interface diária = **Dia**. Profundidade = navegar para ciclos maiores **sob demanda**.

---

# 2. Unidade de navegação

## 2.1 O usuário NÃO navega por páginas

Apps tradicionais organizam por **páginas** (Treino, Dieta, Perfil). Isso fragmenta a experiência — exatamente o que a Product Bible combate.

Nosso produto organiza por **contexto temporal + estado do ciclo**.

```
Navegação tradicional (rejeitada):

  [Treino] [Nutrição] [Hábitos] [Progresso] [Perfil]
       ↑         ↑          ↑          ↑
   silos isolados — usuário constrói conexões

Navegação do Product OS:

  AGORA (Seu Dia) ──► ESTA SEMANA ──► ESTA FASE ──► SUA JORNADA
       ↑                    ↑              ↑              ↑
   contexto temporal crescente — conexões nativas
```

---

## 2.2 Unidade primária: AGORA (Seu Dia)

**O que é:** Superfície de orientação do ciclo **Dia**.

**Contém:** Plano de hoje integrado (treino + nutrição + hábitos) + pendências + contexto mínimo.

**Quando o usuário está aqui:** 80% do tempo.

**Navegação:** Ações saem de Seu Dia e **retornam** a Seu Dia.

---

## 2.3 Unidade secundária: ESTA SEMANA

**O que é:** Agregação do ciclo **Semana**.

**Contém:** Plano semanal, aderência, resumo parcial, check-in (quando disponível).

**Quando o usuário está aqui:** Check-in domingo, consulta mid-week, revisão de aderência.

**Navegação:** Acessível em 1 toque a partir de Seu Dia — nunca escondida em menu profundo.

---

## 2.4 Unidade terciária: ESTA FASE / OBJETIVO

**O que é:** Contexto estratégico dos ciclos **Fase** e **Objetivo**.

**Contém:** Fase ativa, calorias alvo, expectativas, tempo restante, histórico da fase.

**Quando o usuário está aqui:** Transições, dúvidas estratégicas, revisão mensal.

**Navegação:** Acessível via Progresso ou Perfil — destino de reflexão, não de ação diária.

---

## 2.5 Unidade de profundidade: LINHA DA VIDA (Timeline)

**O que é:** Histórico completo append-only.

**Contém:** Eventos, marcos, transições, PRs, fotos, insights confirmados.

**Quando o usuário está aqui:** Curiosidade, comparação temporal, export (futuro).

**Navegação:** Progresso → Histórico. Nunca necessário para ação diária.

---

## 2.6 Eventos como unidade de dados — não de navegação

Eventos são a **unidade atômica de dados** (Conceptual Architecture), não destinos de navegação.

O usuário **não navega para "eventos"**. Eventos **alimentam** Seu Dia, Semana, Fase e Timeline invisivelmente.

```
Usuário registra refeição (evento)
         │
         ├──► Seu Dia atualiza macro
         ├──► Semana acumula média
         ├──► Fase recalcula aderência nutricional
         └──► Timeline registra permanentemente
```

---

## 2.7 Mapa de navegação conceitual

```
                    ┌─────────────────┐
                    │    SEU DIA      │  ◄── 80% do tempo
                    │    (AGORA)      │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │  AÇÃO    │  │  ESTA    │  │ PERFIL   │
        │ (treino, │  │  SEMANA  │  │ (config) │
        │ refeição,│  │          │  │          │
        │ hábito)  │  └────┬─────┘  └──────────┘
        └────┬─────┘       │
             │             ▼
             │      ┌──────────┐
             │      │  ESTA    │
             │      │  FASE    │
             │      └────┬─────┘
             │             │
             └─────────────┼──────────────┐
                           ▼              ▼
                    ┌──────────┐    ┌──────────┐
                    │ PROGRESSO│    │ TIMELINE │
                    │ (tendên.)│    │ (histó.) │
                    └──────────┘    └──────────┘
```

**Profundidade máxima:** 2 níveis a partir de Seu Dia para ações; 3 para configuração.

---

## 2.8 Por que contexto temporal > páginas de módulo

| Páginas de módulo | Contexto temporal |
|-------------------|-------------------|
| "Onde registro treino?" → aba Treino | "O que faço hoje?" → Seu Dia |
| Nutrição desconectada de treino | Macro do dia considera treino de hoje |
| Progresso = gráficos isolados | Progresso = tendência da semana/fase |
| Usuário constrói narrativa | Sistema constrói narrativa |
| 5 apps em 1 shell | 1 organismo |

---

# 3. Organização do tempo

## 3.1 As cinco camadas temporais

```
    HOJE ──► ESTA SEMANA ──► ESTA FASE ──► HISTÓRICO ──► LINHA DA VIDA
     │            │              │              │                │
   horas        7 dias        4-16 sem       30-90 dias        forever
     │            │              │              │                │
  agir         consistir      estrategizar   tendências        identidade
```

Cada camada **deriva** da anterior. Nunca existe independentemente.

---

## 3.2 HOJE

**Pergunta que responde:** "O que faço agora? O que falta hoje?"

**Fonte de dados:** Eventos das últimas 24h + plano do dia.

**Consumidores:** Seu Dia, ações imediatas, feedback pós-registro.

**Validade:** Expira ao fim do dia (ou início do sono do usuário).

**Conexão upward:** Dias completos alimentam Esta Semana.

```
Hoje (quarta):
  Treino: pernas ✓
  Proteína: 95/160g
  Sono ontem: 6,5h
  Pendente: jantar, registrar sono
         │
         ▼
  Contribui para: Semana — 3/4 treinos, proteína média parcial
```

---

## 3.3 ESTA SEMANA

**Pergunta que responde:** "Estou consistente? O plano da semana faz sentido?"

**Fonte de dados:** Agregação de 7 dias + plano semanal confirmado.

**Consumidores:** Indicador semanal na Home, check-in, adaptação.

**Validade:** Rolling 7 dias ou semana calendário (domingo-sábado).

**Conexão upward:** Semanas completas alimentam Esta Fase.

```
Semana 6:
  Aderência treino: 3/4 (75%)
  Proteína média: 152g
  Sono médio: 6,8h
  Peso: +0,2kg
         │
         ▼
  Contribui para: Fase bulking semana 6/12 — ritmo adequado
```

---

## 3.4 ESTA FASE

**Pergunta que responde:** "A estratégia atual está funcionando?"

**Fonte de dados:** 4–16 semanas de semanas agregadas + parâmetros da fase.

**Consumidores:** Interpretação de peso, sugestões de transição, calorias alvo.

**Validade:** Duração da fase (declarada ou inferida).

**Conexão upward:** Fases completas alimentam Histórico e Objetivo.

```
Fase: Bulking semana 8/12
  Peso total fase: +2,4kg
  Força: +8% volume
  Aderência média: 78%
         │
         ▼
  Contribui para: Objetivo hipertrofia — progresso sólido
```

---

## 3.5 HISTÓRICO

**Pergunta que responde:** "Quais padrões emergem? Como me comparo comigo mesmo?"

**Fonte de dados:** 30–90 dias (rolling) ou período selecionado.

**Consumidores:** Insights, correlações, tendências, relatórios.

**Validade:** Janela deslizante — sempre cresce.

**Conexão upward:** Padrões confirmados viram conhecimento da Linha da Vida.

```
Histórico 60 dias:
  Correlação sono<6h → performance -10% (confiança 0,82)
  Melhor aderência: seg/qua/sex
  Platô supino: semanas 4-6
         │
         ▼
  Contribui para: Personalização permanente do usuário
```

---

## 3.6 LINHA DA VIDA

**Pergunta que responde:** "Quem eu me tornei nessa jornada?"

**Fonte de dados:** Todos os eventos, decisões, marcos — desde o dia 1.

**Consumidores:** Narrativa de evolução, retrospectivas, memória do sistema.

**Validade:** Permanente. Append-only.

**Conexão:** Raiz de tudo. Nunca expira.

```
Linha da Vida:
  2026-01: Início — objetivo hipertrofia
  2026-03: PR supino 80kg
  2026-04: Lesão ombro — fase recuperação
  2026-06: Transição bulking → cutting
  2026-07: 30 dias consecutivos ativos
```

---

## 3.7 Fluxo de derivação temporal

```
EVENTO (agora)
    │
    ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  HOJE   │────►│ SEMANA  │────►│  FASE   │────►│HISTÓRICO│────►│  VIDA   │
│(derivado│     │(agregado│     │(estrat. │     │(padrões)│     │(memória)│
│ imediato│     │ 7 dias) │     │ 4-16sem)│     │ 30-90d) │     │ forever)│
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
    │               │               │               │               │
    └───────────────┴───────────────┴───────────────┴───────────────┘
                                    │
                                    ▼
                          FILTRADO POR OBJETIVO
                          (lente de interpretação)
```

**Regra crítica:** Informação **flui para cima** (evento → vida). Decisões **fluem para baixo** (fase → dia).

---

# 4. Operating System da Evolução

## 4.1 O ciclo perpétuo

O Product OS executa um **loop de 7 fases** que nunca termina — apenas evolui em escala e profundidade:

```
        ┌──────────────────────────────────────────────────────────┐
        │                                                          │
        ▼                                                          │
   PLANEJAR ──► EXECUTAR ──► REGISTRAR ──► INTERPRETAR ──►       │
        ▲                                          │               │
        │                                          ▼               │
   REPLANEJAR ◄── REVISAR ◄── ADAPTAR ◄────────────┘               │
        │                                                          │
        └──────────────────────────────────────────────────────────┘
```

Cada volta do ciclo produz **mais contexto** para a próxima. O sistema fica mais inteligente; o usuário, mais consistente com menos esforço.

---

## 4.2 PLANEJAR

**Quando:** Domingo (ritual semanal) + início de fase + retorno após ausência.

**O que acontece:**
- Sistema propõe plano da semana (treinos, cardio, metas)
- Calorias alvo visíveis conforme fase
- Usuário confirma ou ajusta — não reconstrói

**Inputs:** Objetivo, fase, histórico de aderência, preferências.

**Outputs:** Plano semanal confirmado, metas da semana, distribuição diária.

**Onde vive:** Esta Semana → derivado para cada Dia.

**Anti-padrão evitado:** Copiar template Notion toda semana (Real User Workflow D1).

---

## 4.3 EXECUTAR

**Quando:** Segunda a sábado — vida real.

**O que acontece:**
- Usuário treina, come, dorme, faz cardio
- Plano do dia guia — não controla
- Imprevistos absorvidos (treino mais curto, refeição estimada)

**Inputs:** Plano do dia, contexto imediato (sono, energia).

**Outputs:** Ações físicas — ainda não são dados.

**Onde vive:** Mundo real. Produto acompanha via Seu Dia.

**Anti-padrão evitado:** Exigir registro para executar.

---

## 4.4 REGISTRAR

**Quando:** Pós-ação — ≤60s por interação.

**O que acontece:**
- Ações viram **eventos** na Timeline
- Um registro alimenta múltiplas camadas (treino → checklist + progressão + aderência)
- Defaults inteligentes minimizam input

**Inputs:** Ação do usuário (confirmar, estimar, marcar).

**Outputs:** Eventos append-only.

**Onde vive:** Timeline + derivação imediata para Hoje.

**Anti-padrão evitado:** Duplicar registro em checklist + planilha + resumo (D4).

---

## 4.5 INTERPRETAR

**Quando:** Contínuo — após eventos significativos + agregações temporais.

**O que acontece:**
- Context Engine deriva significado (Conceptual Architecture)
- Eventos isolados viram tendências, flags, insights candidatos
- Objetivo e fase filtram interpretação

**Inputs:** Eventos, camadas temporais, objetivo, fase.

**Outputs:** Contexto derivado, insights, alertas suaves.

**Onde vive:** Invisível ao usuário — manifesto em copy de Seu Dia e resumos.

**Anti-patrão evitado:** Gráficos sem "e daí?" (Product Bible).

---

## 4.6 ADAPTAR

**Quando:** Desvio detectado, check-in semanal, solicitação do usuário.

**O que acontece:**
- Plano recalculado (treino remarcado, meta ajustada)
- Recomendação apresentada com razão
- Usuário confirma mudanças significativas

**Inputs:** Interpretação, aderência, preferências aprendidas.

**Outputs:** Plano ajustado, decisões registradas, eventos de sistema.

**Onde vive:** Plano da semana/dia atualizado; Timeline registra decisão.

**Anti-padrão evitado:** Treinos "atrasados" empilhados (D24).

---

## 4.7 REVISAR

**Quando:** Domingo — ritual de fechamento.

**O que acontece:**
- Resumo semanal **pré-gerado**
- Usuário valida + 3 perguntas + feedback pessoal opcional
- Aderência calculada automaticamente

**Inputs:** Todos os eventos da semana.

**Outputs:** Resumo confirmado, satisfação registrada, insumos para adaptação.

**Onde vive:** Esta Semana → alimenta Esta Fase.

**Anti-padrão evitado:** 30–45 min escrevendo resumo (D5).

---

## 4.8 REPLANEJAR

**Quando:** Imediatamente após revisar — mesma sessão dominical.

**O que acontece:**
- Plano da semana seguinte reflete adaptações
- Loop fecha → volta a PLANEJAR
- Zero copy-paste

**Inputs:** Resumo semanal, adaptações, fase, objetivo.

**Outputs:** Nova semana confirmada.

**Onde vive:** Esta Semana N+1 → derivado para Dias.

---

## 4.9 O ciclo nunca termina

```
Semana 1          Semana 2          Semana 8          Ano 1
    │                 │                 │                 │
    ▼                 ▼                 ▼                 ▼
 PLANEJAR ──► ... ──► REVISAR ──► REPLANEJAR ──► ... ──► Transição
    │                       │           │              de Fase
    │                       │           │                 │
    └───────────────────────┴───────────┴─────────────────┘
                    Contexto acumulado cresce
                    Inteligência personaliza
                    Esforço manual diminui
```

**Semana 1:** Regras gerais, registro manual, resumo básico.  
**Semana 8:** Padrões emergem, defaults mais precisos, insights.  
**Ano 1:** Sistema conhece preferências, correlaciona, prediz com prudência.

O ciclo é o **mesmo**. A **profundidade** evolui.

---

# 5. Rituais do produto

Rituais são **momentos previsíveis** onde o sistema muda comportamento, copy e prioridades. Criam ritmo — como um calendário interno.

---

## 5.1 Mapa de rituais

| Ritual | Quando | Comportamento do sistema |
|--------|--------|--------------------------|
| **Planejamento semanal** | Domingo | Modo estratégico: plano N+1, check-in, resumo |
| **Início de semana** | Segunda 6h | Modo operacional: Seu Dia limpo, foco no treino |
| **Seu Dia** | Diário | Modo orientação: ação + pendência + contexto |
| **Pós-treino** | Após sessão | Modo feedback: confirmação + progressão + macro |
| **Pós-refeição** | Após registro | Modo acumulação: barra macro atualizada |
| **Fim do dia** | 21h–23h | Modo fechamento: pendências suaves, sono |
| **Fim de semana** | Sábado noite | Modo preparação: "Check-in amanhã" opt-in |
| **Check-in semanal** | Domingo | Modo reflexão: resumo + adaptação |
| **Mudança de fase** | Evento | Modo transição: parâmetros novos, explicação |
| **Retorno pós-ausência** | App aberto após 7+ dias | Modo reintrodução: plano simplificado |
| **Marco (PR, 1 mês)** | Evento | Modo delight: reconhecimento sutil (1×/sessão) |

---

## 5.2 Ritual: Domingo — Planejamento + Revisão

**Sequência:**
```
1. Resumo semana N (pré-gerado)
2. Check-in (3 perguntas, 90s)
3. Adaptação (se necessário)
4. Plano semana N+1 (pré-montado)
5. Confirmação → loop fechado
```

**Comportamento do sistema:**
- Copy reflexiva, não operacional
- Prioriza Progresso e Esta Semana
- Seu Dia em segundo plano
- Notificações: nenhuma agressiva — convite opt-in

**Duração alvo:** ≤10 min total (Real User Workflow).

---

## 5.3 Ritual: Segunda — Início operacional

**Comportamento do sistema:**
- Seu Dia resetado para semana nova
- Plano do dia em destaque
- Resumo da semana anterior: 1 linha ("Semana passada: 3/4 treinos")
- Zero culpa por semana irregular

---

## 5.4 Ritual: Seu Dia (diário)

**Comportamento do sistema:**
- Responde em <10s: o quê, como estou, o que falta
- Prioriza ação pendente mais relevante
- Contexto mínimo (1 observação, não 5)
- Adapta por hora do dia (manhã ≠ noite)

**Manhã:** Treino + sono ontem.  
**Tarde:** Pendências + macro parcial.  
**Noite:** Fechamento + amanhã preview.

---

## 5.5 Ritual: Pós-treino

**Comportamento do sistema:**
- Feedback imediato: "Concluído. X/Y esta semana."
- PR detectado → delight moment
- RPE opcional — nunca bloqueia
- Sugestão nutricional se dia de treino ("Priorize proteína nas próximas horas")
- Retorno a Seu Dia — não prende em tela de celebração

---

## 5.6 Ritual: Pós-refeição

**Comportamento do sistema:**
- Barra macro atualizada
- "Faltam Xg proteína" se relevante
- Feedback mais leve que pós-treino — refeição é rotina
- 2ª+ refeição do dia: confirmação mínima

---

## 5.7 Ritual: Fim de semana (sábado)

**Comportamento do sistema:**
- Visão semanal: aderência quase final
- "1 treino para meta" se aplicável
- Convite suave check-in amanhã — dismissable
- Plano domingo preparado em background

---

## 5.8 Ritual: Mudança de fase

**Comportamento do sistema:**
- Fluxo guiado — não mudança silenciosa
- Explica o que muda: calorias, expectativa peso, volume
- Histórico preservado — marco na Timeline
- Primeiros 3 dias: copy de transição

---

## 5.9 Ritual: Retorno pós-ausência

**Comportamento do sistema:**
- "Bem-vindo de volta" — caloroso, breve
- Pergunta empática (opções, não texto obrigatório)
- Plano simplificado — 2 treinos, 30 min
- Histórico intacto — PRs visíveis
- Modo reintrodução por 1–2 semanas

---

## 5.10 Calendário ritualístico visual

```
        Dom    Seg    Ter    Qua    Qui    Sex    Sáb
        ───    ───    ───    ───    ───    ───    ───
Ritual  ███    ░░░    ░░░    ░░░    ░░░    ░░░    ░▓░
        Plan+  Início Seu    Seu    Seu    Seu    Fim
        Rev    Sem    Dia    Dia    Dia    Dia    Sem

███ = intenso (domingo)
░░░ = operacional (seu dia)
░▓░ = preparação (sábado)
```

---

# 6. Orientação contínua do usuário

## 6.1 Princípio: zero navegação mental

O usuário **nunca** deve perguntar "onde estou?" ou "o que faço agora?". O produto responde proativamente.

---

## 6.2 Onde estou

**Mecanismo:** Seu Dia + indicador de ciclo sutil.

| Sinal | Onde está |
|-------|-----------|
| Seu Dia visível | Ciclo **Dia** — modo operacional |
| "Semana 6 · Bulking" no topo | Contexto **Semana + Fase** |
| Check-in ativo | Ciclo **Semana** — modo revisão |
| Fluxo de transição | Ciclo **Fase** — modo estratégico |

**Regra:** Uma linha de contexto temporal sempre visível. Nunca breadcrumb de 4 níveis.

```
Exemplo de orientação:
  "Quarta · Semana 6 · Bulking"
```

---

## 6.3 O que acabou

**Mecanismo:** Confirmações pós-ação + estado "completo" em Seu Dia.

| Ação concluída | Feedback |
|----------------|----------|
| Treino | ✓ + contador semanal |
| Refeição | Macro atualizado |
| Sono | Hábito marcado |
| Dia completo | "Dia registrado" — opcional, noturno |

**Regra:** Toda conclusão visível em ≤2s. Nunca silêncio.

---

## 6.4 O que está acontecendo

**Mecanismo:** Observação contextual única (não feed).

| Contexto | Exemplo |
|----------|---------|
| Sono ruim | "Noite curta — treino leve sugerido" |
| Semana forte | "3/3 treinos — boa consistência" |
| Macro baixo | "Proteína abaixo da média esta semana" |
| Fase avançada | "Semana 8/12 de bulking" |

**Regra:** Máximo **1 observação contextual** por sessão na Home. Profundidade sob demanda.

---

## 6.5 O que falta

**Mecanismo:** Pendências priorizadas — máximo 3.

```
Pendências hoje (exemplo):
  1. Treino de pernas (45 min)
  2. Registrar almoço
  3. Marcar sono (noite)
```

**Regra:** Pendência ≠ cobrança. Linguagem neutra. Desaparece quando concluída ou quando dia encerra (sem culpa).

---

## 6.6 O que vem depois

**Mecanismo:** Preview do próximo passo ao fechar ação.

| Após | Preview |
|------|---------|
| Treino | "Próximo: registrar almoço" ou "Amanhã: costas" |
| Refeição | "Faltam 40g proteína hoje" |
| Fim do dia | "Amanhã: treino de pernas, 45 min" |
| Check-in | "Semana 7 começa amanhã — 4 treinos planejados" |

**Regra:** Toda sessão termina com **razão para voltar** — nunca com vazio.

---

## 6.7 Modelo de orientação integrado

```
┌─────────────────────────────────────────────────────────┐
│  Quarta · Semana 6 · Bulking              ← ONDE ESTOU  │
├─────────────────────────────────────────────────────────┤
│  Treino pernas ✓ · Proteína 95/160g       ← O QUE ACABOU│
│  "Noite curta — treino leve feito"        ← ACONTECENDO │
├─────────────────────────────────────────────────────────┤
│  ○ Registrar jantar                       ← O QUE FALTA │
│  ○ Marcar sono (noite)                                  │
├─────────────────────────────────────────────────────────┤
│  Amanhã: costas, 40 min                   ← VEM DEPOIS │
└─────────────────────────────────────────────────────────┘
```

---

# 7. Integração dos módulos

## 7.1 Princípio: um organismo, não cinco apps

Treino, Nutrição, Hábitos, Progresso e Inteligência **não são produtos separados**. São **órgãos** do mesmo organismo — comunicam via eventos e contexto, nunca via "abas isoladas".

```
        ┌─────────────────────────────────────────┐
        │              SEU DIA (cérebro)           │
        │         orienta · integra · prioriza    │
        └────────────────────┬────────────────────┘
                             │
       ┌─────────────────────┼─────────────────────┐
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   TREINO    │      │  NUTRIÇÃO   │      │   HÁBITOS   │
│  (estímulo) │◄────►│ (combustível)│◄────►│  (suporte)  │
└──────┬──────┘      └──────┬──────┘      └──────┬──────┘
       │                     │                     │
       └─────────────────────┼─────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   PROGRESSO     │
                    │  (memória +     │
                    │   tendências)   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ INTELIGÊNCIA    │
                    │ (interpretação +│
                    │  recomendação)  │
                    └─────────────────┘
```

---

## 7.2 Treino no organismo

**Papel:** Estímulo principal. Gera eventos de maior valor.

**Emite:** `training.session.completed`, cargas, RPE, duração.

**Consome:** Sono (intensidade sugerida), nutrição (dia de treino), fase (volume).

**Integração visível:**
- Seu Dia: treino em destaque quando planejado
- Nutrição: "Dia de treino — proteína elevada"
- Progresso: aderência, PRs, volume
- Inteligência: estagnação, deload, progressão

**Nunca:** Aba "Treino" isolada sem contexto do dia.

---

## 7.3 Nutrição no organismo

**Papel:** Combustível. Segunda ação mais frequente.

**Emite:** `nutrition.meal.logged`, macros estimados.

**Consome:** Treino (metabolismo do dia), fase (calorias alvo), objetivo.

**Integração visível:**
- Seu Dia: barra macro sempre presente
- Treino: sugestão pós-treino
- Progresso: média semanal, aderência
- Inteligência: padrões alimentares, deslizes

**Nunca:** Contador de calorias isolado sem meta de fase.

---

## 7.4 Hábitos no organismo

**Papel:** Suporte. Contexto de recuperação.

**Emite:** `sleep.completed`, `habit.water.logged`.

**Consome:** Nada diretamente — alimentam interpretação.

**Integração visível:**
- Seu Dia: sono e água como pendências leves
- Treino: "Sono 5h — treino leve sugerido"
- Progresso: média semanal sono
- Inteligência: correlação sono→performance

**Nunca:** Streaks punitivos ou hábitos desconectados de performance.

---

## 7.5 Progresso no organismo

**Papel:** Memória agregada. Narrativa de evolução.

**Emite:** Tendências, aderência, marcos.

**Consome:** Todos os eventos — agregação pura.

**Integração visível:**
- Seu Dia: indicador semanal mínimo
- Check-in: resumo completo
- Fase: progresso da fase
- Timeline: histórico profundo

**Nunca:** Dashboard de 15 gráficos. Tendência em linguagem humana.

---

## 7.6 Inteligência no organismo

**Papel:** Interpretação + recomendação. Sistema nervoso.

**Emite:** Insights, recomendações, adaptações, copy contextual.

**Consome:** Contexto de todas as camadas temporais.

**Integração visível:**
- Seu Dia: 1 observação contextual
- Pós-ação: feedback significativo
- Check-in: resumo narrativo
- Transições: sugestões de fase

**Nunca:** Chatbot flutuante. Black box. Recomendação sem "por quê".

---

## 7.7 Fluxo de integração — exemplo unificado

```
Evento: training.session.completed (pernas, RPE 8)

Treino:       Sessão marcada ✓ — 3/4 semana
Nutrição:     "Priorize proteína e carbs nas próximas 4h"
Hábitos:      (sem ação direta)
Progresso:    Aderência 75% → tendência estável
Inteligência: "RPE 8 — consistente com progressão da fase"
Seu Dia:      Pendência treino removida · macro em destaque
Timeline:     Evento permanente
```

**Um registro. Seis dimensões atualizadas. Zero navegação entre módulos.**

---

## 7.8 Regra de ouro da integração

> **Se o usuário precisa abrir outra "seção" para entender o impacto de uma ação, a integração falhou.**

---

# 8. Semana real completa

## Contexto do usuário

- **Nome:** Lucas (usuário real do Notion — Real User Workflow)
- **Objetivo:** Hipertrofia
- **Fase:** Bulking, semana 6 de 12
- **Plano:** 4 treinos/semana, 2.400 kcal, 160g proteína
- **MVP ativo:** Seu Dia, treino, nutrição presets, sono, check-in

---

## Domingo — Revisão + Planejamento

| Hora | Usuário | Sistema (Product OS) |
|------|---------|-------------------|
| 10h | Abre app | **Ritual:** Modo domingo. Resumo semana 5 pré-gerado |
| | | "Semana 5: 4/4 treinos · proteína média 155g · peso +0,2kg · sono 6,9h" |
| | | "PR supino: 82,5kg (+2,5kg)" |
| 10h02 | Check-in: semana boa, 4/5 | 3 perguntas · 90s |
| | | "Aderência 100% treinos. Proteína acima da meta. Sono marginal." |
| 10h04 | Confirma | **Adaptar:** Nenhum ajuste necessário |
| | | **Replanejar:** Semana 6 pré-montada — 4 treinos (seg/ter/qui/sex) |
| | Confirma plano | "Semana 6 pronta. Segunda: peito, 45 min." |
| | Fecha app | **Orientação:** "Semana 6 começa amanhã" |

**Ciclos ativos:** Semana (fechamento + abertura), Fase (continua).

---

## Segunda — Treino peito

| Hora | Usuário | Sistema |
|------|---------|---------|
| 7h | Registra sono: 7h, ok | Evento → Hoje · Hábito ✓ |
| 8h | Preset café | +30g P · 95/160g acumulado |
| 12h | Preset almoço médio | +40g P · 135/160g |
| 18h | Inicia treino peito | Plano pré-preenchido · guia exercícios |
| 18h50 | Conclui · RPE 7 | **Ritual pós-treino:** "4/4 meta? 1/4 esta semana." |
| | | PR não · performance +2% vs. sem. passada |
| 20h | Preset jantar | 165/160g · "Meta proteína atingida" |
| 22h | Fecha app | "Amanhã: costas, 40 min" |

---

## Terça — Costas + sono curto

| Hora | Usuário | Sistema |
|------|---------|---------|
| 7h | Sono: 5,5h, ruim | Evento → contexto imediato |
| | | **Inteligência (D14+):** "Noite curta. Costas mantido — considere RPE ≤7" |
| 18h | Treino costas · RPE 6 | Respeitou sugestão |
| | Conclui | "2/4 esta semana · performance estável apesar do sono" |

---

## Quarta — Descanso + deslize

| Hora | Usuário | Sistema |
|------|---------|---------|
| — | Dia off | Seu Dia: "Recuperação. Meta proteína mantida." |
| 21h | Tag deslize: pizza | **Neutro:** "Anotado. Seguimos." |
| | | Macro do dia: ~2.600 kcal (acima) · semana ainda ok |
| | | Sem culpa · sem "compense amanhã" |

---

## Quinta — Pernas

| Hora | Usuário | Sistema |
|------|---------|---------|
| 7h | Sono: 7,5h | Contexto recuperado |
| 18h | Treino pernas · RPE 8 | 3/4 semana |
| | | Progressão carga: +2,5kg leg press vs. sem. passada |
| | | "Maior carga leg press em 4 semanas" |

---

## Sexta — Ombros + fim de semana

| Hora | Usuário | Sistema |
|------|---------|---------|
| 18h | Treino ombros · conclui | 4/4 · "Meta semanal atingida" |
| 21h | | **Ritual sábado:** "Check-in amanhã — 2 min" dismissable |

---

## Sábado — Flexível

| Hora | Usuário | Sistema |
|------|---------|---------|
| — | Caminhada 30 min | Cardio opcional registrado (V1) |
| | Refeições flexíveis | Visão semanal macro: 158g média ✓ |
| | Não abre app | OK — sem notificação agressiva |

---

## Domingo (semana 6) — Fechamento

| Hora | Usuário | Sistema |
|------|---------|---------|
| 10h | Abre check-in | "Semana 6: 4/4 · proteína 158g · peso +0,15kg · sono 6,7h" |
| | | "Destaque: leg press +2,5kg · 1 deslize (qua)" |
| | Feedback: energia ok | Integrado ao resumo |
| | Confirma semana 7 | Plano N+1 · loop reinicia |

**Ciclo OS completo:** Planejar → Executar → Registrar → Interpretar → Adaptar → Revisar → Replanejar ✓

---

# 9. Princípios anti-fragmentação

Toda feature futura deve passar por estes **10 princípios**. Se violar qualquer um → **rejeitar ou redesenhar**.

---

### POS1 — Todo dado nasce como evento

Nova feature que "salva estado" sem evento na Timeline **viola o modelo**. Dados mortos não existem.

---

### POS2 — Toda ação retorna a Seu Dia

Fluxos que terminam em destinos órfãos (sem retorno ao centro) **fragmentam**. Exceção: check-in semanal.

---

### POS3 — Nenhum módulo próprio de navegação top-level

Proibido: "Nova aba Marketplace" no mesmo nível de Seu Dia. Extensões vivem **dentro** do ciclo existente ou em Progresso/Perfil.

---

### POS4 — Integração antes de isolamento

Feature nova deve declarar: **quais eventos emite** e **quais módulos alimenta**. Se resposta for "nenhum" → feature orphan → rejeitar.

---

### POS5 — Respeitar ciclos temporais

Feature não pode ignorar fase/objetivo. Dado sem filtro temporal = interpretação errada.

---

### POS6 — Rituais sagrados

Check-in domingo, Seu Dia, pós-ação feedback — **não competir** com novos rituais. Máximo 1 novo ritual/ano.

---

### POS7 — Profundidade sob demanda

Feature avançada vive em Progresso ou Fase — **nunca polui Seu Dia** no D1.

---

### POS8 — Zero-sum de atenção

Nova informação na Home = remover informação existente. Home não cresce infinitamente.

---

### POS9 — Mesmo loop operacional

Wearables, profissionais, comunidade — todos emitem eventos e alimentam o **mesmo** ciclo Plan→Execute→Register→Interpret→Adapt→Review→Replan.

---

### POS10 — Checklist de feature (obrigatório)

| # | Pergunta | Obrigatório |
|---|----------|-------------|
| 1 | Emite eventos canônicos? | Sim |
| 2 | Alimenta Seu Dia ou ciclo semanal+? | Sim |
| 3 | Respeita fase/objetivo? | Sim |
| 4 | Fortalece integração treino↔nutri↔hábitos? | Preferencial |
| 5 | Pode viver em Progresso (não Home)? | Se avançado |
| 6 | Passa MVP Lock checklist? | Sim |
| 7 | Passa Experience Blueprint DP1–DP18? | Sim |
| 8 | Reduz dor do Real User Workflow? | Sim |

---

# 10. Revisão crítica

## 10.1 Este modelo sustenta cinco anos de evolução?

### Resposta: **Sim — com ressalvas documentadas.**

---

### Por que sustenta

| Dimensão | Capacidade 5 anos |
|----------|-------------------|
| **Ciclos aninhados** | Dia→Vida escala indefinidamente |
| **Event-driven** | Wearables, labs, profissionais entram como eventos |
| **Context Engine** | Mais dados = mais personalização |
| **Timeline append-only** | Histórico nunca obsoleto |
| **Rituais** | Novos rituais raros; core estável |
| **Navegação temporal** | Não depende de features — depende de tempo |
| **POS1–POS10** | Guardrails contra fragmentação |

---

### Riscos em horizonte longo

| Risco | Horizonte | Mitigação |
|-------|-----------|-----------|
| **Seu Dia sobrecarregado** | Ano 2–3 | POS8 zero-sum; profundidade em Progresso |
| **Rituais demais** | Ano 2+ | POS6 — máximo 1 ritual novo/ano |
| **Múltiplos objetivos** | Ano 2+ | Decisão pendente — modelo assume 1 primário |
| **Profissionais como silo** | Ano 3+ | POS9 — prescrições como eventos |
| **Comunidade competindo com Seu Dia** | Ano 3+ | Comunidade opt-in, nunca Home default |
| **IA proativa excessiva** | Ano 2+ | POS7 + Experience Blueprint silêncio consciente |

---

### O que evolui vs. o que permanece

```
PERMANECE (5 anos):          EVOLUI (5 anos):
─────────────────────        ─────────────────────
Ciclo OS 7 fases             Profundidade inteligência
Seu Dia como centro          Fontes de eventos
Navegação temporal           Correlações e predição
Ritual domingo               Integrações externas
Timeline append-only         Camada profissional
Integração módulos           Benchmarks anonimizados
Anti-fragmentação POS        Marketplace (se ever)
```

---

### Teste de stress: features futuras

| Feature | Compatível? | Como encaixa |
|---------|-------------|--------------|
| Apple Health | ✅ | Eventos sono/passos → Hábitos → Inteligência |
| Personal trainer | ✅ | `professional.prescription` → Plano |
| Comunidade | ⚠️ | Progresso opt-in — nunca Seu Dia |
| Marketplace | ⚠️ | Perfil/Marketplace — POS3 |
| Genética | ✅ | Eventos lab → Contexto fase |
| Predição ML | ✅ | Inteligência → copy Seu Dia |
| Chatbot | ❌ | Viola POS2, MVP Lock — observações integradas |

---

### Nota final do Product OS: **9.0 / 10**

**Forças:**
- Unifica 5 documentos em operação coerente
- Escala temporal clara (dia→vida)
- Rituais criam previsibilidade sem rigidez
- Anti-fragmentação explícita
- Semana real demonstra viabilidade

**Gaps:**
- Experiência multi-objetivo não modelada
- Desktop/tablet como ciclo diferente — subexplorado
- Profissionais como "segundo usuário" — precisa OS extension futuro
- Validação empírica pendente — modelo conceitual robusto, não testado

---

## 10.2 Mapa unificado da documentação

```
                    PRODUCT BIBLE
                    (estratégia)
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
   CONCEPTUAL         MVP LOCK      REAL USER
   ARCHITECTURE       (escopo)      WORKFLOW
   (como pensa)                      (realidade)
          │               │               │
          └───────────────┼───────────────┘
                          ▼
                 EXPERIENCE BLUEPRINT
                    (como sentir)
                          │
                          ▼
              ┌───────────────────────┐
              │  PRODUCT OPERATING    │
              │  SYSTEM (este doc)    │
              │  como tudo convive    │
              └───────────┬───────────┘
                          │
                          ▼
                 User Flows · Design · Lovable
```

---

## Controle de Versão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | Jul 2026 | Product Team | Sistema operacional unificado |

---

*Este documento é o kernel do produto. Toda feature, tela e integração deve operar dentro deste sistema — ou não deve existir.*
