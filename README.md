# Sportovní areál – rezervační systém

Webová aplikace pro rezervaci sportovišť ve sportovním areálu. Vzniká frontend-first:
nejdřív Nuxt frontend nad mock daty, backend se připojí později.

## Požadavky

- Node.js 24 (viz `.nvmrc`), minimálně 22
- pnpm 12 (`corepack enable` nebo `npm i -g pnpm`)

## Začínáme

```sh
pnpm install
pnpm dev          # http://localhost:3000
```

## Příkazy

| Příkaz           | Popis                                  |
| ---------------- | -------------------------------------- |
| `pnpm dev`       | Dev server frontendu                   |
| `pnpm build`     | Produkční build frontendu              |
| `pnpm preview`   | Náhled produkčního buildu              |
| `pnpm typecheck` | Kontrola typů                          |
| `pnpm lint`      | ESLint (`lint:fix` opraví, co jde)     |

## Struktura

```
apps/
  web/              Nuxt 4 + Tailwind CSS 4 + @nuxtjs/i18n
```

Monorepo je pnpm workspace. Sdílené balíčky (`packages/contracts`, `packages/domain`)
a backend (`apps/api`) přibudou, až je bude potřebovat první feature.

## Pravidla projektu

Principy a quality gates jsou v [`.specify/memory/constitution.md`](.specify/memory/constitution.md).
Features se vyvíjí přes Spec Kit (`/speckit-specify` → `/speckit-plan` → `/speckit-tasks` →
`/speckit-implement`).
