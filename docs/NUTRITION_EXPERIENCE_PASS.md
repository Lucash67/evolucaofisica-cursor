# Nutrition Experience Pass
## Descobrir a personalidade da Nutrição no Evolução Física

---

> **Status:** Constituição do módulo — Sprint 02.2 Design (congelado pós-revisão estratégica)  
> **Escopo:** Filosofia, jornada, modelo mental, CEE, motion. Zero implementação.  
> **Missão da Sprint:** Descobrir qual deve ser a **personalidade e a experiência** da Nutrição — tão distinta quanto o Treino, **sem reutilizar soluções por simetria**.  
> **Baseline técnico:** Implementação `b1d6a6a` (MVP técnico) — validada, não descartada.  
> **Papel deste documento:** Constituição do módulo Nutrição — filtro para toda decisão futura, como o Training Experience Pass foi para o Treino.

**Referências:** `PRODUCT_BIBLE.md` · `MVP_LOCK.md` · `EXPERIENCE_BLUEPRINT.md` · `REAL_USER_WORKFLOW.md` · `SPRINT_02_1_TRAINING_WORKSPACE_REVIEW.md`

---

# Processo adotado (Sprint 02.2 em diante)

Este documento formaliza o ciclo saudável que emergiu nesta sprint:

```
Product Discovery
       ↓
Experience Pass          ← você está aqui
       ↓
MVP Técnico              ← b1d6a6a (feito)
       ↓
Experience Refinement    ← próximo, pós-aprovação
       ↓
Sprint Review
```

**O que aprendemos:** implementar antes do Experience Pass gera CRUD funcional sem identidade. Implementar *depois* sem Experience Pass repete o erro. O MVP técnico desta sprint cumpriu seu papel — **provou persistência, CEE e loop** — e agora cede lugar à definição de produto.

---

# 0. A pergunta certa

No Treino, a pergunta foi:

> *"Como é a melhor experiência de registrar um treino?"*

Na Nutrição, a pergunta **não** é análoga (*"como registrar refeições?"*). É outra:

> **"Como é a maneira mais fácil de manter a ingestão de proteína durante um dia inteiro?"**

Perceba a diferença:

| Pergunta errada | Pergunta certa |
|-----------------|----------------|
| O que você comeu? | Quanto falta para atingir seu objetivo? |
| Registrar refeições | Manter consistência |
| Olhar para trás (diário) | Olhar para frente (direção) |
| Contabilidade | Conversa contínua |

**O objetivo do módulo não é registrar refeições.**  
Registro é **meio**. Consistência proteica é **fim**.

MyFitnessPal responde à pergunta errada — com precisão falsa e busca infinita.  
Notion responde com controle total — e 15–30 minutos por dia.

Nossa resposta:

> **Nutrição é uma bússola que aponta para frente — não um diário do que passou.**

---

# North Star — filtro de todas as decisões

No Treino, a North Star ficou clara:

> *"A interface desaparece durante a sessão."*

Na Nutrição, a frase equivalente é:

> **"O sucesso do módulo é quando registrar uma refeição leva menos tempo do que decidir não registrá-la."**

Toda feature, tela ou refinamento futuro deve passar por este filtro:

- Isso **acelera** a captura ou **atrasa**?
- Isso orienta para **frente** (gap) ou para **trás** (log)?
- Isso aumenta **consistência** ou **precisão vazia**?

Se a resposta atrasa, olha para trás ou exige precisão desnecessária — **não entra**.

---

# 1. Personalidade do módulo

### 1.1 Identidade em uma frase

**Treino:** *"Uma sessão vivida."* — longa, focada, imersiva.  
**Nutrição:** *"Uma conversa contínua sobre o que falta."* — curta, repetida, orientadora.

### 1.2 Ritmos diferentes, padrões compartilhados

Treino e Nutrição **compartilham** a filosofia do produto (*Home orienta. Workspace executa.*), mas **não compartilham** ritmo, intensidade visual ou metáfora de interação.

