# Experience Blueprint — Evolução Física

> **Versão:** 1.0  
> **Status:** Referência oficial de UX — toda interface deve nascer deste documento  
> **Última atualização:** Julho 2026  
> **Referências:** `PRODUCT_BIBLE.md` · `CONCEPTUAL_ARCHITECTURE.md` · `MVP_LOCK.md`

---

## Prefácio

A Product Bible define **quem somos**.  
A Arquitetura Conceitual define **como o sistema pensa**.  
O MVP Lock define **o que construir**.  

Este documento define **como o usuário vive**.

Não descreve telas, componentes ou tecnologias. Descreve **sensações, ritmos, regras e comportamentos** que qualquer designer — humano ou ferramenta — deve respeitar ao construir a interface.

Referência de qualidade: a calma de **Oura**, a clareza de **Linear**, a profundidade progressiva de **Notion**, a confiança de **Stripe**, a elegância funcional da **Apple Health**, a fluidez de **Revolut**.

---

## Índice

1. [Filosofia da Experiência](#1-filosofia-da-experiência)
2. [Design Principles](#2-design-principles)
3. [Navigation Philosophy](#3-navigation-philosophy)
4. [Home Experience](#4-home-experience)
5. [Interaction Philosophy](#5-interaction-philosophy)
6. [Progressive Disclosure](#6-progressive-disclosure)
7. [Empty States](#7-empty-states)
8. [Feedback System](#8-feedback-system)
9. [Motion Philosophy](#9-motion-philosophy)
10. [Trust & Transparency](#10-trust--transparency)
11. [Delight Moments](#11-delight-moments)
12. [UX Anti-Patterns](#12-ux-anti-patterns)
13. [Revisão Crítica](#13-revisão-crítica)

---

# 1. Filosofia da Experiência

## Como queremos que o usuário se sinta

**No centro: calma operacional.**

O usuário deve sentir que tem um **parceiro competente** ao lado — não um personal gritando, não um médico frio, não um algoritmo misterioso. Alguém que conhece sua rotina, respeita seus limites e o ajuda a decidir o próximo passo sem drama.

Sensações-alvo durante o uso:

| Sensação | Manifestação |
|----------|--------------|
| **Clareza** | "Sei exatamente o que fazer agora." |
| **Controle** | "Eu decido; o sistema sugere." |
| **Progresso** | "Estou evoluindo, mesmo que devagar." |
| **Leveza** | "Isso não pesa na minha rotina." |
| **Confiança** | "Faz sentido o que me propõem." |
| **Presença** | "O app lembra de mim sem me vigiar." |

---

## Como queremos que ele pense ao usar o produto

> *"Isso é simples. Isso é meu. Isso funciona com a minha vida."*

O usuário **não** deve pensar:

- "Preciso configurar mais coisas antes de começar."
- "Perdi dias — estraguei tudo."
- "Não entendo esse gráfico."
- "Por que o app está me cobrando?"
- "Mais um app de fitness genérico."

O usuário **deve** pensar:

- "Abro, vejo meu dia, faço, fecho."
- "Treino e comida estão conectados — faz sentido."
- "Quebrei ontem, mas hoje continuo de onde parei."
- "Entendi por que me sugeriram isso."

---

## Como queremos que ele se sinta após fechar o aplicativo

**Satisfeito, não exausto.**

Fechou o app com a sensação de **missão cumprida** ou **próximo passo claro** — nunca com culpa por pendências, nunca com ansiedade por notificações futuras, nunca com a sensação de ter "deixado algo incompleto" de forma punitiva.

Estados pós-sessão desejados:

```
Registrou treino    → "Bom. Semana 3/4. Próximo: costas, quinta."
Registrou refeição  → "Ok, 95g de proteína. Falta o jantar."
Só consultou        → "Amanhã é pernas. Vou dormir cedo."
Check-in semanal    → "Semana irregular, mas retomei. Plano ajustado."
```

O app **não** deve viciar. Deve **liberar**.

---

## Emoções que queremos evitar

| Emoção | Por que é tóxica | Como evitamos |
|--------|------------------|---------------|
| **Culpa** | Destrói consistência de longo prazo | Recuperação graciosa, linguagem neutra |
| **Vergonha** | Corpo já é tema sensível | Zero comparação, zero ranking |
| **Ansiedade** | Paralisa ação | Uma decisão por vez, defaults inteligentes |
| **Confusão** | Abandono imediato | Hierarquia clara, linguagem humana |
| **Pressão** | Resistência e churn | Sem countdowns, sem streaks punitivos |
| **Desconfiança** | Mata retenção | Explicar recomendações, admitir incertezas |
| **Infantilização** | Usuário adulto, não criança | Sem confetes excessivos, sem mascotes |
| **FOMO** | Dark pattern emocional | Sem "outros usuários fizeram X" |
| **Overwhelm** | Saturação de dados | Progressive disclosure, essencial primeiro |

---

## Emoções que queremos provocar

| Emoção | Quando | Intensidade |
|--------|--------|-------------|
| **Alívio** | Retorno após ausência | Alta — "Bem-vindo de volta" |
| **Orgulho quieto** | Marco atingido (1 semana, 1 mês) | Média — reconhecimento sutil |
| **Curiosidade** | Insight novo revelado | Baixa — convite a explorar |
| **Determinação calma** | Início de nova fase | Média — direção clara |
| **Gratidão** | Sistema adaptou ao imprevisto | Baixa — "Entendi, ajustei" |
| **Confiança** | Recomendação explicada | Contínua — baseline |

Nunca provocamos euforia artificial. Celebramos **processo**, não highlight reel.

---

## Personalidade da experiência

Se o produto fosse uma pessoa, seria:

```
┌─────────────────────────────────────────────────────────────┐
│                    PERSONALIDADE                             │
├─────────────────────────────────────────────────────────────┤
│  Arquétipo:    O parceiro experiente e calmo                │
│  Tom:          Direto, caloroso, nunca condescendente       │
│  Ritmo:        Pausado — respira, não corre                 │
│  Humor:        Leve quando apropriado; nunca em dados sensíveis│
│  Autoridade:   Confiante sem impor                          │
│  Empatia:      Alta — reconhece imprevistos da vida         │
│  Inteligência: Visível — explica, não impõe                 │
│  Estética:     Premium-acessível — cuidado sem elitismo     │
└─────────────────────────────────────────────────────────────┘
```

### Voz do produto — exemplos

| Situação | ❌ Nunca | ✅ Sempre |
|----------|---------|----------|
| Treino não feito | "Você falhou hoje!" | "Treino de ontem ficou pendente. Remarcar?" |
| Peso subiu em cutting | "Alerta! Você engordou!" | "Peso subiu 0.5kg esta semana. Vamos revisar juntos?" |
| Sem dados suficientes | "Analisando..." (genérico) | "Ainda estou aprendendo seu padrão — faltam ~5 dias." |
| PR atingido | "INCRÍVEL!!! 🔥🔥🔥" | "Novo recorde no supino: 80kg. Seu progresso continua." |
| Retorno após 3 semanas | "Sentimos sua falta!" | "Bem-vindo de volta. O que aconteceu?" |

### Metáfora central

> **O produto é um diário inteligente da evolução física** — não um coach, não um hospital, não um jogo.

---

# 2. Design Principles

Dezoito princípios. Nenhuma tela, fluxo ou componente deve violá-los.

---

### DP1 — Uma decisão primária por tela

Cada superfície apresenta **no máximo uma ação principal** claramente dominante. Ações secundárias existem, mas nunca competem visualmente.

**Por quê:** Decisão múltipla paralisa. Fitness já exige energia — o app não pode drenar mais.

**Teste:** Olhe a tela por 3 segundos. Você sabe qual botão tocar?

---

### DP2 — Clareza antes de completude

Mostrar o essencial. Detalhes sob demanda. O usuário deve saber **o que fazer hoje** em menos de 10 segundos.

**Por quê:** Completude prematura gera dashboards. Dashboards geram abandono.

**Teste:** Usuário novo entende o dia sem scroll?

---

### DP3 — Nunca informação sem contexto

Número isolado é ruído. Tendência + referência + significado é informação.

**Por quê:** "82kg" não diz nada. "82kg — estável há 2 semanas, dentro do bulking" diz tudo.

**Teste:** Cada métrica visível tem frase de contexto adjacente?

---

### DP4 — Toda ação gera consequência visível

Registrar treino, refeição ou hábito **sempre** produz feedback imediato — nunca silêncio.

**Por quê:** Silêncio após input comunica "não funcionou" ou "não importa".

**Teste:** Após qualquer registro, algo muda na tela em <500ms?

---

### DP5 — A inteligência explica antes de recomendar

Recomendação sem razão é ordem. Ordem gera resistência.

**Por quê:** Product Bible: autonomia assistida. Usuário aceita o que entende.

**Teste:** Toda sugestão tem "por quê" acessível em 1 toque?

---

### DP6 — Menos métricas, mais clareza

Preferir **3 números significativos** a **15 números precisos**. Tendências > snapshots.

**Por quê:** Métricas excessivas satisfazem ansiedade, não geram ação.

**Teste:** Remover qualquer métrica — o usuário perde capacidade de agir?

---

### DP7 — O usuário nunca deve se sentir culpado

Linguagem, empty states, notificações e feedback de omissão são **neutros ou encorajadores**. Nunca punitivos.

**Por quê:** Culpa gera abandono. Abandono gera mais culpa. Ciclo tóxico.

**Teste:** Leia qualquer mensagem de "não fez X" em voz alta. Soa acusatório?

---

### DP8 — Recuperação graciosa é padrão, não exceção

Quebrar rotina é normal. A experiência de retomada deve ser **mais polida** que a de execução perfeita.

**Por quê:** 70% de aderência sustentada > 100% por 5 dias (Product Bible).

**Teste:** Usuário que faltou 5 dias consegue retomar em <30 segundos?

---

### DP9 — Progressive disclosure por maturidade

Complexidade revelada conforme o usuário amadurece — nunca no dia 1.

**Por quê:** Assustar iniciante = churn D1. Esconder profundidade = churn D30 por tédio.

**Teste:** Dia 1 mostra ≤30% das capacidades totais?

---

### DP10 — Defaults inteligentes, override sempre disponível

O sistema propõe; o usuário confirma ou altera. Nunca formulário em branco quando há histórico.

**Por quê:** Carga cognitiva mata registro. Defaults reduzem fricção em 80%.

**Teste:** Segunda refeição registrada é mais rápida que a primeira?

---

### DP11 — Integração visível, não declarada

Treino, nutrição e hábitos **conversam na mesma superfície** — não em abas isoladas sem conexão.

**Por quê:** Diferencial do MVP é integração percebida.

**Teste:** Usuário vê relação treino↔nutrição sem navegar para outra seção?

---

### DP12 — Previsibilidade radical

Mesma ação, mesmo lugar, mesmo resultado. Padrões repetidos em todo o produto.

**Por quê:** Previsibilidade reduz carga cognitiva. Surpresa é reservada para insights, não para navegação.

**Teste:** Usuário de 30 dias navega no escuro?

---

### DP13 — Tempo é sagrado

Cada interação tem **orçamento de tempo** definido. Ultrapassar é falha de design.

**Por quê:** App competindo com vida real. 60 segundos a mais = amanhã não abre.

**Teste:** Fluxos críticos respeitam limites da Seção 5?

---

### DP14 — Silêncio é uma escolha consciente

Nem tudo precisa de feedback. Ruído constante dilui o que importa.

**Por quê:** Oura notifica pouco, mas quando notifica, importa.

**Teste:** Cada notificação/feedback passa no filtro "usuário precisa agir agora?"

---

### DP15 — Acessibilidade não é feature — é baseline

Contraste, touch targets (44pt mínimo), suporte a screen readers, motion reduzido respeitado.

**Por quê:** Corpos diversos, capacidades diversas, ambientes diversos (academia, sol, cansaço).

**Teste:** WCAG 2.1 AA em todo fluxo crítico?

---

### DP16 — Linguagem humana, jargão zero

"Treino de pernas" — não "Lower Body Hypertrophy Session A". "Proteína" — não "MACRONUTRIENTE P".

**Por quê:** Usuário não é profissional. Jargão cria distância.

**Teste:** Texto compreensível por alguém sem literacia fitness?

---

### DP17 — Estados completos são obrigatórios

Empty, loading, error, partial success, offline — **todos** desenhados antes de considerar feature pronta.

**Por quê:** Estado vazio mal feito é a primeira impressão de 40% dos fluxos.

**Teste:** Cada superfície tem comportamento definido para os 5 estados?

---

### DP18 — Consistência de padrão sobre criatividade

Mesmo gesto = mesma função em todo o produto. Inovação na experiência, não no botão.

**Por quê:** Criatividade por tela gera produto fragmentado (anti-Linear, anti-Notion).

**Teste:** Componentes de registro seguem o mesmo ritmo visual?

---

# 3. Navigation Philosophy

## Princípio central

> **Navegação desaparece quando o fluxo está certo.**

O usuário não deve "explorar o app". Deve **cumprir seu dia** e sair. Navegação existe para suporte, não como destino.

---

## Níveis máximos

```
MÁXIMO: 2 níveis de profundidade a partir da Home

  Nível 0: Home ("Seu Dia")
  Nível 1: Ação (treino ativo, registro de refeição, check-in)
  Nível 2: Detalhe opcional (histórico, exercício expandido, ajuste de meta)

  Nível 3+: PROIBIDO no MVP
```

**Exceção:** Configurações e perfil podem ter 2 níveis adicionais — são destinos raros, não fluxo diário.

```
        Home (N0)
       /   |   \
      /    |    \
   Treino Nutri Hábito (N1)
      \    |    /
       \   |   /
      Detalhe (N2) — sempre opcional, sempre com retorno claro
```

---

## Fluxo principal (80% do tempo)

```
Abrir app → Home → Uma ação → Feedback → Fechar app
                ↑                              |
                └──────── D+1 ─────────────────┘
```

**80% das sessões** devem caber neste fluxo sem tocar em menu, abas secundárias ou configurações.

---

## Como evitar menus complexos

| Regra | Implementação conceitual |
|-------|-------------------------|
| **Máximo 4 destinos globais** | Home · Progresso · Perfil · (Configurações dentro de Perfil) |
| **Sem hamburger escondendo core** | Ações principais sempre visíveis na Home |
| **Sem drawer profundo** | Drawer = perfil + configurações, nunca treino |
| **Ações contextuais > menu global** | "Registrar refeição" aparece na Home quando relevante |
| **Tab bar mínima** | 3–4 ícones. Cada um com propósito claro e distinto. |

---

## Redução de carga cognitiva

| Técnica | Aplicação |
|---------|-----------|
| **Chunking** | Treino = blocos (aquecimento → exercícios → conclusão) |
| **Defaults** | Última refeição similar pré-preenchida |
| **Eliminação** | Remover campos opcionais do fluxo principal |
| **Reconhecimento > recordação** | Presets visuais, não memória de números |
| **Uma pergunta por vez** | Onboarding step-by-step, nunca formulário longo |
| **Ancoragem temporal** | "Hoje", "Esta semana" — nunca "Dia 47 do ciclo" |

---

## Redução de cliques

| Meta | Como |
|------|------|
| Home → ação principal | 1 toque |
| Registro de hábito | 1–2 toques |
| Registro de refeição | ≤3 toques |
| Conclusão de treino | 1 toque ("Concluir") + confirmação opcional |
| Retomada após ausência | ≤2 toques até primeira ação |

**Regra:** Cada toque a mais deve **justificar-se** com valor proporcional.

---

## Redução de escrita

| Contexto | Escrita mínima |
|----------|----------------|
| Refeição | Zero texto livre — presets + estimativas |
| Treino | Zero texto — seleção + sliders |
| Sono | Zero texto — horas + escala visual |
| Peso | Apenas número |
| Notas | Sempre opcional, nunca no fluxo principal |
| Check-in | Seleção múltipla + 1 campo aberto opcional |

**Teclado aberto = falha de design** nos fluxos diários.

---

## Previsibilidade

| Elemento | Comportamento fixo |
|----------|-------------------|
| Ação primária | Sempre mesma posição (bottom ou center) |
| Voltar | Sempre canto superior esquerdo ou gesto padrão |
| Registro concluído | Sempre feedback + retorno à Home ou próximo passo |
| Check-in semanal | Sempre domingo (ou dia escolhido no onboarding) |
| Progresso semanal | Sempre acessível no mesmo lugar |

---

# 4. Home Experience

## Papel da Home

A Home **não é dashboard**. É **centro de comando do dia**.

```
Dashboard diz:  "Aqui estão 15 métricas sobre você."
Home diz:       "Hoje: treino de pernas. Proteína: 95/160g. Dormiu 7h."
```

A Home responde **três perguntas** — nesta ordem de prioridade:

1. **O que faço agora?** (ação primária)
2. **Como estou esta semana?** (contexto mínimo)
3. **O que vem depois?** (próximo passo)

---

## O que deve responder imediatamente (<10 segundos)

| Pergunta | Resposta esperada |
|----------|-------------------|
| Tenho treino hoje? | Sim/Não + tipo + duração estimada |
| Como foi ontem? | Uma linha — "Treino feito · 140g proteína · 7h sono" |
| O que falta hoje? | Lista curta — máximo 3 itens pendentes |
| Estou no caminho? | Indicador semanal simples — não gráfico |

---

## O que NUNCA deve aparecer na Home

| Proibido | Por quê |
|----------|---------|
| Gráficos complexos | Pertencem a Progresso, não ao dia |
| Feed de conteúdo / artigos | Não somos media company |
| Comparativos com outros usuários | Tóxico, anti-Product Bible |
| Streaks com fogo/urgência | Gamificação punitiva |
| Múltiplas CTAs competindo | Viola DP1 |
| Métricas sem contexto | Viola DP3 |
| Popups de upgrade / promo | Quebra confiança |
| Chatbot flutuante | Distração, não core loop |
| Banner de "complete seu perfil" após D3 | Onboarding progressivo, não cobrança |
| Notificações empilhadas | Uma observação contextual, no máximo |

---

## Como a Home muda conforme o usuário evolui

| Maturidade | Home |
|------------|------|
| **Dia 1** | Boas-vindas + primeiro treino em destaque + "Vamos começar simples" |
| **Semana 1** | Plano do dia + progresso semanal básico |
| **Mês 1** | + observação contextual ("Você treina mais segundas") |
| **Mês 3+** | + insight ocasional ("Sono <6h afeta seu treino") |
| **Avançado** | Home estável — profundidade vive em Progresso, não polui Home |

**Regra:** Home **não cresce** indefinidamente. Ganha **camadas de inteligência**, não **camadas de UI**.

---

## Como a Home muda conforme contexto

| Contexto | Adaptação da Home |
|----------|-------------------|
| **Manhã, treino planejado** | Treino em destaque + "Bom dia" |
| **Manhã, dia de descanso** | "Dia de recuperação" + hábitos + nutrição |
| **Tarde, treino não feito** | "Treino ainda disponível (45 min)" — neutro |
| **Noite, dia completo** | Resumo do dia + "Amanhã: costas" |
| **Noite, dia incompleto** | Pendências sem urgência — "Falta registrar jantar" |
| **Check-in disponível** | Banner sutil no domingo — não modal invasivo |
| **Sono ruim detectado** | Observação: "Noite curta — treino leve sugerido" (pós-D14) |

---

## Como a Home muda após dias sem uso

| Ausência | Comportamento |
|----------|---------------|
| **1–2 dias** | Home normal — treino remarcado silenciosamente |
| **3–7 dias** | "Bom te ver." + plano simplificado + sem pendências acumuladas |
| **8–21 dias** | "Bem-vindo de volta." + pergunta empática + reintrodução |
| **22+ dias** | Fluxo de retorno dedicado → depois Home simplificada |

**Nunca:** contador de dias perdidos, streak quebrado, mensagem de culpa, treinos "atrasados" empilhados.

```
❌ "Você perdeu 5 treinos!"
✅ "Bem-vindo de volta. Vamos retomar com 2 treinos esta semana?"
```

---

# 5. Interaction Philosophy

## Princípio geral

> **Registrar deve ser mais rápido que não registrar.**

Se registrar exige mais esforço que ignorar, o usuário ignora. Se ignorar não gera punição, ele volta amanhã. Se punir, não volta.

---

## Treino

### Fluxo ideal

```
Home → Iniciar treino → Seguir exercícios → Concluir → Feedback
```

### Níveis de registro

| Nível | O que captura | Quando |
|-------|---------------|--------|
| **Mínimo** | Sessão concluída (sim/não) | Sempre disponível |
| **Padrão** | Concluído + RPE geral (1 toque) | Default pós-treino |
| **Detalhado** | Por exercício: carga/reps | Opcional, expandível |

### Tempo máximo

| Ação | Tempo |
|------|-------|
| Iniciar treino (Home → primeiro exercício) | ≤5 segundos |
| Registrar conclusão (padrão) | ≤15 segundos |
| Registrar conclusão (detalhado) | ≤60 segundos |
| Substituir exercício | ≤20 segundos |

**Justificativa:** Treino acontece com mãos ocupadas, suor, cansaço. Fluxo longo = registro pós-academia = esquecimento = dado perdido.

### Decisões de design

- **RPE como slider ou escala visual** — não teclado numérico
- **"Feito como prescrito"** = 1 toque para quem não quer detalhar
- **Pausar e retomar** — vida interrompe treinos
- **Conclusão parcial** é válida — "Fiz 3 de 5 exercícios" conta

---

## Refeição

### Fluxo ideal

```
Home → Registrar refeição → Selecionar tipo → Estimar → Feedback macro
```

### Níveis de registro

| Nível | O que captura | Tempo |
|-------|---------------|-------|
| **Rápido** | Tipo (café/almoço/jantar) + preset (P/M/G) | ≤15 segundos |
| **Estimado** | Tipo + proteína aproximada (slider) | ≤20 segundos |
| **Detalhado** | Macros completos | ≤45 segundos (fora do fluxo diário MVP) |

### Tempo máximo: **≤20 segundos** (fluxo padrão)

**Justificativa:** Nutrição tem a menor aderência histórica em apps fitness. Fricção mata. Usuário registra entre mordidas ou após refeição — atenção dividida.

### Decisões de design

- **Presets visuais** — "Almoço médio (~40g proteína)" > formulário
- **Repetir última refeição similar** — 1 toque
- **Progresso macro visível imediatamente** — "95g de 160g" pós-registro
- **Não exigir 3 refeições/dia** — 1 registro > 0 registros
- **Estimativa honesta** — faixas, não falsa precisão ("~40g", não "39.7g")

---

## Hábito

### Fluxo ideal

```
Home → Hábito (sono/água) → Input mínimo → Confirmação
```

### Sono

| Input | Método | Tempo |
|-------|--------|-------|
| Horas dormidas | Slider ou seletor | ≤10 segundos |
| Qualidade | Escala 3 pontos (ruim/ok/boa) | ≤5 segundos |
| **Total** | | **≤15 segundos** |

### Hidratação

| Input | Método | Tempo |
|-------|--------|-------|
| Sim/não "Bebi água suficiente" | 1 toque | ≤5 segundos |
| Ou copos | +1 toque por copo | ≤10 segundos |

**Justificativa:** Hábitos são o registro mais frequente e menos motivador. Deve ser **mais rápido que treino e refeição**.

---

## Peso

### Fluxo ideal

```
Progresso → Registrar peso → Número → Confirmação
```

| Ação | Tempo |
|------|-------|
| Registro completo | ≤15 segundos |

**Justificativa:** Peso é sensível emocionalmente. Fluxo longo amplifica ansiedade. Registro semanal basta — não empurrar diário.

### Decisões de design

- **Mostrar tendência, não delta diário** — "Estável há 2 semanas" > "+0.3kg hoje"
- **Opcional sempre** — nunca bloquear app por falta de peso
- **Privacidade** — peso nunca em destaque na Home

---

## Check-in semanal

### Fluxo ideal

```
Notificação/domigo → Check-in → 3 perguntas → Resumo → Ajuste (se houver)
```

| Etapa | Tempo |
|-------|-------|
| Check-in completo | ≤90 segundos |

### As 3 perguntas (conceitual)

1. **Como foi a semana?** (escala 1–5 + opcional)
2. **Conseguiu seguir o plano?** (sim / parcial / não — sem julgamento)
3. **Algo a ajustar?** (opcional, texto livre)

**Justificativa:** Check-in é reflexão, não interrogatório. 90 segundos respeita atenção. Fecha o ciclo semanal e alimenta adaptação (MVP F4).

### Pós check-in

- Resumo de aderência (% treinos, dias com registro)
- Uma observação contextual
- Ajuste proposto (se necessário) com confirmação
- **Nunca** relatório de 10 páginas

---

## Matriz de tempos

| Interação | Tempo máximo | Prioridade de otimização |
|-----------|--------------|--------------------------|
| Hábito (água) | 5s | Alta |
| Hábito (sono) | 15s | Alta |
| Refeição | 20s | Crítica |
| Peso | 15s | Média |
| Treino (conclusão) | 60s | Alta |
| Check-in semanal | 90s | Média |
| Sessão completa (abrir → agir → fechar) | 2–5 min | Crítica |

---

# 6. Progressive Disclosure

## Princípio

> **O produto amadurece com o usuário — como um bom parceiro de treino.**

Dia 1: simplicidade radical.  
Mês 3: profundidade disponível, nunca imposta.

---

## Primeiro dia

**Objetivo:** Valor em <10 minutos. Zero overwhelm.

| Mostra | Esconde |
|--------|---------|
| Home com primeiro treino | Progresso detalhado |
| 1 ação clara | Check-in semanal |
| Onboarding mínimo (≤3 min) | Hábitos além de sono |
| Confirmação pós-ação | Insights, correlações |
| "Seu plano está pronto" | Configurações avançadas |

**Tom:** Acolhedor, direto. "Vamos começar simples."

**Decisões máximas:** 3 (objetivo, frequência, primeiro treino)

---

## Primeira semana

**Objetivo:** Estabelecer ritmo. Introduzir segunda e terceira dimensão.

| Revela | Quando |
|--------|--------|
| Registro de refeição | Após 1º treino completado |
| Hidratação | Dia 3 |
| Progresso semanal básico | Dia 7 |
| Primeiro check-in | Domingo da semana 1 |

**Tom:** Encorajador. "Você completou 2 treinos esta semana."

**Não revela:** Insights, correlações, ajustes automáticos, histórico longo

---

## Primeiro mês

**Objetivo:** Profundidade disponível para quem busca. Home estável.

| Revela | Quando |
|--------|--------|
| Observações contextuais | Semana 2–3 (com dados) |
| Registro de peso (convite suave) | Semana 2 |
| Histórico de 30 dias | Sob demanda em Progresso |
| Primeira correlação (sono→treino) | Dia 14+ (MVP G4) |
| Ajuste de plano pós check-in | Check-ins 2+ |

**Tom:** Parceiro. "Notei um padrão no seu sono."

**Não revela:** Múltiplas correlações, predições, comparativos

---

## Primeiros 3 meses

**Objetivo:** Usuário avançado tem ferramentas. Iniciante recente ainda protegido.

| Revela | Condição |
|--------|----------|
| Insights recorrentes | Padrões confirmados (≥3 ocorrências) |
| Sugestão de transição de fase | Marco de fase atingido |
| Histórico completo | Acesso em Progresso |
| Preferências avançadas | Configurações, sob demanda |

**Tom:** Confiante. "Com base nos últimos 8 semanas..."

---

## Usuário avançado

**Objetivo:** Não entediar quem evoluiu. Profundidade em Progresso, Home estável.

| Disponível | Nunca na Home |
|------------|---------------|
| Histórico longo | Gráficos complexos |
| Múltiplos insights | Dashboards |
| Ajustes finos de plano | Configurações avançadas |
| Export (futuro) | Comparativos |

**Regra de ouro:** Home de usuário avançado **parece** Home de iniciante — a inteligência é nos textos, não na complexidade visual.

---

## Como evitar assustar iniciantes

| Técnica | Aplicação |
|---------|-----------|
| **Onboarding ≤3 min** | MVP Lock |
| **Feature discovery contextual** | "Quer registrar o almoço?" após treino |
| **Tooltips únicos** | Cada dica aparece 1x, dismissable |
| **Linguagem de convite** | "Quando quiser" > "Configure agora" |
| **Defaults que funcionam** | Plano utilizável sem ajuste |
| **Empty states acolhedores** | Seção 7 |

---

## Como revelar profundidade gradualmente

```
Profundidade visual:     ████░░░░░░  (estável — não cresce)
Profundidade textual:    ██░░░░░░░░ → ████████░░  (cresce)
Profundidade funcional:  █░░░░░░░░░ → ██████████  (sob demanda)
```

Profundidade **funcional** vive em Progresso e Configurações.  
Profundidade **textual** (observações mais ricas) cresce na Home.  
Profundidade **visual** permanece constante — interface não muda de forma.

---

# 7. Empty States

## Princípio absoluto

> **Empty state nunca é culpa. Sempre é convite ou informação.**

---

## Usuário acabou de entrar (zero dados)

| Superfície | Comportamento |
|------------|---------------|
| Home | "Seu plano está pronto. Primeiro treino: [tipo], [duração]." + CTA claro |
| Progresso | "Seu progresso aparecerá aqui conforme você registra." + Ilustração calma |
| Treino | Plano visível — não empty, pré-populado |
| Nutrição | Meta visível — "Registre sua primeira refeição quando quiser" |
| Hábitos | "Como você dormiu?" — convite, não cobrança |

**Tom:** Acolhedor, orientado à ação.  
**Nunca:** "Você ainda não fez nada."

---

## Não há dados suficientes (cold start)

| Contexto | Comportamento |
|----------|---------------|
| Insight | "Ainda estou aprendendo seu padrão. Faltam ~X dias." |
| Correlação | Não mostrar — silêncio > dado falso |
| Tendência | "Dados insuficientes para tendência. Continue registrando." |
| Aderência | Mostrar apenas o que existe — "1/1 treino" é válido |

**Tom:** Honesto, paciente.  
**Nunca:** Gráfico vazio. Número inventado. "Analisando..."

---

## Usuário abandonou o app

**Não há empty state de abandono visível na Home.**

Quando retorna → fluxo dedicado de retorno (Seção 4). Histórico preservado, nada apagado.

Progresso mostra: "Última atividade: há 3 semanas" — fato neutro, não "3 semanas de FALHA".

---

## Voltou após semanas

| Passo | Experiência |
|-------|-------------|
| 1 | "Bem-vindo de volta." — caloroso, breve |
| 2 | "O que aconteceu?" — opções, não texto livre obrigatório |
| 3 | Plano simplificado apresentado |
| 4 | Home normal — sem badge de "retornante" permanente |

**Tom:** Alívio, não julgamento.  
**Nunca:** "Sentimos sua falta!", streak perdido, dados apagados.

---

## Não registrou nada hoje

| Horário | Home |
|---------|------|
| Manhã | Normal — ainda há tempo |
| Tarde | Neutro — "Treino disponível" ou pendências suaves |
| Noite | "Dia quase no fim. Algo a registrar?" — 1 linha, dismissable |

**Nunca:** Notificação agressiva. Vermelho. "Você esqueceu!"

---

## Está começando novamente (reset de fase/objetivo)

| Contexto | Comportamento |
|----------|---------------|
| Novo objetivo | "Nova fase iniciada." — marco positivo |
| Reintrodução | "Vamos retomar aos poucos." — plano reduzido visível |
| Histórico | Preservado e acessível — "Seu PR continua 80kg" |

**Tom:** Recomeço como evolução, não como fracasso.  
**Nunca:** "Voltar ao zero." Apagar histórico.

---

# 8. Feedback System

## Princípio

> **Feedback informa, orienta ou reconhece — nunca pune, assusta ou manipula.**

---

## Sucesso

| Quando | Como | Intensidade |
|--------|------|-------------|
| Treino concluído | Confirmação + progresso semanal | Média |
| Refeição registrada | Macro atualizado | Baixa |
| Hábito marcado | Check sutil | Mínima |
| Check-in completo | Resumo semanal | Média |
| Peso registrado | Tendência (não delta) | Baixa |

**Padrão:** Confirmação visual breve (≤2s) + informação útil. Sem confete (exceto Delight Moments, Seção 11).

---

## Erro

| Tipo | Como |
|------|------|
| Input inválido | Inline, específico — "Peso deve ser entre 30 e 300kg" |
| Falha de conexão | "Não salvou. Tentar de novo?" — ação clara |
| Conflito de dados | "Isso difere do último registro. Confirmar?" |

**Regras:**
- Nunca modal bloqueante para erro recuperável
- Nunca culpar usuário — "Algo deu errado" > "Você digitou errado"
- Sempre oferecer caminho de correção

---

## Aviso

| Quando | Como |
|--------|------|
| Sono ruim + treino pesado | Observação na Home — "Noite curta. Treino leve sugerido." |
| Aderência baixa na semana | Check-in — "Semana irregular. Ajustamos?" |
| Peso fora do esperado | Progresso — neutro, convite a revisar |

**Intensidade:** Informativo, não alarmista. Amarelo suave, nunca vermelho pânico.

---

## Conquista

| Quando | Como |
|--------|------|
| Marco atingido | Seção 11 — Delight Moments |
| PR | Reconhecimento sutil + atualização de baseline |
| 1 semana / 1 mês | Momento dedicado — breve |

**Regra:** Conquista ≠ gamificação. Reconhecer, não recompensar com pontos.

---

## Mudança (plano ajustado)

| Quando | Como |
|--------|------|
| Treino remarcado | Silencioso — Home reflete novo plano |
| Meta ajustada pós check-in | "Ajustamos seu plano: [razão]." + confirmação |
| Fase nova | Marco claro — "Nova fase: cutting" |

**Regra:** Mudança significativa sempre explicada. Mudança menor pode ser silenciosa.

---

## Recomendação

| Elemento | Obrigatório |
|----------|-------------|
| Ação sugerida | Sim |
| Razão (1 frase) | Sim |
| Alternativa | Quando possível |
| Confirmação | Se impacto significativo |
| Dismiss | Sempre — "Agora não" |

**Tom:** Sugestão de parceiro — "Que tal...?" — não ordem.

---

## Correção (usuário override)

| Quando | Como |
|--------|------|
| Usuário rejeita recomendação | "Ok, mantemos como está." — sem insistir |
| Usuário corrige dado | Atualização silenciosa + confirmação breve |

**Regra:** Sistema nunca insiste após rejeição. Aprende silenciosamente.

---

## Quando animar

| Situação | Animação |
|----------|----------|
| Conclusão de treino | Sim — breve, satisfatória |
| Progresso macro atualizado | Sim — transição suave de número |
| Delight moment | Sim — ver Seção 9 |
| Navegação padrão | Não |
| Carregamento <1s | Não — skeleton ou nada |
| Erro | Não — clareza imediata |

---

## Quando permanecer silencioso

| Situação | Por quê |
|----------|---------|
| Dado insuficiente para insight | Honestidade > ruído |
| Treino remarcado automaticamente | Não interromper |
| Registro rotineiro (água) | Check mínimo basta |
| Usuário navegando sem agir | Não interromper |
| 2ª+ refeição do dia | Feedback mais leve que a 1ª |

---

## Quando celebrar

| Momento | Intensidade |
|---------|-------------|
| Primeiro treino | Média |
| Primeira semana completa | Média |
| PR pessoal | Média-alta |
| 1 mês de uso | Média |
| Retorno após ausência | Baixa-média — alívio, não festa |

---

## Quando evitar comemorações

| Situação | Por quê |
|----------|---------|
| Registro rotineiro diário | Normaliza, dilui marcos |
| Streak de 2–3 dias | Muito cedo — cria dependência de streak |
| Peso oscilando | Sensível — celebrar queda pode prejudicar |
| Aderência parcial | "2/4 treinos" não é conquista — é informação |
| Qualquer coisa com culpa invertida | "Você NÃO quebrou a streak!" = mencionar streak |

---

# 9. Motion Philosophy

## Princípio central

> **Movimento comunica relação entre estados — não decora.**

Inspirado em Apple e Linear: motion com propósito, nunca espetáculo.

---

## Quando animar

| Contexto | Propósito do motion |
|----------|---------------------|
| Transição Home → ação | Continuidade espacial — "estou indo para o treino" |
| Conclusão de registro | Satisfação — reforço de conclusão de loop |
| Atualização de número (macro, aderência) | Dado mudou — draw attention to delta |
| Expansão de detalhe | Progressive disclosure — "há mais aqui" |
| Delight moment | Reconhecimento emocional breve |
| Loading >1s | Progresso percebido — skeleton, não spinner infinito |

---

## Quando nunca animar

| Contexto | Por quê |
|----------|---------|
| Navegação rotineira | Carga cognitiva + lentidão percebida |
| Erros | Urgência requer clareza imediata |
| Textos longos | Distração |
| Decoração (partículas, confete longo) | Infantilização |
| Loop infinito sem ação | Ansiedade |
| Transições >400ms | Product feels sluggish |

---

## Como movimento comunica significado

| Tipo | Significado |
|------|-------------|
| **Slide horizontal** | Navegação entre pares (treino ↔ nutrição) |
| **Slide vertical (up)** | Conclusão, sucesso, "subiu" |
| **Fade** | Aparecimento de informação secundária |
| **Scale sutil (0.95→1)** | Confirmação de toque |
| **Number count-up** | Progresso quantitativo |
| **Collapse** | Esconder detalhe, retornar ao essencial |

---

## Como evitar excesso

| Regra | Limite |
|-------|--------|
| Duração máxima | 400ms (300ms ideal) |
| Easing | Ease-out para entradas, ease-in para saídas |
| Simultaneidade | Máximo 2 elementos animados por vez |
| Reduce motion | Respeitar preferência do sistema — versão estática |
| Delight | Máximo 1 por sessão |

---

# 10. Trust & Transparency

## Princípio

> **Confiança se constrói quando o sistema admite o que sabe — e o que não sabe.**

---

## Quando mostrar o "porquê"

| Situação | Obrigatório |
|----------|-------------|
| Recomendação de ajuste de plano | Sim — sempre |
| Sugestão de treino leve | Sim — "Noite curta" |
| Insight apresentado | Sim — "Baseado em X dias" |
| Meta calórica definida | Sim — "Para [objetivo], com seus dados" |
| Registro rotineiro | Não — over-explanation irrita |

**Padrão:** "Por quê?" acessível em 1 toque — não bloqueia fluxo principal.

---

## Quando mostrar fontes

| Contexto | Fonte |
|----------|-------|
| Meta de proteína | "Calculada para [objetivo] + [peso]" |
| Correlação sono→treino | "Observado em X das Y vezes" |
| Ajuste de plano | "Porque aderência foi X% esta semana" |
| Recomendação geral (regras) | "Prática comum para [objetivo]" — sem pseudociência |

**Nunca:** Citar estudos fabricados. Inventar precisão.

---

## Como explicar recomendações

```
Estrutura obrigatória:

  1. O quê:    "Sugerimos reduzir volume esta semana"
  2. Por quê:  "Três noites com menos de 6h de sono"
  3. Confiança: "Padrão observado 4 vezes" (quando aplicável)
  4. Alternativa: "Ou manter treino, intensidade leve"
  5. Controle: "Aceitar · Adiar · Ignorar"
```

---

## Como admitir incertezas

| Situação | Linguagem |
|----------|-----------|
| Poucos dados | "Ainda estou aprendendo seu padrão" |
| Correlação fraca | "Pode ser coincidência — vamos acompanhar" |
| Conflito de sinais | "Seus dados estão mistos esta semana" |
| Fora do escopo | "Isso foge do que posso ajudar — considere um profissional" |

**Product Bible:** "Não tenho dados suficientes" é UX válida.

---

## Como nunca parecer caixa-preta

| Anti-padrão | Alternativa |
|-------------|-------------|
| "Analisando..." sem resultado | Mostrar progresso ou admitir limitação |
| Recomendação sem razão | Sempre incluir "por quê" |
| Números mágicos | Mostrar inputs ("Baseado em 78kg, objetivo hipertrofia") |
| Mudança silenciosa de plano | Notificar mudanças significativas |
| IA omnisciente | Limites explícitos — "Posso errar. Você decide." |

---

# 11. Delight Moments

## Princípio

> **Delight é reconhecimento genuíno — não manipulação dopaminérgica.**

Momentos raros, bem calibrados, memoráveis. Máximo **1 por sessão**.

---

## Primeiro treino completo

| Elemento | Experiência |
|----------|-------------|
| Timing | Imediatamente após conclusão |
| Conteúdo | "Primeiro treino concluído. Seu progresso começa aqui." |
| Visual | Reconhecimento sutil — não confete de 5 segundos |
| Informação | "Próximo: [treino], [dia]. 1/4 esta semana." |
| Duração | ≤5 segundos — dismissable |

---

## Primeira semana

| Elemento | Experiência |
|----------|-------------|
| Timing | Após check-in do domingo |
| Conteúdo | "Uma semana completa. [X] treinos, [Y] dias com registro." |
| Tom | Orgulho quieto — "Consistência construída." |
| Evitar | "INCRÍVEL! Você é demais!" |

---

## Primeiro mês

| Elemento | Experiência |
|----------|-------------|
| Timing | Marco de 30 dias de uso |
| Conteúdo | Resumo narrativo — "Em 30 dias: [marcos concretos]" |
| Visual | Timeline simplificada de evolução |
| Tom | Reflexivo — "Olhe o que você construiu." |

---

## Novo recorde (PR)

| Elemento | Experiência |
|----------|-------------|
| Timing | Após registro que supera anterior |
| Conteúdo | "Novo recorde em [exercício]: [valor]. Anterior: [valor]." |
| Tom | Factual, satisfeito — dados, não hype |
| Evitar | Comparar com outros usuários |

---

## Meta alcançada

| Elemento | Experiência |
|----------|-------------|
| Timing | Quando tendência atinge meta (peso, aderência, etc.) |
| Conteúdo | "Meta de [X] atingida." + contexto |
| Próximo passo | "Manter? Ajustar? Nova meta?" |
| Evitar | Declarar vitória final — evolução continua |

---

## Retorno após abandono

| Elemento | Experiência |
|----------|-------------|
| Timing | Primeira sessão de retorno |
| Conteúdo | "Bem-vindo de volta." — caloroso, breve |
| Informação | "Seu histórico está aqui. PR: [X]. Vamos retomar?" |
| Tom | Alívio — porto seguro, não julgamento |
| Evitar | "Sentimos sua falta!", contagem de dias ausentes |

---

## Calibragem de delight

```
Intensidade

  Alta   │                    ★ PR
         │              ★ 1 mês
  Média  │        ★ 1 semana
         │  ★ 1º treino
  Baixa  │★ retorno
         └────────────────────────────► Frequência
           Raro                    Único na vida
```

**Regra:** Delight perde valor se frequente. Reservar para marcos reais.

---

# 12. UX Anti-Patterns

## Lista completa — nunca fazer

---

### AP1 — Excesso de notificações

**O que é:** Push para treino, refeição, água, streak, promo, "sentimos sua falta".

**Por que prejudica:** Fadiga de notificação → desinstalação. Oura envia poucas; cada uma importa.

**Alternativa:** Máximo 1 push/dia (opt-in). Resto silencioso na Home.

---

### AP2 — Dashboards poluídos

**O que é:** Home com 8+ widgets, gráficos, métricas, banners.

**Por que prejudica:** Paralisia. Usuário abre, overwhelmed, fecha.

**Alternativa:** Home = 3 blocos (ação, contexto, próximo passo).

---

### AP3 — Excesso de gráficos

**O que é:** Line charts, bar charts, pie charts para cada métrica.

**Por que prejudica:** Gráfico sem contexto = ruído. Usuário não sabe agir.

**Alternativa:** Tendência em 1 frase + número. Gráfico sob demanda em Progresso.

---

### AP4 — Excesso de métricas

**O que é:** Calorias, macros, micronutrientes, TDEE, BMI, FFMI, volume, tonnage, RPE médio — simultâneos.

**Por que prejudica:** Ansiedade. Satisfaz curiosidade, não gera ação.

**Alternativa:** 3 números no máximo por superfície (DP6).

---

### AP5 — Culpa e shame

**O que é:** "Você falhou!", streak quebrado, vermelho, dias perdidos, comparação negativa.

**Por que prejudica:** Product Bible proíbe explicitamente. Ciclo tóxico → abandono.

**Alternativa:** Recuperação graciosa (DP7, DP8).

---

### AP6 — Popups constantes

**O que é:** Modal de rating, upgrade, complete perfil, enable notifications — a cada sessão.

**Por que prejudica:** Interrompe core loop. Usuário aprende a fechar, não a usar.

**Alternativa:** 1 popup lifetime por tipo. Timing contextual (pós-marco, não D1).

---

### AP7 — Menus profundos

**O que é:** 4+ níveis para registrar refeição ou ver progresso.

**Por que prejudica:** Fricção mata registro. Navegação = falha de fluxo.

**Alternativa:** Máximo 2 níveis (Seção 3).

---

### AP8 — Estética fitness clichê

**O que é:** Neon verde, tipografia condensada agressiva, homens gritando, "BEAST MODE", caveiras, fogo.

**Por que prejudica:** Alieniza 80% do público. Associa a bro-science.

**Alternativa:** Calmo, premium-acessível, corpos reais diversos (Product Bible).

---

### AP9 — Streaks punitivos

**O que é:** "🔥 47 dias" que vira "💔 Streak quebrado!"

**Por que prejudica:** Retenção por medo, não por valor. Quebra = abandono.

**Alternativa:** Tendência semanal — "4/7 dias ativos" — sem sequência punitiva.

---

### AP10 — Chatbot invasivo

**O que é:** Bolha flutuante "Pergunte qualquer coisa!" cobrindo conteúdo.

**Por que prejudica:** MVP Lock proíbe. Distrai core loop. Expectativa de IA que não temos.

**Alternativa:** Observações contextuais integradas na Home.

---

### AP11 — Registro obrigatório para continuar

**O que é:** "Registre refeição para ver treino." Gatekeeping.

**Por que prejudica:** Punição por omissão. Usuário mente ou abandona.

**Alternativa:** Tudo acessível sempre. Registro = valor, não permissão.

---

### AP12 — Comparação social

**O que é:** Rankings, "Top 10%", "Amigos treinaram hoje."

**Por que prejudica:** Product Bible proíbe. Body-shaming. Tóxico.

**Alternativa:** Comparar usuário apenas consigo mesmo (tendência pessoal).

---

### AP13 — Promessas visuais de resultado

**O que é:** "Perca 5kg em 30 dias!" na Home ou onboarding.

**Por que prejudica:** Antiético. Destrói confiança quando não cumpre.

**Alternativa:** "Seu plano para [objetivo]. Progresso leva tempo."

---

### AP14 — Formulários longos

**O que é:** Onboarding 15 telas, registro de refeição item a item.

**Por que prejudica:** Abandono D1. Fricção crônica.

**Alternativa:** ≤3 min onboarding. ≤20s refeição.

---

### AP15 — Loading sem feedback

**O que é:** Spinner infinito, tela branca, "Carregando..."

**Por que prejudica:** Ansiedade. Percepção de app quebrado.

**Alternativa:** Skeleton, optimistic UI, ou admitir "Sem conexão."

---

### AP16 — Dark patterns de retenção

**O que é:** Cancelar assinatura escondido, confirmação tripla para sair, "Tem certeza? Você perderá TUDO."

**Porque prejudica:** Product Bible proíbe. Destrói confiança permanentemente.

**Alternativa:** Cancelar tão fácil quanto assinar (futuro billing).

---

### AP17 — Informação médica disfarçada

**O que é:** "Você pode ter deficiência de vitamina D" baseado em nada.

**Por que prejudica:** Risco legal e de saúde. Fora do escopo.

**Alternativa:** "Considere conversar com um profissional sobre [tema]."

---

### AP18 — Micro-copy agressivo

**O que é:** "BORA!", "CRUSH IT!", "NO PAIN NO GAIN!", "DIA DE MONSTRAR!"

**Por que prejudica:** Tom errado. Exclui. Cansativo.

**Alternativa:** Voz do parceiro calmo (Seção 1).

---

# 13. Revisão Crítica

## O que diferencia esta experiência de apps fitness atuais?

| Dimensão | Apps fitness típicos | Nossa experiência |
|----------|---------------------|-------------------|
| **Home** | Dashboard de métricas | Centro de comando do dia |
| **Tom** | Aggressive, urgente | Calmo, parceiro |
| **Integração** | Silos (aba treino, aba dieta) | Treino + nutrição + hábitos conversam |
| **Omissão** | Culpa, streak quebrado | Recuperação graciosa |
| **Registro** | Formulários longos | ≤20s refeição, ≤60s treino |
| **Inteligência** | Chatbot ou black box | Explicável, admite incertezas |
| **Progresso** | Gráficos complexos | Tendências em linguagem humana |
| **Retenção** | Gamificação, FOMO | Valor no loop, investimento acumulado |
| **Estética** | Neon, beast mode | Premium-acessível, respirado |
| **Profundidade** | Tudo no D1 ou nada | Progressive disclosure |

**Diferencial em uma frase:**

> *"O único app fitness que respeita sua inteligência, seu tempo e seus imprevistos."*

---

## Onde ainda existem riscos?

| Risco | Descrição | Mitigação |
|-------|-----------|-----------|
| **R1 — Home genérica demais** | "Seu Dia" pode parecer todo app com checklist | Copy contextual + integração visível treino↔nutrição |
| **R2 — Registro nutricional ainda longo** | 20s pode ser muito para alguns | Presets agressivos, repetir última refeição |
| **R3 — Calma = sem energia** | Tom calmo pode parecer "sem personalidade" | Delight moments + copy com personalidade |
| **R4 — Progressive disclosure invisível** | Usuário avançado não descobre profundidade | Progresso como destino claro na nav |
| **R5 — Confiança sem IA forte** | MVP tem regras, não IA — promessa vs. entrega | Honestidade: "Estou aprendendo" nos primeiros 14 dias |
| **R6 — Check-in ignorado** | 90s semanais pode ser descartado | Integrar naturalmente no domingo, valor claro pós |
| **R7 — Documento vs. execução** | Blueprint rico, Lovable pode simplizar demais | Checklist de princípios por tela (DP1–DP18) |

---

## O que deve ser validado com usuários reais?

| # | Validação | Método | Quando |
|---|-----------|--------|--------|
| V1 | Home responde "o que fazer" em <10s | Teste moderado (5 usuários) | Antes do design visual |
| V2 | Registro de refeição ≤20s é viável | Prototype test com cronômetro | Protótipo |
| V3 | Tom calmo ressoa (não parece "frio") | Entrevista + reação a copy | Antes do design visual |
| V4 | Retorno após ausência gera alívio, não culpa | Cenário role-play | Protótipo |
| V5 | Check-in semanal de 3 perguntas é útil | Beta com 20 usuários | MVP |
| V6 | Progressive disclosure não esconde demais | Observação D7, D14, D30 | Beta |
| V7 | Integração treino↔nutrição é percebida | Pergunta "o que diferencia?" | D30 |

---

## Decisões pendentes antes do design visual

| # | Decisão | Opções | Impacto |
|---|---------|--------|---------|
| D1 | **Nome do produto** | A definir | Tom de toda comunicação |
| D2 | **Estrutura de navegação global** | 3 tabs vs. 4 tabs | Densidade da nav |
| D3 | **Posição da ação primária** | Bottom fixed vs. inline na Home | Padrão de interação |
| D4 | **Tratamento de peso na UI** | Escondido vs. acessível em Progresso | Sensibilidade emocional |
| D5 | **Ilustração vs. fotografia** | Direção visual | Identidade |
| D6 | **Dark mode no MVP?** | MVP Lock diz V1 | Escopo vs. expectativa |
| D7 | **Idioma dos presets de refeição** | PT-BR coloquial vs. formal | Tom |
| D8 | **Check-in: domingo fixo vs. configurável** | Flexibilidade vs. previsibilidade | Ritmo semanal |
| D9 | **Feedback pós-treino: modal vs. inline** | Interrupção vs. fluidez | Ritmo do loop |
| D10 | **Nomenclatura "Seu Dia" vs. alternativa** | Home, Hoje, Daily | Identidade da Home |

---

## Nota para esta Experience Blueprint

### Nota: **8.5 / 10**

### Justificativa

**Pontos fortes (o que sustenta a nota):**
- Filosofia emocional clara e diferenciada — calma operacional como north star
- 18 princípios acionáveis com testes de validação
- Tempos máximos por interação — raro em blueprints, crítico para fitness
- Anti-patterns explícitos — protege contra regressão
- Alinhamento total com Product Bible, Conceptual Architecture e MVP Lock
- Empty states e retorno pós-ausência — onde apps fitness falham mais
- Trust & transparency como seção dedicada — prepara para IA futura

**Onde ainda pode evoluir (o que impede 10):**
- **Validação empírica zero** — princípios são hipóteses até teste com usuários
- **Decisões visuais pendentes** (D1–D10) — blueprint de experiência, não de identidade
- **Desktop experience subexplorada** — Product Bible menciona desktop-capable; este doc é mobile-centric
- **Acessibilidade declarada, não detalhada** — WCAG citado, mas sem fluxos específicos por deficiência
- **Conteúdo para Lovable** — pode precisar de supplement com user flows wireframe (próximo doc)
- **Personas não segmentadas** — Retornante e Evoluidor Consciente têm ritmos diferentes; blueprint trata como um

### Próximos passos recomendados

1. **Validar V1–V4** com 5 usuários antes de design visual
2. **Resolver D1, D3, D10** — nome, ação primária, nomenclatura da Home
3. **Criar User Flow Maps** — wireflows derivados deste blueprint para Lovable
4. **Design System Brief** — tokens, tipografia, cor (derivado da Product Bible Seção 9)
5. **Revisar blueprint pós-teste** — incrementar para v1.1 com aprendizados

---

## Controle de Versão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | Jul 2026 | Product Design | Blueprint fundacional |

---

## Referências cruzadas

| Documento | Papel |
|-----------|-------|
| `PRODUCT_BIBLE.md` | Quem somos, princípios de UX/Design |
| `CONCEPTUAL_ARCHITECTURE.md` | Como o sistema pensa |
| `MVP_LOCK.md` | O que construir |
| `EXPERIENCE_BLUEPRINT.md` | **Como o usuário vive** |
| *Próximo* | User Flow Maps · Design System Brief · Lovable |

---

*Este documento é a bíblia de UX. Toda tela, fluxo, copy e animação deve passar pelos 18 Design Principles e pelos 18 Anti-Patterns. Quando em dúvida, escolha calma sobre urgência, clareza sobre completude, e respeito sobre retenção.*
