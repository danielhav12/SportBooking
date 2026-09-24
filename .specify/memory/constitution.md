<!--
Sync Impact Report
==================
Version change: 1.0.0 → 1.1.0
Bump rationale: MINOR – principle I materially relaxed (mock layer no longer simulates backend
behaviour); V drops contract-test requirement. Code compliant with 1.0.0 remains compliant.

Modified principles (1.0.0 → 1.1.0):
- I. Mock data = plain typed TS objects in `mocks/`, no latency/error/validation simulation;
  repository methods still return Promise so the API swap is transparent.
- III. UI states still designed, but mock layer no longer required to trigger them.
- V. Removed shared repository contract tests against mock implementation.

Original ratification (1.0.0):

Principles defined (template slot → new title):
- [PRINCIPLE_1_NAME] → I. Backend-agnostický datový kontrakt (NON-NEGOTIABLE)
- [PRINCIPLE_2_NAME] → II. Doménová logika oddělená od UI
- [PRINCIPLE_3_NAME] → III. Design řízený přes impeccable a design tokeny
- [PRINCIPLE_4_NAME] → IV. Přístupnost a mobile-first
- [PRINCIPLE_5_NAME] → V. Pragmatické testování
- (added) VI. Jednoduchost, i18n připravenost a otevřenost návrhům

Added sections:
- Technologický stack a doménová omezení (template SECTION_2)
- Vývojový workflow a quality gates (template SECTION_3)

Removed sections: none

Templates requiring updates:
- .specify/templates/plan-template.md ✅ no change needed (Constitution Check reads this file at runtime)
- .specify/templates/spec-template.md ✅ no change needed
- .specify/templates/tasks-template.md ✅ no change needed

Follow-up TODOs:
- Directory is not yet a git repository; branch/commit rules take effect after `git init`.
- Runtime guidance file (CLAUDE.md) does not exist yet; create it when the monorepo is scaffolded.
- Backend technology intentionally undecided; decide via amendment before the first backend feature.
-->

# Sportovní areál – rezervační systém Constitution

## Core Principles

### I. Backend-agnostický datový kontrakt (NON-NEGOTIABLE)

Frontend vzniká dřív než backend. Přechod z mock dat na skutečné API proto NESMÍ vyžadovat
změny v komponentách, stránkách ani composables.

- Všechny doménové entity (hřiště, sport, časový slot, rezervace, uživatel, ceník, blokace)
  MUSÍ být definovány jako Zod schémata v `packages/contracts`. TypeScript typy se z nich MUSÍ
  odvozovat (`z.infer`), nikdy se nepíšou ručně podruhé.
- Přístup k datům MUSÍ jít výhradně přes repository rozhraní (např. `CourtRepository`,
  `ReservationRepository`) definovaná v `packages/contracts`. Komponenty a stránky NESMÍ
  importovat mock data přímo.
- Mock data MUSÍ být v odděleném adresáři `mocks/` jako typované TypeScript objekty a NESMÍ
  být zapsána natvrdo v komponentách ani stránkách. Mock implementace repozitářů je záměrně
  jednoduchá: jen vrací tato data a nesimuluje latenci, chyby ani serverovou validaci.
- Metody repozitářů MUSÍ vracet `Promise` i v mock implementaci, aby náhrada za API
  nezměnila volající kód.
- Volba implementace (`mock` | `api`) MUSÍ být řízena jediným místem: runtime configem
  (`NUXT_PUBLIC_DATA_SOURCE`) a jedním Nuxt pluginem, který repozitáře poskytuje.
- Konvence přenosu dat: ID jsou `string`; datum a čas jsou ISO 8601 řetězce s offsetem;
  peníze jsou celá čísla v haléřích (`amountMinor`) s kódem měny `CZK`.

Proč: backend technologie ještě není zvolená. Jasný kontrakt znamená, že backend jen
implementuje existující rozhraní a frontend se přepne jednou proměnnou prostředí.

### II. Doménová logika oddělená od UI

Pravidla rezervací jsou jádro produktu a MUSÍ být znovupoužitelná budoucím backendem.

- Generování slotů podle otevírací doby, detekce kolizí, výpočet ceny (špička/mimo špičku,
  víkend), pravidla storna a limity rezervací MUSÍ být čisté TypeScript funkce
  v `packages/domain`, bez závislosti na Vue, Nuxtu nebo prohlížečových API.