| Dimensão | Treino | Nutrição |
|----------|--------|----------|
| Frequência | 1×/dia | 3–5×/dia |
| Duração do gesto | 45 min | ≤10 s |
| Atenção | Imersiva (tela cheia) | Periférica (glance + toque) |
| Emoção dominante | Conquista | Direção |
| Pergunta central | "O que faço agora?" | "Quanto falta?" |
| Workspace | Executar | Revisar (secundário) |

**Regra anti-simetria:** se uma solução existe no Treino *só porque* existe no Treino, ela **não** entra na Nutrição.

### 1.3 O que somos vs. o que não somos

**Somos:**

- Um **copiloto** para atingir metas nutricionais — especialmente proteína.
- Um sistema **orientado por progresso** ("faltam Xg"), não por histórico.
- Uma **conversa distribuída** ao longo do dia — Hero, Surface, confirmação inline.
- A continuação natural da **recuperação pós-treino**.
- Um módulo onde **consistência** importa mais que precisão.

**Não somos:**

- Um contador completo de calorias.
- Um banco de milhões de alimentos.
- Um substituto do MyFitnessPal.
- Um diário alimentar detalhado.
- Uma planilha bonita de macros.
- Um módulo que exige disciplina contábil para funcionar.

| Somos | Não somos |
|-------|-----------|
| Bússola proteica do dia | MyFitnessPal |
| Conversa contínua via Hero + Surface | Diário alimentar |
| Progresso orientado ("faltam Xg") | Histórico orientado ("você comeu Y") |
| Consistência ao longo do dia | Precisão por grama |
| Continuação da recuperação pós-treino | Módulo paralelo desconectado |

---

# 1.4 Fricção progressiva

Quanto mais informação o usuário **quiser** registrar, mais opções aparecem. **Nunca o contrário.**

O caminho padrão é sempre o mais curto. Detalhe é opt-in, nunca gate.

```
MVP (Sprint 02.2)
    Registrar: Café → Médio          ← 2 toques, zero teclado

Refinamento
    Ajustar proteína manualmente     ← opt-in no sheet

V1
    Adicionar observação             ← colapsado, opcional

V1+
    Foto da refeição                 ← opt-in explícito

V2
    Macro manual por item            ← fora do fluxo diário
```

**Regra:** o usuário nunca vê busca de alimentos, tabela nutricional ou formulário longo **antes** de completar a captura mínima.

**Teste:** se um usuário apressado só der 2 toques, o produto ainda funciona perfeitamente.

---

# 2. Modelo mental — a jornada da Nutrição

### 2.1 Não copiar Treino

Treino tem: Warm-up → Sessão Ativa → Fechamento.  
Nutrição **não precisa** dessa tríade. Forçar "Warm-up da refeição" ou "Fechamento fullscreen" seria simetria vazia.

### 2.2 A jornada própria da Nutrição

```
Objetivo do dia
      ↓
   Captura
      ↓
  Progresso
      ↓
 Próximo passo
```

| Etapa | Pergunta que responde | Onde vive |
|-------|----------------------|-----------|
| **Objetivo do dia** | "Para onde estou indo?" | Seu Dia — barra, Hero, Surface |
| **Captura** | "Acabei de comer — quanto isso conta?" | Sheet (2 toques), nunca deep link |
| **Progresso** | "Onde estou agora?" | Animação imediata + número |
| **Próximo passo** | "Quanto falta? O que me aproxima?" | Copy de direção — **sem alimentos específicos no MVP** |

### 2.3 Exemplo concreto (fluxo vivido)

```
Proteína
78 / 160 g
      ↓
[ Registrar ]          ← Captura
      ↓
+32 g                  ← Progresso (78 → 110)
      ↓
Faltam 50 g            ← Objetivo reorientado
      ↓
Uma refeição rica
em proteína pode
ajudar.              ← Próximo passo (MVP — copy genérica)
```

