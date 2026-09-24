# CLAUDE.md

Rezervační systém sportovišť. pnpm monorepo, frontend-first, backend zatím nevybraný.
Závazná pravidla: `.specify/memory/constitution.md` – při rozporu platí konstituce.

## Příkazy (z kořene)

- `pnpm dev` / `pnpm build` – frontend (`apps/web`)
- `pnpm typecheck`, `pnpm lint` – musí projít před dokončením úkolu
- Závislost do aplikace: `pnpm --filter web add <pkg>`

## Struktura

- `apps/web` – Nuxt 4 (srcDir `app/`), Tailwind CSS 4 přes `@tailwindcss/vite`, `@nuxtjs/i18n`
  (locale soubory v `apps/web/i18n/locales/`)
- Nic nevytvářej dopředu: `packages/contracts`, `packages/domain`, mock vrstva a design tokeny
  vznikají až s první feature, která je použije. Sdílené balíčky budou source-only
  (`exports` → `src/index.ts`).

## Konvence

- Data jen přes repository rozhraní; mock data v `apps/web/mocks/`, nikdy natvrdo v komponentách.
- Peníze v haléřích (`amountMinor`, `CZK`), čas jako ISO 8601 s offsetem, zóna `Europe/Prague`.
- Každý text pro uživatele přes i18n (`t('...')`), výchozí jazyk `cs`.
- Styly jen přes design tokeny v `apps/web/app/assets/css/main.css` (`@theme`); UI navrhovat
  a revidovat přes impeccable. Bez knihovny komponent – přístupnost řešit ručně (WCAG 2.2 AA).
- ESLint stylistic: bez středníků, jednoduché uvozovky, 2 mezery.
- TypeScript je záměrně na 6.0.x – typescript-eslint zatím TS 7 nepodporuje.
- Nové build skripty závislostí je nutné povolit v `allowBuilds` v `pnpm-workspace.yaml`.
