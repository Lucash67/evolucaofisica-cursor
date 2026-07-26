<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Fonte de verdade do produto

Antes de implementar qualquer interface ou feature, leia e siga **nesta ordem**:

1. `docs/PRODUCT_BIBLE.md` — estratégia, princípios, o que nunca faremos
2. `docs/CONCEPTUAL_ARCHITECTURE.md` — eventos, contexto, ciclo de inteligência
3. `docs/MVP_LOCK.md` — **escopo congelado**; não adicionar features fora desta lista
4. `docs/EXPERIENCE_BLUEPRINT.md` — tom calmo, Seu Dia, tempos máximos de registro
5. `docs/REAL_USER_WORKFLOW.md` — fluxo real do usuário (Notion → produto)
6. `docs/PRODUCT_OPERATING_SYSTEM.md` — ciclos, rituais, integração dos módulos

## Regras de implementação

- **Hub central:** "Seu Dia" — não dashboards com múltiplos widgets
- **Integração:** treino + nutrição + hábitos na mesma superfície, nunca silos
- **Registro rápido:** refeição ≤20s, treino ≤60s, sono ≤15s
- **Sem culpa:** recuperação graciosa; nunca streaks punitivos
- **MVP primeiro:** sem chatbot, wearables, gamificação, comunidade ou busca de alimentos
- **Mobile-first:** ação primária clara; máximo 2 níveis de profundidade

## Hipótese a validar

Retenção D30 ≥ 25% via loop diário integrado — não via IA avançada no MVP.