O usuário **nunca** precisou pensar "estou registrando um almoço médio". Ele pensou: *"Quanto falta?"*

**MVP — Próximo passo:** apenas copy de direção. Exemplos permitidos:

- "Faltam 50g de proteína hoje."
- "Uma refeição rica em proteína pode ajudar você a atingir a meta."
- "Quase lá — faltam 18g."

**Fora do MVP:** sugestões de alimentos específicos ("iogurte + whey"). Entram em fase futura quando houver contexto suficiente (preferências, restrições, histórico, objetivo) para serem **realmente úteis** — não genéricas e arriscadas.

### 2.4 Hierarquia interna (engine)

```
Meta diária (Direção)
    ↓
Estado atual (Progresso acumulado)
    ↓
Captura (incremento)
    ↓
Gap restante (Próximo passo)
    ↓
Histórico (Consistência — secundário, modo Revisar)
```

**Histórico não protagoniza.** Consistência semanal importa; cada grama do passado, não.

---

# 3. Filosofia — quatro modos (revisados)

| Modo | Essência | Anti-padrão |
|------|----------|-------------|
| **Objetivo** | "160g hoje. Faltam 50g." | Mostrar só o que já comeu |
| **Captura** | Incremento rápido | Formulário longo |
| **Progresso** | Barra/número animam para frente | Toast genérico "salvo" |
| **Próximo passo** | Copy de direção (gap + orientação genérica) | Silêncio ou alimento específico |

**Modo Revisar** (Workspace `/nutricao`) existe para quem quer **olhar a semana** — não para o loop diário.

> **80% das interações são Objetivo → Captura → Progresso → Próximo passo na Home.**  
> **20% são Revisar no Workspace.**

---

# 4. O Hero como conversa contínua

Nutrição no CEE não é um evento — é uma **conversa ao longo do dia**.

### 4.1 Momentos da conversa

| Momento | Copy Hero (exemplo) | Intenção |
|---------|----------------------|----------|
| **Pós-treino** | "Hora da proteína." | Transição Treino → recuperação |
| **Meio da tarde** | "Você já atingiu 75% da meta." | Reforço positivo, sem ação forçada |
| **Pré-jantar** | "Faltam 42g para fechar o dia." | Direção, não cobrança |
| **Noite tardia** | "Faltam apenas 18g." | Urgência calma |
| **Meta atingida** | "Proteína do dia completa." | Encerramento — sem fogos |
| **Manhã, treino dia** | *(silêncio nutricional)* | Treino manda — nutrição espera |

### 4.2 Regras CEE

1. **Hero nutricional nunca compete com treino pendente.**
2. **Uma "fala" nutricional forte por período** — manhã / tarde / noite. Não a cada refeição.
3. **Pós-treino é o único momento de sequência animada (EP-02)** — porque é transição de capítulo.
4. **Demais capturas** = Progresso + Próximo passo inline — sem roubar o Hero.
5. **`meal.registered`** recalcula Context → Priority → Hero/Surface — mas Hero só muda copy se **threshold** cruzado (50%, 75%, 90%, 100%).

### 4.3 Surface (card proteína)

O card não pergunta "O que você comeu?". Mostra:

```
Proteína
110 / 160 g
████████████░░░░░░
Faltam 50g · ~1 refeição média
[ + ]
```

Tap `+` = Captura. O card é **painel de objetivo**, não botão de CRUD.

---

# 5. Captura — meio, não fim

### 5.1 Tempo alvo: ≤10 segundos

Captura deve ser **invisível** — usuário lembra do progresso, não do formulário.

**Fluxo padrão (2 toques):** tipo → tamanho → *Progresso imediato*.

**Fluxo acelerado (1 toque):** repetir último / sugestão pós-treino pré-selecionada.

### 5.2 O que capturamos (MVP)

Estimativa por refeição — preset Pequeno/Médio/Grande (~30/40/50g P).  
Alinhado ao MVP Lock. **Sem busca de alimentos.**

