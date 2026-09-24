# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Host (hlavní uživatel):** hráč, který si chce rychle zarezervovat sportoviště. Rezervuje
  převážně na telefonu, často přímo v areálu. Rezervuje bez účtu,
  vyplní jen jméno, e-mail a telefon.
- **Registrovaný uživatel:** pravidelný hráč. Vidí přehled svých rezervací a může je stornovat.
- **Správce areálu:** spravuje sportoviště, ceník, otevírací dobu, blokace a všechny rezervace.
  Pracuje stejně často na počítači (recepce) jako na telefonu (v pohybu po areálu), jeho
  rozhraní musí být plně použitelné na obou.

## Product Purpose

SportBooking je online rezervační systém sportovišť jednoho sportovního areálu. Host najde
volné sportoviště a čas, zarezervuje ho a dostane potvrzení. Správce má přehled o provozu
a spravuje nabídku areálu.

Úspěch: host dokončí rezervaci na telefonu bez telefonování a bez zakládání účtu; správce
vidí stav celého dne bez hledání.

## Positioning

Obsazenost na první pohled. Celý den všech sportovišť areálu je čitelný najednou, takže host
okamžitě vidí, kde a kdy je volno, a nemusí proklikávat sportoviště ani dny jedno po druhém.

## Operating Context

- Většina rezervací probíhá na mobilu, často přímo v areálu. Areál má i venkovní
  sportoviště (tenis, beach volejbal, fotbal).
- Správce střídá počítač na recepci a telefon při pohybu po areálu.
- Platba je ve V1 na místě; online platba přibude později.
- Cena se liší podle špičky / mimo špičku a víkendu. Časy platí v zóně Europe/Prague.

## Capabilities and Constraints

- Flow hosta: vyhledání volného sportoviště a času → rezervace → potvrzení. Dále storno.
- Správce: sportoviště, ceník, otevírací doba, blokace, správa všech rezervací.
- Sporty areálu: tenis, badminton, squash, beach volejbal, fotbal / multifunkční hřiště
  a další sporty. Nabídka sportů není uzavřená, rozhraní musí zvládnout libovolný počet
  sportů a sportovišť.
- Role host / registrovaný uživatel / správce. Autentizace je do napojení backendu mockovaná.
- Jazyk: čeština (výchozí), angličtina přibude později.
- Sbírá se jen minimum osobních údajů (GDPR).
- Otevřené: skutečný areál zatím neexistuje, používá se fiktivní. Jméno areálu není
  určené. Backend není zvolený.

## Brand Commitments

- Název produktu: **SportBooking**. (Aplikace má v i18n zatím `app.name` = „Sportovní areál“.)
- Hlas: tykání, sportovní a energický tón klubu („Vyber si kurt a jdeme na to“), stále
  stručný a srozumitelný.
- Logo: `apps/web/public/sportbooking-logo.svg` je **pracovní návrh**, ne závazné. Design
  z něj smí vycházet, ale smí se měnit.

## Evidence on Hand

- Žádné reálné recenze, reference, statistiky ani zákazníci. Nic z toho se nesmí vymýšlet.
- Vlastní fotografie areálu zatím nejsou. Pro reprezentaci sportovišť (kurty, hřiště, haly,
  sportovní atmosféra) se smí používat stock fotografie z Unsplash a Pexels (licence povoluje
  bezplatné komerční použití). Fotky se stahují lokálně do `apps/web/public/images/`,
  u každé se eviduje zdroj (URL a autor). Jsou ilustrativní; až bude reálný areál, nahradí
  se jeho skutečnými fotkami.
- Mock data nesmí obsahovat skutečné osobní údaje.

## Product Principles

1. **Volno je vidět dřív, než se na něj uživatel zeptá.** Obsazenost celého dne je hlavní
   obsah, ne výsledek hledání.
2. **Rezervace jde dokončit jednou rukou na telefonu.** Venku, za pohybu, bez účtu.
3. **Žádná překvapení.** Co host vybere, to s tou cenou a časem dostane.
4. **Po hostovi chceme jen to nejnutnější.** Každé pole ve formuláři musí obhájit své místo.
5. **Správce má stejný přehled na recepci i na kurtu.**

## Accessibility & Inclusion

- WCAG 2.2 AA; funkční od šířky 320 px.
- Dotykové cíle min. 44×44 px.
- Obsazenost sportovišť nesmí být sdělena jen barvou (vždy i text nebo ikona).
- Mřížka slotů, výběr data, dialogy a menu mají ručně řešené ARIA role, fokus a ovládání
  klávesnicí.
- Data, časy a ceny formátované přes `Intl` podle aktivního locale.