- Vue komponenty NESMÍ obsahovat business pravidla. Smí jen volat doménové funkce
  a composables.
- Časové výpočty MUSÍ pracovat v časové zóně areálu (`Europe/Prague`) a MUSÍ správně řešit
  přechody letního a zimního času.

Proč: backend bude tatáž pravidla vynucovat autoritativně. Sdílený balíček brání tomu, aby se
chování frontendu a backendu rozešlo.

### III. Design řízený přes impeccable a design tokeny

UI/UX se navrhuje a reviduje pomocí impeccable. Vizuální konzistence se vynucuje tokeny,
ne disciplínou.

- Před první UI featurou MUSÍ vzniknout design kontext pomocí impeccable (cílová skupina,
  tón značky, estetický směr). Každá další UI práce z něj vychází.
- Barvy, typografie, spacing, radiusy a stíny MUSÍ být definovány jako design tokeny
  v Tailwind `@theme`. Ad-hoc arbitrary hodnoty (`bg-[#123456]`, `mt-[13px]`) jsou zakázané,
  pokud nejsou v PR zdůvodněné.
- Každá UI feature MUSÍ před označením za hotovou projít impeccable revizí (audit/critique)
  a nalezené problémy vysoké závažnosti MUSÍ být opraveny.
- UI MUSÍ mít navržené všechny stavy: načítání, prázdný stav, chyba, úspěch, disabled,
  i když je mock data zatím nevyvolají.

Proč: bez knihovny komponent je riziko nekonzistence vyšší. Tokeny a pravidelný audit
drží web osobitý a ne šablonovitý.

### IV. Přístupnost a mobile-first

Většina rezervací proběhne na telefonu, často přímo v areálu.

- Layout MUSÍ být navržen mobile-first a funkční od šířky 320 px.
- Web MUSÍ splňovat WCAG 2.2 AA. Protože se nepoužívá knihovna komponent, interaktivní prvky
  (dialog, výběr data, mřížka slotů, menu) MUSÍ mít ručně ošetřené ARIA role, správu fokusu,
  focus trap a ovládání klávesnicí.
- Dotykové cíle MUSÍ mít alespoň 44×44 px. Informace NESMÍ být předávána jen barvou
  (obsazenost slotů MUSÍ mít i textový nebo ikonový indikátor).
- Data, časy a ceny MUSÍ být formátovány přes `Intl` API podle aktivního locale.

Proč: přístupnost je zákonná a etická povinnost. Rezervační mřížka je přesně ten typ
komponenty, kde se na ni snadno zapomene.

### V. Pragmatické testování

Testy se píšou tam, kde nejvíc chrání produkt, ne všude stejně.

- Každá funkce v `packages/domain` MUSÍ mít unit testy ve Vitestu, včetně okrajových případů
  (hranice slotů, půlnoc, změna času, souběžné rezervace).
- Kritické uživatelské flow (vyhledání volného hřiště → rezervace → potvrzení; storno;
  správa rezervací adminem) MUSÍ mít Playwright E2E test běžící nad mock daty.
- UI komponenty nevyžadují test-first vývoj. Test se přidává, pokud komponenta obsahuje
  netriviální logiku stavu.
- `typecheck` a `lint` MUSÍ projít bez chyb před každým mergem.

Proč: chyby v kolizích nebo cenách stojí peníze i důvěru. Chyby ve vzhledu zachytí
impeccable revize a E2E testy.

### VI. Jednoduchost, i18n připravenost a otevřenost návrhům

- Nové závislosti, abstrakce a balíčky MUSÍ být zdůvodněny konkrétní potřebou (YAGNI).
  Preferují se vestavěné možnosti Nuxtu (`useState`, `useAsyncData`, auto-importy) před
  externími knihovnami. Pinia se zavádí až pro sdílený stav napříč stránkami, kde
  composables nestačí.
- Všechny texty viditelné uživateli MUSÍ jít přes `@nuxtjs/i18n`. Výchozí a zatím jediný
  jazyk je čeština (`cs`), přidání angličtiny NESMÍ vyžadovat refaktor komponent.
- Návrhy na zlepšení stacku, UX i obsahu webu jsou výslovně vítány a SHOULD být aktivně
  předkládány (v `plan.md` v sekci „Návrhy“ nebo přímo v konverzaci). Změna, která porušuje
  tuto konstituci, se ale NESMÍ implementovat bez schváleného amendmentu.