### 5.3 Wireframe — Captura mínima

```
┌──────────────────────────────────────┐
│  + Quanto foi?                       │
├──────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌────────┐│
│  │ ~30g P  │ │ ~40g P  │ │ ~50g P ││
│  │ Pequeno │ │  Médio  │ │ Grande ││
│  └─────────┘ └─────────┘ └────────┘│
│                                      │
│  Repetir último ›    Outro tipo ›   │
└──────────────────────────────────────┘
```

**Nota:** "Quanto foi?" — não "Qual refeição?". Tipo (café/almoço) é metadado útil, **secundário** — pode ser inferido por horário ou escolhido em "Outro tipo".

### 5.4 Pós-treino — Captura contextual

Quando Hero = "Hora da proteína":

```
┌──────────────────────────────────────┐
│  Recuperação                         │
│                                      │
│  ┌────────────────────────────────┐│
│  │  ~40g P · Médio        [ ✓ ]  ││  ← 1 toque
│  └────────────────────────────────┘│
│  Outro valor ›                       │
└──────────────────────────────────────┘
```

Não é Warm-up. É **Captura com contexto** — menos decisões porque o dia já contou uma história.

---

# 6. Progresso — o momento de feedback

Após Captura, **nunca silêncio**. Sempre Progresso visível.

### 6.1 Camadas de feedback

| Camada | O quê | Quando |
|--------|-------|--------|
| **P0 — Barra** | Anima 78→110 | Toda captura |
| **P1 — Gap** | "Faltam 50g de proteína hoje." | Toda captura, 1,5s |
| **P2 — Próximo passo** | Copy genérica de direção | Se gap significativo e tarde |
| **P3 — Hero** | Threshold 75% / EP-02 | 1–2×/dia max |

### 6.2 Wireframe — Progresso + Próximo passo

```
┌──────────────────────────────────────┐
│              +32g                    │
│                                      │
│         110 / 160 g                  │
│                                      │
│  Faltam 50g de proteína hoje.        │
│                                      │
│  Uma refeição rica em proteína       │
│  pode ajudar você a atingir a meta.  │
│                                      │
│         (fecha em 2s)                │
└──────────────────────────────────────┘
```

**MVP — copy permitida por gap:**

| Gap restante | Copy (exemplo) |
|--------------|----------------|
| >40g | "Faltam Xg de proteína hoje." + orientação genérica |
| 20–40g | "Faltam Xg. Uma refeição rica em proteína pode ajudar." |
| 10–19g | "Quase lá — faltam Xg." |
| <10g | "Faltam apenas Xg." |
| 0g | "Proteína do dia completa." |

Copy sempre **orientadora**, nunca prescritiva ("você deve comer X").

**V2+ (com contexto):** sugestões personalizadas de alimentos — preferências, restrições, padrões do usuário. **Não MVP.**

### 6.3 Motion

- Barra preenche: 300ms ease-out
- Número sobe (count-up): 400ms
- Gap + sugestão: fade stagger 100ms
- Haptic: impact light na captura; success 1×/dia ao atingir meta

---

# 7. Workspace — modo Revisar (secundário)

O MVP técnico construiu `/nutricao` como centro. **Este documento reposiciona:**

> Workspace = espelho semanal e ajuste de metas — **não** o lugar onde o dia acontece.

### 7.1 Abas reorientadas

| Aba | Pergunta | Foco |
|-----|----------|------|
| **Hoje** | "Onde estou?" | Objetivo + gap + capturas do dia (secundário) |
| **Metas** | "Qual minha direção?" | Proteína/calorias por fase |
| **Histórico** | "Sou consistente?" | Dias com registro, média semanal — **não** log calórico |

### 7.2 Wireframe — Hoje (reorientado)

