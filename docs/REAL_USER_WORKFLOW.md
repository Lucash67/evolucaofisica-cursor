# Real User Workflow — Engenharia Reversa Notion → Produto

> **Versão:** 1.0  
> **Status:** Ponte entre vida real e construção de interface  
> **Última atualização:** Julho 2026  
> **Referências:** `PRODUCT_BIBLE.md` · `CONCEPTUAL_ARCHITECTURE.md` · `MVP_LOCK.md` · `EXPERIENCE_BLUEPRINT.md`

---

## Prefácio

Este documento **não** descreve personas fictícias nem hipóteses de mercado.

Descreve **um usuário real** que hoje conduz toda sua evolução física no Notion — com disciplina, profundidade e fricção. O processo funciona. O registro é rico. A análise é consciente. **O problema não é falta de método — é custo operacional de manter o método.**

Nosso SaaS não substitui a inteligência desse usuário. **Automatiza o trabalho braçal e amplifica o que ele já faz bem.**

```
Notion hoje:     Controle total + esforço alto + conexões manuais
Produto amanhã:  Mesma profundidade + esforço mínimo + conexões automáticas
```

---

## Índice

1. [Engenharia reversa por informação](#1-engenharia-reversa-por-informação)
2. [Grandes jornadas](#2-grandes-jornadas)
3. [Timeline completa da semana](#3-timeline-completa-da-semana)
4. [Dores → Soluções](#4-dores--soluções)
5. [O que jamais pode ser perdido](#5-o-que-jamais-pode-ser-perdido)
6. [O que jamais deve continuar manual](#6-o-que-jamais-deve-continuar-manual)
7. [Momentos mágicos](#7-momentos-mágicos)
8. [Matriz: Hoje → Automático → Ganhos](#8-matriz-hoje--automático--ganhos)

---

# 1. Engenharia reversa por informação

Para cada dado que o usuário registra no Notion hoje, respondemos oito perguntas. Agrupamos itens **fortemente acoplados** quando a lógica é idêntica, mantendo cobertura total da lista original.

---

## 1.1 Planejamento da semana

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Ancorar intenção antes da execução. Saber o que "deveria" acontecer para comparar com o que aconteceu. |
| 2 | **Decisão posterior?** | Quantos treinos, quais dias, volume de cardio, metas diárias, prioridades da semana. |
| 3 | **Dor manual?** | Repetir estrutura toda semana; copiar template; decidir do zero quando cansado; plano desconectado do que a fase exige. |
| 4 | **Como o SaaS reduz?** | Plano semanal gerado a partir de objetivo + fase + histórico. Usuário confirma ou ajusta — não reconstrói. |
| 5 | **Menos esforço?** | Check-in de domingo: "Esta semana: 4 treinos, cardio 2×, meta 2.400 kcal. Ajustar?" — 1 confirmação. |
| 6 | **IA enriquece?** | Sugere distribuição baseada em aderência passada ("Você rende mais treinando seg/qua/sex"). |
| 7 | **Conexões?** | Objetivo da fase → calorias alvo → checklist diário → treinos → resumo semanal. |
| 8 | **Natureza do dado** | **Semi-automático** — sistema propõe, usuário confirma. Obrigatório no início de cada semana (1 ação). |

---

## 1.2 Objetivo da fase (cutting, bulking, manutenção)

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Toda interpretação depende da fase. Peso subindo em bulking = ok; em cutting = alerta. |
| 2 | **Decisão posterior?** | Calorias alvo, expectativa de peso, intensidade de treino, tolerância a deslizes, duração da fase. |
| 3 | **Dor manual?** | Relembro a fase em cada entrada; risco de inconsistência entre páginas; transição de fase é evento grande no Notion. |
| 4 | **Como o SaaS reduz?** | Fase ativa é estado global — filtra tudo automaticamente. |
| 5 | **Menos esforço?** | Declarado 1× no onboarding ou na transição. Depois, sistema lembra. |
| 6 | **IA enriquece?** | Propõe transição ("8 semanas de bulking, +3,2 kg — considerar mini-cut ou manutenção?"). |
| 7 | **Conexões?** | Calorias, macros, interpretação de peso, feedback semanal, progressão de carga. |
| 8 | **Natureza do dado** | **Obrigatório** na configuração; **automático** na aplicação diária. |

---

## 1.3 Calorias alvo

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Norte nutricional da fase. Sem alvo, registro de calorias vira número solto. |
| 2 | **Decisão posterior?** | Comer mais/menos hoje; ajustar após deslize; recalcular após mudança de peso. |
| 3 | **Dor manual?** | Calcular TDEE manualmente; atualizar quando peso muda; desalinhamento com treino do dia. |
| 4 | **Como o SaaS reduz?** | Calculada a partir de peso + objetivo + fase + atividade. Atualiza quando peso muda. |
| 5 | **Menos esforço?** | Zero input diário — sempre visível como referência no dia. |
| 6 | **IA enriquece?** | Ajuste fino por aderência e resultado ("Déficit atual não está gerando perda — reduzir 150 kcal?"). |
| 7 | **Conexões?** | Macros diários, deslizes, comportamento alimentar, fase, treino (dia de pernas → carbs). |
| 8 | **Natureza do dado** | **Automático** (calculado) + **confirmável** na transição de fase. |

---

## 1.4 Checklist diário

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Visão unificada do dia: treinou? comeu? dormiu? cardio? Área de controle rápido. |
| 2 | **Decisão posterior?** | O que falta fazer hoje; se o dia foi "completo"; se compensa algo amanhã. |
| 3 | **Dor manual?** | Marcar item a item; checklist genérico não reflete o plano; duplicação com outras páginas. |
| 4 | **Como o SaaS reduz?** | "Seu Dia" **é** o checklist vivo — preenchido por registros, não por ticks manuais. |
| 5 | **Menos esforço?** | Checklist se auto-completa quando usuário registra treino, refeição, sono. |
| 6 | **IA enriquece?** | Prioriza 2–3 itens pendentes relevantes ("Falta proteína e registro de sono"). |
| 7 | **Conexões?** | Todas as dimensões do dia alimentam o checklist. |
| 8 | **Natureza do dado** | **Inferido** a partir de eventos — nunca checklist manual duplicado. |

---

## 1.5 Sono

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Recuperação é variável #1 de performance. Correlaciona com treino, humor, fome. |
| 2 | **Decisão posterior?** | Treinar pesado ou leve; ajustar cafeína; culpar ou não o mau desempenho. |
| 3 | **Dor manual?** | Esquecer de registrar; estimar horas; sem correlação automática com treino. |
| 4 | **Como o SaaS reduz?** | Registro ≤15s; futuro: wearable importa automaticamente. |
| 5 | **Menos esforço?** | Slider horas + qualidade 3 níveis. Manhã seguinte: "Como dormiu?" |
| 6 | **IA enriquece?** | "3 noites <6h → performance caiu 12% nas últimas 4 vezes." |
| 7 | **Conexões?** | Treino, progressão de carga, comportamento alimentar, resumo semanal. |
| 8 | **Natureza do dado** | **Opcional** diário; **aprendido** em correlações ao longo do tempo. MVP: manual. |

---

## 1.6 Horários das refeições

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Timing afeta energia no treino, sono, fome noturna, aderência à dieta. |
| 2 | **Decisão posterior?** | Antecipar jantar; ajustar pré-treino; identificar padrão de fome. |
| 3 | **Dor manual?** | Registrar horário + conteúdo = duplo trabalho; raramente analisado depois. |
| 4 | **Como o SaaS reduz?** | Timestamp automático no registro de refeição — zero campo extra. |
| 5 | **Menos esforço?** | Hora capturada no momento do registro. |
| 6 | **IA enriquece?** | "Refeições após 21h correlacionam com sono ruim" (pós 30+ dias). |
| 7 | **Conexões?** | Sono, treino (pré/pós), comportamento alimentar, calorias. |
| 8 | **Natureza do dado** | **Automático** (timestamp do evento). |

---

## 1.7 Cardio

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Complemento ao treino de força; impacto em déficit calórico; NEAT controlado. |
| 2 | **Decisão posterior?** | Manter, aumentar ou reduzir volume; compensar ou não calorias. |
| 3 | **Dor manual?** | Página separada ou linha no checklist; fácil esquecer; sem link com calorias. |
| 4 | **Como o SaaS reduz?** | Evento `cardio.completed` — duração + intensidade em ≤20s. |
| 5 | **Menos esforço?** | Preset: "30 min caminhada" / "20 min bike" — 2 toques. |
| 6 | **IA enriquece?** | Ajusta recomendação em cutting ("Cardio 3×/sem associado a maior perda na sua fase"). |
| 7 | **Conexões?** | Calorias alvo, checklist, nível de atividade, resumo semanal. |
| 8 | **Natureza do dado** | **Opcional** — MVP pode ser registro simples; **V1** integrado ao plano semanal. |

---

## 1.8 Treino realizado

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Prova de execução; base de aderência; gatilho de progressão. |
| 2 | **Decisão posterior?** | Manter plano; progredir; deload; remarcar. |
| 3 | **Dor manual?** | Marcar "feito" no checklist E detalhar exercícios em outra seção. |
| 4 | **Como o SaaS reduz?** | Concluir sessão = treino realizado + detalhes opcionais num fluxo. |
| 5 | **Menos esforço?** | "Concluir treino" — 1 toque. Detalhes expandíveis. |
| 6 | **IA enriquece?** | Detecta padrão de aderência por dia da semana. |
| 7 | **Conexões?** | Progressão, checklist, resumo semanal, calorias (dia de treino). |
| 8 | **Natureza do dado** | **Obrigatório** para valor do loop; registro mínimo = **semi-automático**. |

---

## 1.9 Progressão de carga

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Evolução de força = proxy de hipertrofia e progresso real. |
| 2 | **Decisão posterior?** | Aumentar carga; manter; reduzir; trocar exercício. |
| 3 | **Dor manual?** | Comparar manualmente com semana anterior; calcular se progrediu; Notion não alerta PR. |
| 4 | **Como o SaaS reduz?** | Sistema compara automaticamente com sessão anterior. |
| 5 | **Menos esforço?** | Usuário registra carga atual; sistema calcula delta e PR. |
| 6 | **IA enriquece?** | "Supino estagnado 3 semanas — deload ou variante?" |
| 7 | **Conexões?** | Exercícios/séries/reps/cargas, fase, sono, resumo semanal. |
| 8 | **Natureza do dado** | **Inferido** a partir de cargas registradas; **automático** na análise. |

---

## 1.10 Nível de atividade

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Ajustar calorias (TDEE); explicar fome; contextualizar NEAT. |
| 2 | **Decisão posterior?** | Comer mais em dia muito ativo; reduzir em dia sedentário. |
| 3 | **Dor manual?** | Subjetivo e fácil de exagerar/minimizar; desconectado de cardio + passos. |
| 4 | **Como o SaaS reduz?** | Inferido de treino + cardio + (futuro) passos. |
| 5 | **Menos esforço?** | Pergunta opcional 1×/dia: "Como foi seu dia?" (sedentário / normal / ativo). |
| 6 | **IA enriquece?** | Agrega eventos — não pergunta se dados existem. |
| 7 | **Conexões?** | Calorias alvo, comportamento alimentar, resumo semanal. |
| 8 | **Natureza do dado** | **Inferido** > manual. **Opcional** subjetivo se inferência insuficiente. |

---

## 1.11 Deslizes alimentares

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Honestidade consigo; padrão de gatilhos; evitar efeito "já estraguei, desisto". |
| 2 | **Decisão posterior?** | Compensar ou seguir em frente; identificar gatilho; ajustar ambiente. |
| 3 | **Dor manual?** | Vergonha ao escrever; sem feedback construtivo; vira lista de "falhas". |
| 4 | **Como o SaaS reduz?** | Campo neutro: "Algo fora do plano hoje?" — sem julgamento. |
| 5 | **Menos esforço?** | 1 toque: sim/não + tag opcional (stress, social, fome). |
| 6 | **IA enriquece?** | "Deslizes às sextas após treino de pernas — padrão detectado." |
| 7 | **Conexões?** | Comportamento alimentar, calorias, sono, resumo semanal. |
| 8 | **Natureza do dado** | **Opcional**; **aprendido** em padrões — nunca obrigatório. |

---

## 1.12 Comportamento alimentar

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Relação emocional com comida; fome real vs. ansiedade; aderência sustentável. |
| 2 | **Decisão posterior?** | Ajustar déficit se fome crônica; atacar gatilho emocional; flexibilizar ou firmar. |
| 3 | **Dor manual?** | Texto livre longo; difícil analisar tendência; mistura com deslizes. |
| 4 | **Como o SaaS reduz?** | Escala simples no check-in: fome, saciedade, satisfação (1–5). |
| 5 | **Menos esforço?** | 3 sliders no check-in semanal — 15 segundos. |
| 6 | **IA enriquece?** | Correlaciona fome alta + déficit agressivo + sono ruim. |
| 7 | **Conexões?** | Deslizes, macros, fase, sono, feedback pessoal. |
| 8 | **Natureza do dado** | **Opcional**; **aprendido** ao longo do tempo. |

---

## 1.13 Calorias, proteínas, carboidratos, gorduras (macros)

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Aderência nutricional; garantir proteína; controlar energia na fase. |
| 2 | **Decisão posterior?** | Comer mais proteína no jantar; compensar amanhã; ajustar meta. |
| 3 | **Dor manual?** | **Maior dor de todo o fluxo.** Buscar alimento, pesar, somar, repetir 4–5×/dia. 15–30 min/dia. |
| 4 | **Como o SaaS reduz?** | Registro por refeição com presets; meta do dia sempre visível; proteína como north star. |
| 5 | **Menos esforço?** | "Almoço médio — ~40g proteína, ~600 kcal" — ≤20s. Repetir última refeição similar. |
| 6 | **IA enriquece?** | Estima macros de refeições recorrentes; aprende padrões ("seu almoço usual ≈ 45g P"). |
| 7 | **Conexões?** | Calorias alvo, treino, deslizes, comportamento, resumo semanal, fase. |
| 8 | **Natureza do dado** | **Opcional** granularidade; **obrigatório** mínimo = 1 registro/dia ou meta visível. Proteína > carbs/gordura no MVP. |

---

## 1.14 Exercícios, séries, repetições, cargas

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Histórico de treino; progressão; prova de volume; substituição informada. |
| 2 | **Decisão posterior?** | Progressão de carga; volume adequado; deload; trocar exercício. |
| 3 | **Dor manual?** | **Segunda maior dor.** Cada série em linha separada no Notion; copiar treino anterior; calcular volume. |
| 4 | **Como o SaaS reduz?** | Treino prescrito pré-preenchido; usuário confirma ou edita; "feito como prescrito" = 1 toque. |
| 5 | **Menos esforço?** | Default = plano executado. Edição só onde mudou. |
| 6 | **IA enriquece?** | PR automático; estagnação detectada; sugere progressão ou deload. |
| 7 | **Conexões?** | Progressão, treino realizado, sono, resumo, fase. |
| 8 | **Natureza do dado** | **Semi-automático** — prescrito pelo plano; **opcional** editar; **inferido** progressão. |

---

## 1.15 Observações

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Contexto qualitativo: dor, energia, técnica, humor, imprevistos. |
| 2 | **Decisão posterior?** | Ajustar exercício; descansar; investigar padrão. |
| 3 | **Dor manual?** | Texto livre vira cemitério de notas — nunca relido; difícil buscar. |
| 4 | **Como o SaaS reduz?** | Tags rápidas + nota opcional; notas vinculadas ao evento (treino/refeição). |
| 5 | **Menos esforço?** | Tags: "dor", "cansado", "PR", "improvisado" — 0 texto se não quiser. |
| 6 | **IA enriquece?** | Extrai padrão de notas recorrentes ("ombro" mencionado 4× → alerta). |
| 7 | **Conexões?** | Treino, progressão, feedback pessoal, resumo semanal. |
| 8 | **Natureza do dado** | **Opcional** sempre; nunca bloquear fluxo por falta de nota. |

---

## 1.16 Resumo semanal

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Fechar ciclo; ver forest, não árvores; preparar próxima semana. |
| 2 | **Decisão posterior?** | Manter plano; ajustar calorias; mudar split; deload. |
| 3 | **Dor manual?** | **Terceira maior dor.** Revisar 7 dias de páginas; escrever resumo do zero; 30–45 min domingo. |
| 4 | **Como o SaaS reduz?** | Resumo **gerado** — usuário valida e complementa. |
| 5 | **Menos esforço?** | Check-in domingo: sistema apresenta resumo pronto; 3 perguntas; 90s. |
| 6 | **IA enriquece?** | Narrativa automática: "4/4 treinos, proteína média 152g, peso +0,2kg, sono médio 6,8h." |
| 7 | **Conexões?** | Tudo — consome todos os eventos da semana. |
| 8 | **Natureza do dado** | **Automático** (gerado) + **confirmável** (usuário). |

---

## 1.17 Feedback pessoal

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Auto-reflexão; conectar mente e corpo; lembrar como se sentiu na fase. |
| 2 | **Decisão posterior?** | Continuar fase; ajustar expectativa; buscar ajuda. |
| 3 | **Dor manual?** | Escrever parágrafo longo que nunca relê; mistura com resumo. |
| 4 | **Como o SaaS reduz?** | Parte do check-in: "Como você se sentiu esta semana?" — escala + opcional. |
| 5 | **Menos esforço?** | 1 escala + 1 frase opcional. |
| 6 | **IA enriquece?** | Cruza feedback subjetivo com objetivo ("Você reportou energia baixa — déficit + sono curto"). |
| 7 | **Conexões?** | Comportamento alimentar, resumo, adaptação de plano. |
| 8 | **Natureza do dado** | **Opcional**; enriquece adaptação quando presente. |

---

## 1.18 Fotos do shape

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Evolução visual que balança não captura; motivação; comparação temporal. |
| 2 | **Decisão posterior?** | Manter fase; ajustar meta; validar que cutting está funcionando. |
| 3 | **Dor manual?** | Organizar pasta; comparar lado a lado manualmente; inconsistência de luz/pose. |
| 4 | **Como o SaaS reduz?** | Upload com data; comparação automática 2–4 semanas; guia de pose. |
| 5 | **Menos esforço?** | 1 foto/semana ou quinzenal; lembrete no check-in. |
| 6 | **IA enriquece?** | (Futuro) Análise de composição — MVP: timeline visual simples. |
| 7 | **Conexões?** | Evolução corporal, fase, resumo semanal. |
| 8 | **Natureza do dado** | **Opcional**; **V2** no roadmap — não MVP, mas **nunca perder** a capacidade. |

---

## 1.19 Evolução corporal

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | **Por que registra?** | Tendência de peso/medidas; validar fase; ajustar calorias. |
| 2 | **Decisão posterior?** | Aumentar/reduzir calorias; manter; transicionar fase. |
| 3 | **Dor manual?** | Peso diário gera ansiedade; gráfico manual no Notion; interpretar sem contexto de fase. |
| 4 | **Como o SaaS reduz?** | Tendência semanal suavizada; interpretação filtrada por fase. |
| 5 | **Menos esforço?** | Peso 1–2×/semana; sistema calcula tendência. |
| 6 | **IA enriquece?** | "+0,3kg/sem em bulking — ritmo adequado" vs. alerta em cutting. |
| 7 | **Conexões?** | Fase, calorias alvo, fotos, resumo, macros. |
| 8 | **Natureza do dado** | **Opcional** peso; **automático** tendência; **inferido** interpretação. |

---

# 2. Grandes jornadas

O fluxo Notion do usuário real se organiza em **7 jornadas cíclicas**. Cada jornada tem propósito, dados que nascem nela, e o que o produto deve fazer diferente.

```
    ┌─────────────┐
    │ PLANEJAMENTO│◄────────────────────────────────────┐
    └──────┬──────┘                                      │
           ▼                                             │
    ┌─────────────┐                                      │
    │  EXECUÇÃO   │                                      │
    └──────┬──────┘                                      │
           ▼                                             │
    ┌─────────────┐                                      │
    │  REGISTRO   │                                      │
    └──────┬──────┘                                      │
           ▼                                             │
    ┌─────────────┐                                      │
    │  ANÁLISE    │                                      │
    └──────┬──────┘                                      │
           ▼                                             │
    ┌─────────────┐                                      │
    │  ADAPTAÇÃO  │                                      │
    └──────┬──────┘                                      │
           ▼                                             │
    ┌─────────────┐                                      │
    │REVISÃO SEM. │                                      │
    └──────┬──────┘                                      │
           ▼                                             │
    ┌─────────────┐                                      │
    │ NOVA SEMANA │──────────────────────────────────────┘
    └─────────────┘
```

---

## Jornada 1: Planejamento

**Quando:** Domingo (ou início de semana).  
**Duração manual hoje:** 20–40 minutos.

**O que o usuário faz no Notion:**
- Define treinos da semana (dias, grupos musculares)
- Revisa objetivo da fase e calorias alvo
- Monta checklist template do dia
- Planeja cardio
- Copia estrutura da semana anterior e ajusta

**Estado mental:** Estratégico, motivado, quer clareza.

**Dor central:** Reconstruir o que o sistema deveria lembrar.

**Produto:**
- Apresenta plano da semana **pré-montado** baseado em fase + histórico
- Usuário confirma ou ajusta em ≤3 minutos
- Calorias alvo e objetivo visíveis — não re-digitados
- Checklist **não é criado** — nasce do plano

**Dados que nascem:** Plano semanal confirmado, metas da semana.

---

## Jornada 2: Execução

**Quando:** Segunda a sábado, ao vivo.  
**Duração:** Distribuída no dia.

**O que o usuário faz:**
- Treina conforme plano (ou adapta)
- Come conforme meta
- Faz cardio se planejado
- Tenta dormir no horário

**Estado mental:** Operacional — pouca bandwidth para registro.

**Dor central:** Execução e registro competem por atenção. Na academia, não registra. À noite, esquece.

**Produto:**
- Plano do dia visível antes da ação
- Registro **pós-ação** em ≤60s — nunca exige registro para executar
- Treino guiado substitui planilha mental
- Presets nutricionais para registrar entre mordidas

**Dados que nascem:** Eventos de execução (treino, refeição, cardio, sono).

---

## Jornada 3: Registro

**Quando:** Imediatamente após ação — ou catch-up noturno.  
**Duração manual hoje:** 15–45 min/dia (maior custo total).

**O que o usuário faz no Notion:**
- Preenche checklist
- Detalha exercícios (séries, reps, carga)
- Soma macros refeição a refeição
- Anota observações, deslizes, horários
- Registra sono

**Estado mental:** Cansado, quer terminar logo, ou perfeccionista demais.

**Dor central:** Duplicação, campos demais, tudo manual.

**Produto:**
- Evento único alimenta múltiplas dimensões (registrar treino → checklist + progressão + aderência)
- Defaults inteligentes — "feito como prescrito"
- Timestamp automático em refeições
- Tags > parágrafos

**Dados que nascem:** Eventos enriquecidos na timeline.

---

## Jornada 4: Análise

**Quando:** Durante a semana (micro) e domingo (macro).  
**Duração manual hoje:** Micro: implícita; Macro: 30–45 min.

**O que o usuário faz:**
- Compara peso com semana passada
- Verifica se progrediu carga
- Calcula média de proteína
- Relê observações tentando achar padrão

**Estado mental:** Analítico — quer entender, não só registrar.

**Dor central:** Dados existem, insight não. Análise manual é trabalhosa e incompleta.

**Produto:**
- Progresso como tendência — "proteína média 152g", "supino +5kg em 4 semanas"
- Correlações automáticas pós-D14 (sono → performance)
- Interpretação filtrada por fase ("peso +0,3kg ok em bulking")

**Dados que nascem:** Insights, tendências, flags.

---

## Jornada 5: Adaptação

**Quando:** Quando algo desvia — ou no check-in semanal.  
**Duração manual hoje:** Ad hoc, frequentemente postergada.

**O que o usuário faz:**
- Remarca treino mentalmente
- Decide "compensar" ou "seguir em frente" após deslize
- Ajusta calorias no Notion manualmente
- Reescreve plano da semana

**Estado mental:** Pragmático ou culpado — depende do desvio.

**Dor central:** Adaptação é reativa, tardia, emocionalmente carregada.

**Produto:**
- Detecção de desvio → sugestão neutra ("Treino não feito — remarcar?")
- Deslize registrado → "Seguimos em frente" — sem compensação punitiva
- Ajuste de calorias proposto com razão
- Remarcação automática — nunca "atrasado"

**Dados que nascem:** Decisões, plano ajustado, eventos de adaptação.

---

## Jornada 6: Revisão semanal

**Quando:** Domingo.  
**Duração manual hoje:** 30–60 minutos.

**O que o usuário faz:**
- Escreve resumo semanal
- Calcula aderência
- Tira foto (quinzenal)
- Registra peso
- Feedback pessoal
- Avalia se fase continua

**Estado mental:** Reflexivo — fecha ciclo, projeta próximo.

**Dor central:** Resumo do zero quando dados já existem. Domingo vira "dia de admin".

**Produto:**
- Resumo **pré-gerado**
- Check-in 90s: validar + 3 perguntas + feedback pessoal opcional
- Foto e peso convidados, não obrigatórios
- Aderência calculada automaticamente

**Dados que nascem:** Resumo confirmado, feedback, marcos, foto.

---

## Jornada 7: Nova semana

**Quando:** Pós revisão → volta à Jornada 1.

**O que o usuário faz hoje:** Copia template, ajusta, recomeça.

**Produto:** Plano da semana seguinte já reflete adaptações do check-in. Loop fechado. Zero copy-paste.

**Transição:** "Semana encerrada. Plano da próxima semana pronto." → Confirmar → Segunda limpa.

---

# 3. Timeline completa da semana

## Domingo — Revisão + Planejamento

| Horário | O que acontece | Informações que surgem | Decisões | Oportunidade anti-atrito |
|---------|----------------|------------------------|----------|--------------------------|
| Manhã | Acorda, pesagem opcional | Peso | Registrar ou pular | 1 toque; tendência, não número isolado |
| 10h–12h | **Check-in semanal** | Resumo auto-gerado | Manter/ajustar plano, calorias, fase | Resumo pronto — usuário valida, não escreve |
| 12h | Feedback pessoal + foto opcional | Satisfação, shape | Continuar fase? | Escala + 1 frase; foto guiada |
| 14h | **Planejamento semana** | Plano 7 dias | Confirmar treinos, cardio | Plano pré-montado — 1 confirmação |
| Noite | Prepara semana mentalmente | — | Horário treinos | Notificação opt-in segunda cedo |

**Tempo manual hoje:** 45–90 min → **Meta produto:** ≤10 min.

---

## Segunda — Início operacional

| Horário | O que acontece | Informações | Decisões | Anti-atrito |
|---------|----------------|-------------|----------|-------------|
| 7h | Acorda, registra sono | Horas, qualidade | Treino pesado ou leve? | Slider 15s; sugestão se sono ruim |
| 8h | Café | Refeição 1 | — | Preset café padrão — 1 toque |
| 12h | Almoço | Refeição 2 | — | Repetir almoço usual |
| 18h | **Treino** | Exercícios, cargas, RPE | Progressão? | Plano pré-preenchido; concluir = 1 toque |
| 20h | Jantar | Refeição 3 | Bater proteína? | Barra macro visível: "faltam 40g P" |
| 22h | Checklist catch-up | Pendências | Registrar o que faltou? | Home mostra só o pendente — não lista 10 itens |

**Decisões do dia:** 1 significativa (treino). Resto = execução.

---

## Terça — Dia similar ou descanso

| Horário | O que acontece | Informações | Decisões | Anti-atrito |
|---------|----------------|-------------|----------|-------------|
| — | Descanso OU treino | Aderência 2/4 ou 2/3 | — | Home: "Dia de recuperação" — checklist reduzido |
| — | Refeições | Macros acumulados | — | Menos pressão em dia off |
| Noite | Sono | Qualidade | — | Lembrete suave, dismissable |

---

## Quarta — Meio da semana

| Horário | O que acontece | Informações | Decisões | Anti-atrito |
|---------|----------------|-------------|----------|-------------|
| — | Treino | Progressão vs. sem. passada | Aumentar carga? | PR detectado automaticamente |
| — | Possível deslize | Tag deslize | Compensar? | "Seguimos em frente" — 1 toque |
| Noite | Micro-reflexão | Energia | — | Opcional: "Como foi o dia?" 1 escala |

**Oportunidade:** Insight mid-week se padrão emergir ("Proteína baixa 3 dias — faltam 2 dias para meta semanal").

---

## Quinta — Push ou fadiga

| Horário | O que acontece | Informações | Decisões | Anti-atrito |
|---------|----------------|-------------|----------|-------------|
| — | Treino | RPE, performance | Deload? | Comparativo automático com sem. anterior |
| — | Cardio opcional | Duração | — | Preset 20 min |
| — | Sono acumulado | Média 3 noites | Intensidade sexta | Alerta só se limiar — não alarme |

---

## Sexta — Desafio clássico (deslize + social)

| Horário | O que acontece | Informações | Decisões | Anti-atrito |
|---------|----------------|-------------|----------|-------------|
| — | Treino final da semana | Aderência quase fechada | — | "1 treino para meta semanal" |
| Noite | Social / deslize provável | Deslize tag | Compensar sábado? | Registro neutro; zero culpa |
| — | Comportamento alimentar | Fome, satisfação | — | Tag rápida, não parágrafo |

**Oportunidade:** Padrão "sexta" detectado ao longo de semanas → insight no check-in.

---

## Sábado — Flexível + catch-up

| Horário | O que acontece | Informações | Decisões | Anti-atrito |
|---------|----------------|-------------|----------|-------------|
| Manhã | Cardio ou descanso | NEAT | — | Opcional |
| — | Refeições flexíveis | Macros semanais | — | Visão semanal > perfeição diária |
| Noite | Preparação domingo | — | — | "Check-in amanhã — 2 min" lembrete opt-in |

---

## Resumo temporal de informações

```
Dom:  Peso, resumo, feedback, foto, plano semana
Seg–Sáb:  Sono, refeições, treino, cardio, deslize, observações
Contínuo:  Checklist inferido, macros acumulados, aderência, progressão
Dom:  Fecha ciclo → nova semana
```

---

# 4. Dores → Soluções

| # | Dor do fluxo Notion | Solução de produto |
|---|---------------------|-------------------|
| D1 | Copiar template toda semana | Plano semanal auto-gerado + confirmação |
| D2 | 15–30 min/dia somando macros | Registro por refeição com presets (~20s) |
| D3 | Cada série registrada manualmente | Treino prescrito + "feito como prescrito" |
| D4 | Checklist duplica registro | Checklist inferido de eventos |
| D5 | Resumo semanal escrito do zero | Resumo auto-gerado no check-in |
| D6 | Comparar carga com semana anterior manualmente | Progressão e PR automáticos |
| D7 | Interpretar peso sem contexto de fase | Tendência + interpretação por fase |
| D8 | Horário refeição registrado separadamente | Timestamp automático no evento |
| D9 | Calorias alvo recalculadas à mão | Meta auto-calculada; ajuste proposto |
| D10 | Observações viram cemitério de texto | Tags + nota opcional vinculada ao evento |
| D11 | Deslize vira lista de culpa | Campo neutro + "seguimos em frente" |
| D12 | Correlações (sono↔treino) manuais | Insight automático pós-14 dias |
| D13 | Fotos desorganizadas | Timeline visual com comparação 2–4 sem |
| D14 | Domingo = 1h de admin | Check-in ≤10 min total |
| D15 | Plano desconectado de nutrição | Seu Dia integra treino + macro + hábito |
| D16 | Esquecer de registrar na academia | Conclusão pós-treino; registro retroativo |
| D17 | Múltiplas páginas Notion | Timeline única — tudo conectado |
| D18 | Transição de fase é evento caótico | Fluxo guiado de transição com explicação |
| D19 | Nível atividade subjetivo inconsistente | Inferido de treino + cardio |
| D20 | Feedback pessoal nunca relido | Integrado ao check-in; cruzado com dados |
| D21 | Comportamento alimentar difícil de analisar | Escala 1–5 no check-in |
| D22 | Cardio em página separada | Evento cardio no mesmo fluxo |
| D23 | Progressão estagnada passa despercebida | Alerta suave + sugestão |
| D24 | Retomar após semana ruim é emocionalmente pesado | Recuperação graciosa — remarcar, não punir |
| D25 | Duplicar objetivo/fase em cada entrada | Estado global — declarar 1×, aplicar sempre |
| D26 | Gráficos manuais no Notion | Tendências em linguagem humana |
| D27 | Decidir treino do dia abrindo várias páginas | Home responde em <10s |
| D28 | Proteína calculada mentalmente à noite | Barra "faltam Xg" visível o dia todo |
| D29 | Não saber se semana foi boa ou ruim | Aderência % + resumo narrativo |
| D30 | Perder histórico ao mudar template | Timeline append-only — nada apagado |

---

# 5. O que jamais pode ser perdido

Funcionalidades do Notion que **obrigatoriamente** existem no SaaS — mesmo em forma diferente.

| # | Capacidade Notion | Forma no SaaS | Fase |
|---|-------------------|---------------|------|
| 1 | Planejamento semanal | Plano confirmável domingo | MVP |
| 2 | Objetivo/fase ativo | Estado global do usuário | MVP |
| 3 | Calorias alvo | Meta auto-calculada visível | MVP |
| 4 | Checklist diário | Seu Dia inferido | MVP |
| 5 | Registro de sono | Hábito sono ≤15s | MVP |
| 6 | Registro de treino completo | Sessão + conclusão + detalhe opcional | MVP |
| 7 | Progressão de carga | Comparativo e PR automáticos | V1 |
| 8 | Macros (P/C/G/kcal) | Registro por refeição; proteína prioritária | MVP (P+kcal); V1 (full) |
| 9 | Exercícios/séries/reps/cargas | Treino prescrito + edição | MVP (simples); V1 (detalhado) |
| 10 | Observações | Tags + nota opcional | V1 |
| 11 | Resumo semanal | Auto-gerado + validação | MVP |
| 12 | Feedback pessoal | Check-in escala + frase | MVP |
| 13 | Deslizes alimentares | Tag neutra opcional | V1 |
| 14 | Comportamento alimentar | Escala check-in | V1 |
| 15 | Cardio | Registro simples | V1 |
| 16 | Horários refeição | Timestamp automático | MVP |
| 17 | Nível atividade | Inferido + override opcional | V1 |
| 18 | Evolução corporal (peso) | Tendência semanal | MVP |
| 19 | Fotos shape | Upload + comparação temporal | V2 |
| 20 | Histórico completo | Timeline append-only | MVP |
| 21 | Adaptação de plano | Pós check-in + desvios | MVP (básico) |
| 22 | Conexão treino ↔ nutrição | Seu Dia integrado | MVP |
| 23 | Conexão sono ↔ performance | Insight correlacionado | V1 (D14+) |
| 24 | Aderência mensurável | % treinos, dias registro | MVP |
| 25 | Transição de fase | Fluxo guiado | V1 |

**Princípio:** Se o usuário faz no Notion hoje, o produto ** absorve, automatiza ou simplifica** — nunca ignora.

---

# 6. O que jamais deve continuar manual

| # | Tarefa manual hoje | Automatização |
|---|---------------------|---------------|
| 1 | Somar macros refeição a refeição | Acumulado em tempo real por eventos |
| 2 | Copiar treino da semana anterior | Plano gerado de template + histórico |
| 3 | Calcular aderência semanal | % automático |
| 4 | Comparar carga com sessão anterior | Delta e PR automáticos |
| 5 | Escrever resumo semanal | Narrativa gerada |
| 6 | Marcar checklist item a item | Inferido de eventos |
| 7 | Calcular calorias alvo (TDEE) | Calculado de perfil + fase + peso |
| 8 | Registrar horário da refeição | Timestamp do evento |
| 9 | Interpretar peso isolado | Tendência + contexto de fase |
| 10 | Lembrar objetivo em cada análise | Filtro global automático |
| 11 | Calcular média proteína semanal | Agregação automática |
| 12 | Detectar estagnação de exercício | Alerta por regra/IA |
| 13 | Remarcar treino "atrasado" | Plano recalculado — sem conceito de atraso |
| 14 | Reescrever plano após desvio | Sugestão de adaptação |
| 15 | Organizar fotos por data | Timeline automática |
| 16 | Correlacionar sono e performance | Insight após amostra mínima |
| 17 | Atualizar meta quando peso muda | Recálculo proposto |
| 18 | Duplicar calorias alvo em cada página | Single source of truth |
| 19 | Contar treinos da semana | Contador vivo na Home |
| 20 | Decidir "o que falta hoje" | Home prioriza pendências |

**Regra:** Se o usuário faz **porque os dados existem mas não se conectam**, o produto conecta. Se faz **porque gosta de escrever reflexões**, mantém — opcional.

---

# 7. Momentos mágicos

Oportunidades onde o sistema surpreende — sem gamificação infantil.

---

## MM1 — Resumo domingo pronto

**Momento:** Usuário abre check-in domingo.  
**Magia:** "Sua semana: 4/4 treinos, proteína média 158g, peso estável, sono 6,9h. Melhor: PR supino 82,5kg."  
**Por que funciona:** Elimina 30 min de admin. Valor imediato tangível.

---

## MM2 — PR detectado sem input extra

**Momento:** Conclui treino com carga maior.  
**Magia:** "Novo recorde no supino: 82,5kg (+2,5kg)."  
**Por que funciona:** Reconhecimento que o Notion nunca deu automaticamente.

---

## MM3 — Padrão antes do usuário verbalizar

**Momento:** Semana 4+.  
**Magia:** "Notei: quando dorme <6h, seu treino cai ~10%. Quer ajustar quartas?"  
**Por que funciona:** Valor de IA explicável — conecta dados que ele registra mas não correlaciona.

---

## MM4 — Plano já ajustado na segunda

**Momento:** Retorno após semana irregular.  
**Magia:** "Semana passada: 2/4. Esta semana: 3 treinos, 40 min — retomada gradual."  
**Por que funciona:** Sistema lembra e adapta — parceiro, não planilha.

---

## MM5 — Proteína restante visível antes do jantar

**Momento:** 19h, Home.  
**Magia:** "Faltam 45g proteína hoje. Seu jantar usual cobre ~50g."  
**Por que funciona:** Integração treino↔nutrição concreta — não abstrata.

---

## MM6 — Decisão de semanas atrás lembrada

**Momento:** Usuário rejeita deload.  
**Magia:** "Ok. Semana passada você preferiu reduzir intensidade em vez de deload — aplico o mesmo?"  
**Por que funciona:** Memória do sistema = personalização real.

---

## MM7 — Transição de fase guiada

**Momento:** 8 semanas bulking completas.  
**Magia:** "Bulking: +2,8kg, força +12%. Transição gradual para cutting — 2 sem manutenção primeiro?"  
**Por que funciona:** Substituir página Notion caótica por fluxo claro.

---

## MM8 — Foto comparada automaticamente

**Momento:** Upload foto quinzenal.  
**Magia:** Lado a lado com foto de 4 semanas atrás — mesma escala, mesma pose sugerida.  
**Por que funciona:** Evolução visual que Notion exige trabalho manual.

---

## MM9 — Deslize sem julgamento, com padrão depois

**Momento:** Registra deslize sexta.  
**Magia:** Imediato: "Anotado. Seguimos." — Semana 6: "Deslizes às sextas: 4 de 6. Quer planejar?"  
**Por que funciona:** Honestidade recompensada com insight, não culpa.

---

## MM10 — Retrospectiva mensal narrativa

**Momento:** 30 dias de uso.  
**Magia:** "Em 30 dias: 14 treinos, proteína média 155g, 2 PRs, fase bulking semana 5."  
**Por que funciona:** Storytelling de evolução — Product Bible prometida, entregue.

---

**Calibragem:** Máximo 1 momento mágico por sessão. Nunca manipular — surpreender com utilidade.

---

# 8. Matriz: Hoje → Automático → Ganhos

| O usuário faz hoje (Notion) | O sistema fará automaticamente | Ganho de tempo (est.) | Ganho de inteligência |
|----------------------------|--------------------------------|----------------------|----------------------|
| Copiar template semanal | Gerar plano da semana | 25 min/sem | Distribuição otimizada por histórico |
| Definir calorias alvo | Calcular TDEE + ajuste fase | 10 min/fase | Recálculo quando peso muda |
| Marcar checklist 7×/sem | Inferir de eventos | 15 min/sem | Checklist sempre sincronizado |
| Somar macros 4–5×/dia | Acumular por eventos | **90–150 min/sem** | Médias, tendências, alertas |
| Registrar cada série | Prescrever + confirmar | **60–120 min/sem** | PR, estagnação, volume |
| Comparar cargas | Delta automático | 15 min/sem | Progressão detectada |
| Escrever resumo semanal | Gerar narrativa | **30–45 min/sem** | Insights cruzados |
| Calcular aderência | % treinos e registros | 10 min/sem | Tendência multi-semana |
| Interpretar peso | Tendência + fase | 5 min/sem | Alerta contextualizado |
| Correlacionar sono↔treino | Insight após amostra | 20 min/sem* | Padrão pessoal quantificado |
| Registrar horário refeição | Timestamp | 5 min/sem | Padrão timing vs. sono |
| Organizar fotos | Timeline visual | 10 min/quinzena | Comparação temporal |
| Remarcar treinos mentalmente | Recalcular plano | 10 min/sem | Sem "atraso" acumulado |
| Reescrever após desvio | Sugerir adaptação | 15 min/evento | Aprendizado de preferência |
| Anotar observações longas | Tags + busca | 10 min/sem | Padrão "ombro" detectado |
| Registrar deslize + culpa | Tag neutra + padrão | 5 min/sem | Gatilho identificado |
| Feedback pessoal parágrafo | Escala + cruzamento dados | 10 min/sem | Subjetivo + objetivo unidos |
| Decidir treino do dia | Home "Seu Dia" | 5 min/dia | Contexto sono+fase |
| Contar proteína restante | Barra vivo | 5 min/dia | Sugestão refeição |
| Atualizar fase manualmente | Fluxo transição guiado | 20 min/fase | Timing baseado em resultados |

**Total estimado liberado:** **4–6 horas/semana** de trabalho administrativo.

\*Correlação manual que o usuário raramente faz — ganho de inteligência > tempo.

---

## Síntese da matriz

```
┌────────────────────────────────────────────────────────────────┐
│                    ANTES (Notion)                               │
│  ~5–8 h/semana em registro, cópia, cálculo e resumo            │
│  Inteligência: 100% na cabeça do usuário                       │
│  Conexões: manuais, quando sobra energia                       │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                    DEPOIS (SaaS)                                │
│  ~30–45 min/semana em confirmações e registros mínimos         │
│  Inteligência: sistema correlaciona, usuário decide            │
│  Conexões: automáticas desde o evento                          │
└────────────────────────────────────────────────────────────────┘
```

---

## Ponte para Lovable

Ao construir interface, validar cada tela contra:

1. **Substitui qual dor?** (Seção 4)
2. **Preserva qual capacidade?** (Seção 5)
3. **Automatiza o quê?** (Seção 6)
4. **Habilita qual momento mágico?** (Seção 7)
5. **Respeita tempos máximos?** (`EXPERIENCE_BLUEPRINT.md` Seção 5)
6. **Está no MVP Lock?** — se não, marcar V1/V2

**Pergunta gate antes de qualquer campo na UI:**

> *"O usuário real digitaria isso no Notion hoje? Se sim, como eliminamos 80% do esforço?"*

---

## Controle de Versão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | Jul 2026 | Product Team | Engenharia reversa fluxo Notion real |

---

## Referências cruzadas

| Documento | Papel |
|-----------|-------|
| `PRODUCT_BIBLE.md` | Quem somos |
| `CONCEPTUAL_ARCHITECTURE.md` | Como pensamos |
| `MVP_LOCK.md` | O que construir agora |
| `EXPERIENCE_BLUEPRINT.md` | Como deve sentir |
| `REAL_USER_WORKFLOW.md` | **O que o usuário real faz hoje** |

---

*Este documento garante que nenhuma capacidade validada no Notion se perca na transição digital — e que nenhum trabalho manual sobreviva sem justificativa.*
