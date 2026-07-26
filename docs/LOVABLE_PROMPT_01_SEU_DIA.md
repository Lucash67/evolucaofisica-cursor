# Lovable Prompt #01 — Seu Dia (MVP)

> Copie o bloco **PROMPT** abaixo e cole no Lovable.  
> Pré-requisito: repo sincronizado com `docs/` e `AGENTS.md`.

---

## PROMPT (copiar a partir daqui)

```
Leia obrigatoriamente antes de codar:
- AGENTS.md
- docs/MVP_LOCK.md (Módulos B, C, D, E — apenas escopo MVP)
- docs/EXPERIENCE_BLUEPRINT.md (Seções 1, 4, 5, 8, 12)
- docs/PRODUCT_OPERATING_SYSTEM.md (Seções 2, 5, 6, 7)

---

## Objetivo deste prompt

Implementar a tela **"Seu Dia"** — hub central do app de evolução física — com os fluxos mínimos de **treino**, **nutrição** e **hábitos** integrados na mesma superfície.

Esta é a Home. 80% do uso do app acontece aqui.

NÃO é dashboard. NÃO é app de fitness genérico com gráficos e streaks.

---

## Personalidade visual

- Tom: calmo, premium-acessível, confiante — estilo Oura / Linear / Apple Health
- Densidade: respirada, focada — muito whitespace
- Cores: neutros suaves + 1 accent energético (verde-menta ou azul-petróleo). SEM neon, SEM vermelho alarmista, SEM "beast mode"
- Tipografia: sans-serif limpa, legível
- Mobile-first (375px). Desktop: centralizado, max-width 480px
- Dark mode preferencial (academia, noite) — respeitar prefers-color-scheme

---

## Navegação global (tab bar inferior — 3 abas)

1. **Seu Dia** (ativo) — ícone sol/casa
2. **Progresso** — placeholder simples ("Em breve" ou resumo semanal mínimo)
3. **Perfil** — placeholder simples (nome, objetivo, fase)

Máximo 3 abas. Sem hamburger escondendo core.

---

## Tela: Seu Dia

### Header (contexto temporal — 1 linha)
Exemplo: `Quarta · Semana 6 · Bulking`

Sempre visível. Responde "onde estou" sem o usuário pensar.

### Saudação + observação contextual (máx. 2 linhas)
Exemplo manhã:
> Bom dia, Lucas.
> Noite curta ontem — treino de pernas disponível, 45 min.

Regras:
- Máximo 1 observação contextual por tela
- Tom parceiro, nunca coach gritando
- Nunca culpa ("você falhou", "streak quebrado")

### Resumo de ontem (1 linha colapsável, opcional)
> Ontem: treino feito · 145g proteína · 7h sono

### Bloco 1 — TREINO (prioridade se houver treino hoje)

**Estado: treino planejado**
- Card destacado: "Treino de pernas · 45 min · 6 exercícios"
- Botão primário: **Iniciar treino**
- Subtexto: "2/4 treinos esta semana"

**Estado: treino concluído**
- Card com check: "Treino de pernas concluído ✓"
- "3/4 esta semana"
- Sem confete excessivo

**Estado: dia de descanso**
- Card neutro: "Dia de recuperação"
- Sem CTA de treino

**Estado: treino não feito (tarde)**
- "Treino ainda disponível (45 min)" — neutro, não vermelho
- Botões: **Iniciar** · **Remarcar** (não "atrasado")

### Bloco 2 — NUTRIÇÃO (sempre visível)

- Meta do dia: **Proteína 95 / 160g** (barra de progresso horizontal)
- Secundário menor: **Calorias ~1.420 / 2.400 kcal**
- Botão secundário: **+ Registrar refeição**

**Modal/sheet "Registrar refeição" (≤20 segundos):**
1. Tipo: Café · Almoço · Jantar · Lanche (4 botões)
2. Tamanho preset: Pequeno · Médio · Grande
   - Cada preset mostra estimativa (~30g P / ~40g P / ~50g P)
3. Confirmar → atualiza barra + toast "Registrado · 135/160g proteína"
- ZERO busca de alimentos. ZERO teclado numérico obrigatório.

### Bloco 3 — HÁBITOS (compacto)

Dois itens inline, não lista longa:

**Sono** (manhã): se não registrado → "Como dormiu?" → slider horas + Ruim/Ok/Boa
**Água**: toggle simples "Bebi água suficiente" ou 4 copos (+1 toque)

Máximo 15 segundos cada.

### Bloco 4 — PENDÊNCIAS (máx. 3 itens)

Lista curta do que falta HOJE:
- ○ Registrar jantar
- ○ Marcar sono

Itens concluídos somem. Sem badge de "5 pendentes!" alarmista.

### Footer — Próximo passo
> Próximo: registrar almoço
> Amanhã: treino de costas, 40 min

Sempre presente. Fecha o loop.

---

## Fluxo: Sessão de treino (tela N1)

Ao tocar "Iniciar treino":
- Lista de exercícios pré-preenchida (mock):
  1. Agachamento — 3×10 · 60kg
  2. Leg press — 3×12 · 120kg
  3. Cadeira extensora — 3×12
  4. Stiff — 3×10 · 50kg
  5. Panturrilha — 4×15
  6. Abdominal — 3×15

- Cada exercício: nome + séries/reps + carga (editável opcional)
- Botão fixo bottom: **Concluir treino**
- Após concluir: sheet rápido RPE 1-10 (slider, opcional — pode pular)
- Feedback: "Treino concluído. 3/4 esta semana." → volta a Seu Dia

"Feito como prescrito" = default. Edição expandível, não obrigatória.

---

## Dados mock (usar para demo)

```typescript
const mockUser = {
  name: "Lucas",
  objective: "Hipertrofia",
  phase: "Bulking",
  weekNumber: 6,
  dayOfWeek: "Quarta",
  proteinTarget: 160,
  proteinCurrent: 95,
  caloriesTarget: 2400,
  caloriesCurrent: 1420,
  workoutsThisWeek: 2,
  workoutsTarget: 4,
  todayWorkout: {
    name: "Pernas",
    duration: 45,
    exerciseCount: 6,
    status: "planned", // planned | completed | rest
  },
  yesterday: {
    workout: true,
    protein: 145,
    sleep: "7h",
  },
  sleepLastNight: { hours: 5.5, quality: "ruim" },
  habits: {
    sleepLogged: false,
    waterLogged: false,
  },
  tomorrowWorkout: { name: "Costas", duration: 40 },
};
```

Adapte copy quando `sleepLastNight.hours < 6`: observação "Noite curta — considere treino mais leve."

---

## Estados da tela (todos obrigatórios)

1. **Manhã, treino planejado, dia vazio** — estado default acima
2. **Treino concluído** — card treino com check, macro parcial
3. **Dia de descanso** — sem card treino, foco nutrição + hábitos
4. **Noite, pendências** — "Falta registrar jantar" suave
5. **Empty state dia 1** (usuário novo): "Seu plano está pronto. Primeiro treino: Peito, 45 min." — acolhedor, zero culpa

---

## O que NÃO implementar neste prompt

- Chatbot / IA conversacional
- Gráficos complexos, charts, dashboards
- Streaks com fogo 🔥 ou gamificação
- Busca de alimentos / base TACO
- Wearables, Apple Health
- Comunidade, rankings, comparativos
- Vídeos de exercícios
- Notificações push
- Onboarding completo (apenas mock user)
- Check-in semanal (prompt futuro)
- Login/auth real (mock ok)

Se tentar adicionar qualquer item acima, PARE — viola MVP_LOCK.

---

## Critérios de aceite

- [ ] Usuário entende o que fazer hoje em <10 segundos
- [ ] Treino + nutrição + hábitos na MESMA tela (integração visível)
- [ ] 1 ação primária clara por contexto
- [ ] Registrar refeição em ≤3 toques, sem teclado
- [ ] Concluir treino em ≤2 toques após sessão
- [ ] Zero linguagem punitiva
- [ ] Mobile-first, tab bar 3 itens
- [ ] Todos os 5 estados implementados
- [ ] Dados mock realistas em português (BR)

---

## Ordem de implementação sugerida

1. Layout Seu Dia com mock estático
2. Tab bar + placeholders Progresso/Perfil
3. Modal registrar refeição + atualização barra
4. Fluxo treino (lista → concluir → RPE → feedback)
5. Hábitos sono + água inline
6. Variantes de estado (concluído, descanso, noite)
7. Polish visual (espaçamento, tipografia, dark mode)

Comece pelo passo 1. Não implemente tudo de uma vez sem validar layout.
```

---

## Após colar no Lovable

1. Revise se respeitou escopo (sem features proibidas)
2. Teste no mobile preview
3. Itere com: *"Reduza densidade visual — mais whitespace, menos widgets"*
4. Próximo prompt sugerido: **#02 Check-in Semanal** ou **#03 Onboarding mínimo**

---

## Controle de versão

| Versão | Data | Escopo |
|--------|------|--------|
| 1.0 | Jul 2026 | Seu Dia + treino + refeição + hábitos |