```
┌──────────────────────────────────────┐
│  Nutrição                            │
├──────────────────────────────────────┤
│                                      │
│         110 / 160 g                  │
│         Faltam 50g                   │
│         ████████████████░░░░         │
│                                      │
│  Uma refeição rica em proteína       │
│  pode ajudar.                        │
│                                      │
│  [ + Registrar ]                     │
│                                      │
│  ── Hoje ── (secundário)             │
│  +40g · ~12:30                       │
│  +30g · ~08:00                       │
└──────────────────────────────────────┘
```

Lista de refeições **abaixo**, compacta, sem protagonismo.

### 7.3 Histórico = Consistência

```
Esta semana
● ● ● ○ ●   4/5 dias
Média: 148g/dia · Meta: 160g

Tendência: estável
```

---

# 8. Integração Treino → Nutrição (narrativa, não simetria)

Única cadeia onde os módulos se tocam com força:

```
Treino: Fechamento ("Agora vamos recuperar.")
              ↓
Nutrição: Hero ("Hora da proteína.")
              ↓
Captura contextual (1 toque)
              ↓
Progresso ("110g. Faltam 50g de proteína hoje.")
              ↓
Próximo passo (copy genérica de direção)
              ↓
Seu Dia: treino colapsado, objetivo proteico em evidência
```

Treino **termina** com recuperação. Nutrição **continua** a história — sem repetir stats do treino, sem tela de Fechamento clone.

---

# 9. Estados do dia

| Estado | Objetivo visível | Hero | Captura |
|--------|------------------|------|---------|
| Manhã, treino planejado | "160g hoje" discreto | Treino | Disponível, não destacada |
| Pós-treino | Gap em evidência | "Hora da proteína" | Contextual, 1 toque |
| Tarde 50–75% | "Faltam Xg" | Threshold copy | Sheet padrão |
| Noite <70% | Urgência calma | "Faltam 18g" | Sheet padrão |
| Meta 100% | Barra completa | "Proteína completa" | Opcional, sem pressão |
| Zero registros | "160g hoje" | Silêncio | Zero culpa |

---

# 10. MVP técnico → Experience Refinement (mapa)

| Baseline (`b1d6a6a`) | Refinamento pós-aprovação |
|----------------------|---------------------------|
| Persistência | ✅ Manter |
| Presets P/M/G | ✅ Manter — reframing "Quanto foi?" |
| Sync CEE | ✅ Manter — thresholds Hero |
| Sheet 2 passos | 🔄 Tipo secundário; proteína primeiro |
| Workspace central | 🔄 Reorientar: objetivo no topo, lista secundária |
| Pós-registro | ❌ → Progresso + copy de direção (sem alimentos) |
| Sugestões alimentares | ❌ V2+ — fora do MVP |
| Hero contínuo | 🔄 Copy por momento do dia |
| Histórico lista | 🔄 Consistência semanal |
| Confirmação EP-02 | 🔄 Só pós-treino / threshold |

**Nenhuma linha de persistência apagada.**

---

# 11. Decisões que rejeitaremos

Lista explícita — protege identidade contra scope creep:

| Decisão | Status | Por quê |
|---------|--------|---------|
| Scanner de código de barras | ❌ MVP | Fricção + identidade MyFitnessPal |
| Busca gigante de alimentos | ❌ MVP | Mata ≤10s; viola North Star |
| Cadastro obrigatório de alimentos | ❌ Sempre | Contabilidade, não copiloto |
| Tabelas nutricionais complexas | ❌ MVP | Olhar para trás; precisão falsa |
| Diário em formato de planilha | ❌ Sempre | Notion pattern — rejeitado |
| Sugestão de alimentos específicos | ❌ MVP | Preferências, restrições, precisão — V2+ |
| Hero nutricional a cada refeição | ❌ Sempre | Cansa; viola conversa contínua |
| Warm-up / Fechamento clone do Treino | ❌ Sempre | Simetria vazia |
| Workspace como centro de captura | ❌ Sempre | MyFitnessPal pattern |
| Gráficos de pizza de macros | ❌ MVP | Dashboard, não bússola |
| Registro obrigatório de 3 refeições | ❌ Sempre | 1 registro > 0 |
| Culpa por meta não atingida | ❌ Sempre | Filosofia do produto |

