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

| Příkaz           | Popis                                 |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | Dev server frontendu                  |
| `pnpm build`     | Produkční build frontendu             |
| `pnpm preview`   | Náhled produkčního buildu             |
| `pnpm typecheck` | Kontrola typů ve všech balíčcích      |
| `pnpm lint`      | ESLint ve všech balíčcích (`lint:fix`) |
| `pnpm test`      | Vitest ve všech balíčcích             |

## Struktura

```
apps/
  web/              Nuxt 4 + Tailwind CSS 4 + @nuxtjs/i18n
packages/
  contracts/        Zod schémata, odvozené typy, repository rozhraní
  domain/           Čistá doménová logika (sloty, ceny, kolize, storno)
```

Závislosti vedou jedním směrem: `apps/*` → `packages/domain` → `packages/contracts`.
Sdílené verze nástrojů (TypeScript, ESLint, Vitest) jsou v `catalog` v `pnpm-workspace.yaml`.

## Data: mock vs. backend

Stránky a komponenty čtou data jen přes repository rozhraní z `@sport/contracts`.
Implementaci vybírá `NUXT_PUBLIC_DATA_SOURCE` (`mock` | `api`), viz `apps/web/.env.example`.
Mock data jsou typované objekty v `apps/web/mocks/`.

## Pravidla projektu

Principy a quality gates jsou v [`.specify/memory/constitution.md`](.specify/memory/constitution.md).
Features se vyvíjí přes Spec Kit (`/speckit-specify` → `/speckit-plan` → `/speckit-tasks` →
`/speckit-implement`).