Proč: projekt vzniká iterativně a vlastník je otevřený nápadům. Jednoduchost a jasný proces
změn zajišťují, že nápady projekt zlepší a nerozbijí.

## Technologický stack a doménová omezení

**Struktura monorepa (pnpm workspaces):**

- `apps/web` – Nuxt aplikace (frontend).
- `packages/contracts` – Zod schémata, odvozené typy, repository rozhraní, typy chyb.
- `packages/domain` – čistá doménová logika (sloty, ceny, kolize, storno).
- `apps/api` – budoucí backend. Technologie zatím nebyla zvolena a MUSÍ být schválena
  amendmentem před první backend featurou.

Balíčky MUSÍ mít jednosměrné závislosti: `apps/*` → `packages/domain` → `packages/contracts`.
`packages/*` NESMÍ importovat z `apps/*`.

**Frontend stack:**

- Nuxt (aktuální stabilní major), Vue 3 Composition API, `<script setup lang="ts">`.
- TypeScript v `strict` režimu. `any` je zakázané bez komentáře s odůvodněním.
- Tailwind CSS v4 bez knihovny komponent. Headless primitivy se píšou vlastní, v souladu
  s principem IV.
- `@nuxtjs/i18n`, Zod, Vitest, Playwright, `@nuxt/eslint`.
- Package manager je výhradně `pnpm`.

**Doménová omezení:**

- Role: **host** (prohlíží, rezervuje bez účtu se jménem, e-mailem a telefonem),
  **registrovaný uživatel** (přehled a storno vlastních rezervací), **správce areálu**
  (hřiště, ceník, otevírací doba, blokace, všechny rezervace). Autentizace je do napojení
  backendu mockovaná a MUSÍ umožnit přepínat role pro vývoj a testy.
- Platby: V1 = platba na místě. Model rezervace MUSÍ obsahovat `paymentStatus`
  a `paymentMethod`, aby šla online platební brána doplnit bez změny kontraktu.
- Obsah: dokud nebude reálný areál, používá se fiktivní areál. Mock data NESMÍ obsahovat
  skutečné osobní údaje.
- Osobní údaje: sbírá se jen minimum nutné k rezervaci (GDPR – minimalizace dat).
- Výkon: stránky pro veřejnost MUSÍ dosáhnout Lighthouse skóre (mobil) ≥ 90 v kategoriích
  Performance a Accessibility.

## Vývojový workflow a quality gates

- Každá feature prochází Spec Kit flow: `/speckit-specify` → (`/speckit-clarify`) →
  `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`. Sekce Constitution Check
  v `plan.md` MUSÍ ověřit soulad se všemi principy I–VI a každé porušení zdůvodnit
  v tabulce Complexity Tracking.
- Každá feature se vyvíjí ve vlastní větvi `###-nazev-feature`. Commity MUSÍ dodržovat
  Conventional Commits.
- Feature je hotová až když:
  1. prošel `pnpm typecheck`, `pnpm lint` a `pnpm test`,
  2. prošly E2E testy dotčených kritických flow,
  3. u UI změn proběhla impeccable revize a problémy vysoké závažnosti jsou opravené,
  4. všechny nové texty jsou v i18n souborech,
  5. nová data procházejí přes `packages/contracts` a nikde se neobchází repository vrstva.

## Governance

- Tato konstituce má přednost před ostatními konvencemi a dokumenty v projektu. Při rozporu
  platí konstituce.
- Amendment se navrhuje přes `/speckit-constitution` s popisem změny, důvodem a dopadem na
  existující kód. Schvaluje ho vlastník projektu. Změna, která rozbije existující kontrakt,
  MUSÍ obsahovat plán migrace.
- Verzování (SemVer): MAJOR = odstranění nebo zásadní předefinování principu; MINOR = nový
  princip, sekce nebo podstatné rozšíření; PATCH = upřesnění formulací a překlepy.
- Soulad se kontroluje v každém `plan.md` (Constitution Check) a v `/speckit-analyze` před
  implementací. Nesoulad nalezený během implementace se buď opraví, nebo se navrhne amendment.
  Tiché obcházení není přípustné.
- Provozní pokyny pro vývoj a AI agenty (příkazy, struktura, konvence) patří do `CLAUDE.md`
  v kořeni repozitáře, který MUSÍ být s touto konstitucí v souladu.

**Version**: 1.1.0 | **Ratified**: 2026-09-24 | **Last Amended**: 2026-09-24