**Como usar:** qualquer proposta de feature deve ser comparada a esta tabela antes de entrar no roadmap.

---

# 12. O que descartamos (contexto)

| Ideia | Por quê fora |
|-------|--------------|
| Warm-up / Fechamento clone do Treino | Simetria vazia |
| Workspace como centro de captura | MyFitnessPal pattern |
| Hero a cada refeição | Cansa; nutrição é conversa, não aplauso |
| Foco em "o que comeu" | Olhar para trás; meta é consistência |
| Busca de alimentos | MVP Lock + fricção |
| Precisão gramatical | Falsa precisão mata aderência |
| Gráficos de macros | Dashboard, não bússola |
| Alimentos específicos sugeridos | MVP — falta contexto do usuário |

---

# 13. Princípios permanentes

1. **Pergunta certa:** manter proteína no dia — não registrar refeições.
2. **Olhar para frente:** "Faltam Xg" > "Você comeu Y".
3. **Captura na Home** — Workspace revisa.
4. **Quatro etapas próprias:** Objetivo → Captura → Progresso → Próximo passo.
5. **Hero = conversa contínua** — calma, por momento, não por refeição.
6. **Anti-simetria** com Treino — ritmos diferentes.
7. **≤10 segundos** por captura.
8. **Direção > silêncio** após captura — copy genérica, não alimento específico (MVP).
9. **Consistência > precisão.**
10. **Treino manda de manhã; proteína manda de tarde.**
11. **Fricção progressiva** — detalhe é opt-in.
12. **North Star** — registrar deve ser mais rápido que desistir.

---

# 14. Checklist de validação

Antes do Experience Refinement:

- [ ] A pergunta central é sobre **consistência proteica**, não CRUD
- [ ] Sei explicar a jornada Objetivo → Captura → Progresso → Próximo passo
- [ ] Workspace parece **secundário** — Home é o centro
- [ ] Hero fala diferente de manhã, tarde e noite
- [ ] Pós-treino conecta com Treino sem copiar Fechamento
- [ ] Próximo passo usa **copy genérica** — sem alimentos específicos no MVP
- [ ] North Star passa no filtro de qualquer feature proposta
- [ ] Fricção progressiva respeitada — captura mínima sempre disponível
- [ ] Não parece MyFitnessPal
- [ ] Não parece Treino disfarçado
- [ ] Quero abrir 5×/dia porque **vejo progresso**, não porque "preciso logar"

---

# 15. Próximo passo

1. **Documento congelado** — constituição do módulo Nutrição.
2. **Experience Refinement** — ordem sugerida:
   - Progresso + copy de direção pós-captura (sem alimentos)
   - Reorientar card e Workspace (objetivo primeiro)
   - Hero copy por momento + thresholds
   - Captura pós-treino 1-toque
   - Histórico → Consistência
3. **Sprint Review 02.2** — após refinamento.

---

# Product Playbook

Este documento faz parte do **Product Playbook** do Evolução Física — a disciplina compartilhada entre módulos:

```
Discovery → Experience Pass → MVP Técnico → Refinement → Sprint Review
```

Quando Treino, Nutrição, Recuperação e os próximos domínios seguirem este ciclo, o produto mantém **identidade consistente** — não um conjunto de CRUDs desconexos.

| Módulo | Experience Pass | Sprint Review |
|--------|-----------------|---------------|
| Treino | Training Experience Pass | `SPRINT_02_1_TRAINING_WORKSPACE_REVIEW.md` |
| Nutrição | **Este documento** | *(após Refinement)* |
| Recuperação | *(futuro)* | *(futuro)* |

---

*Nutrition Experience Pass v3 — Constituição do módulo · Sprint 02.2 Design · Evolução Física*  
*Congelado pós-revisão estratégica · Julho 2026*
