# Handoff: MI CENTRO

## Overview
MI CENTRO is a personal life/inventory/finance management app: tracks owned equipment (photo, video, drone, tech, 3D printing, software), digital projects/websites, freelance jobs & clients, money (accounts, investments, expenses, subscriptions), maintenance/loans/kits, and a wishlist with savings-progress tracking. Single user, no auth.

## About the Design Files
The file in this bundle (`MI-CENTRO-reference.dc.html`) is a **design reference / interactive prototype** built in this platform's own templating format. It is NOT deployable code — its `{{ }}` template syntax and `<x-dc>`/`sc-if`/`sc-for` tags only run inside this platform's runtime and will render as literal text anywhere else (this is why it broke when pushed directly to GitHub Pages/Vercel).

The task is to **recreate this design and its behavior in a real framework** — React + Vite is recommended (matches the component-per-view structure already used). Read the reference file to see exact copy, layout, and interaction logic; do not attempt to serve it as-is.

## Fidelity
**High-fidelity**: exact copy, layout structure, spacing, and interaction logic are final. Colors/typography come from the bound design system tokens below (extracted from the design-system CSS the reference imports) — match them exactly.

## Design Tokens
Extracted from the bound "Modernist" design system used by the reference:
- Background: `#f3f2f2` (var(--color-bg))
- Text: near-black (var(--color-text))
- Accent (brand red): var(--color-accent), darker var(--color-accent-700)
- Divider/borders: 2px solid var(--color-divider) — flat, no border-radius anywhere, no shadows except `var(--shadow-lg)` on floating panels (FAB, modals, dropdowns)
- Neutral text: var(--color-neutral-700) for secondary/meta text, var(--color-neutral-200) for progress-bar track backgrounds
- Headings font: var(--font-heading) (Archivo-style geometric sans), body font: var(--font-body)
- Tag/badge styles: `.tag.tag-neutral`, `.tag.tag-accent`, `.tag.tag-outline` — pill-less flat labels
- Buttons: `.btn.btn-primary` (filled accent), `.btn.btn-secondary` (outlined/neutral), `.btn.btn-icon`, `.btn.btn-block`
- Cards: `.card`, `.card-title`, `.card-kicker`, `.card-meta` — flat bordered blocks, no rounding
- Grid pattern used everywhere: CSS grid with `gap: 2px` and a `2px solid` divider border wrapping the grid, so cells appear separated by thin rules (not gutters/shadows) — this "ruled grid" look is the core visual signature, keep it.

Pull the exact hex/token values from the design system's `styles.css` (referenced in the prototype's `<helmet>`) rather than guessing — do not invent new colors.

## Navigation
Left sidebar (desktop), collapsible drawer + hamburger + bottom FAB (mobile, breakpoint 860px). Items in order: Dashboard, Inventario, Trabajos, Dinero, Control, Futuro, Estadísticas, Configuración. Each nav item: icon (18px, stroke-based, Lucide-style outline icons) + label; active item gets filled accent background + white text + weight 600; inactive is transparent/neutral text/weight 400.

Top bar (persistent across all views): mobile hamburger (mobile only), a search input that is actually a button opening a Command Palette modal (⌘K), and a "Apuntar rápido" (Quick Add) button opening a dropdown menu of entity types (Objeto, Trabajo, Gasto, Cobro, Wishlist, Mantenimiento, Cliente, Inversión, Suscripción, Web/proyecto, ⚡ Apuntar rápido) — in the current prototype these menu items are inert (close menu only); wire them to real create-flows per type.

A persistent "Bandeja (N)" (Inbox) button at the bottom of the sidebar opens a right-side drawer: free-text quick-capture list, each item has an editable type dropdown and a "Resolver" (resolve/remove) action.

## Screens / Views

### Dashboard
Summary grid (5 cells, ruled grid): Patrimonio financiero (sum of all account+investment balances), Valor equipo (0 until inventory has priced items), Ingresos mes, Wishlist count, Suscripciones/mes. Below: 5 small stat cards (Pendiente de cobrar, Trabajos próximos, Objetos registrados, Mantenimientos, Alertas activas). Then "Cuentas e inversiones" section: ruled grid of account/investment cells (BBVA, Imagin, Revolut, Trade Republic, MyInvestor) each showing live balance; Trade Republic shows "3% TAE · ≈ +X€/día" computed interest note. Below that a money-movement form: account select, Gasto(-)/Ingreso(+) type select, amount input, "Registrar" button — mutates the selected balance. Two-column bottom: "Tareas pendientes en webs" (task list per website) and "Alertas" (list, e.g. subscription-ending warnings).

### Inventario (Mis cosas)
Horizontal tab bar (ruled): Fotografía, Vídeo, Drone, Tecnología, Software, Webs, Relojes, Mochilas, Ordenadores (categories present in current seed data — extend as needed). Selected tab = filled accent. Each category tab shows a grid of item cards: name, category tag, status tag (e.g. "En uso"), price (or "Pendiente"), and free-text pending fields where marked Pendiente in the source data. Category with no items shows an EmptyState: "0 objetos en esta categoría" + "+ Añadir objeto" button. Websites tab shows one card per site: name, category, status tag, pending-tasks text, and should link out to the site URL (URLs are in the source data — add as real links, prototype doesn't).

### Trabajos (Trabajo)
Two stacked sections: Trabajos (list, empty state currently, "+ Nuevo trabajo") and Clientes (list, empty state currently). Extend with Tarifas, Presupuestos, Cobros sub-views per the original spec — not yet built in the prototype; treat as next-phase scope.

### Dinero
Duplicates the Dashboard's Cuentas e inversiones block (same accounts/investments grid + money-movement form) plus: Gastos (empty state list) and Suscripciones (list — currently one real row: "Gemini Pro (estudiante)", tag showing 0,00€, note it converts to paid at the end of the free year).

### Control
Horizontal tab bar (ruled): Mantenimiento, Garantías, Préstamos, Consumibles, Kits. Each tab is independently stateful (add/list/resolve items — Consumibles tab has a working add-item text input + list in the prototype; replicate that pattern for the other four). Empty state per tab: "Nada registrado todavía en {tab}" + "+ Añadir".

### Futuro (Wishlist)
Editable "Dinero ahorrado para compras futuras" number input at the top. Grid of wishlist item cards (11 real seed items — see reference for exact names/categories/prices/priorities), each showing: name, priority tag, category, price, and — when price is a parseable number — a progress bar (`savedAmount / price`, capped at 100%) + "{{ progress }}% ahorrado" label. List is **sorted descending by progress** (items with unparseable/"Pendiente" prices sort last). This is the core "closest to affordable" feature the user asked for — preserve the sort and progress-bar visual (thin 6px bar, neutral-200 track, accent fill, no rounding).

### Estadísticas
Placeholder stat grid (Valor equipo, Patrimonio, Wishlist count, Webs activas) + a note that charts (income/expense/equipment-usage) arrive once real job/expense data exists. Low scope currently — flesh out with real charts once Trabajo/Dinero have real transactional data.

### Configuración
PIN lock toggle (interface-lock only, not encryption) + PIN input when enabled. Currency display (fixed to €, es-ES number format `1.200,00 €` — replicate this formatting everywhere money is shown: thousands `.`, decimals `,`, trailing ` €`). Editable tag-lists for Categorías de Inventario and Ubicaciones (add via text input + button, remove via ✕ on each tag). "Exportar backup" button (currently a no-op placeholder — wire to a real export once a data layer exists).

### Command Palette (⌘K)
Modal overlay, single search input, live-filters across websites + wishlist item names (case-insensitive substring match) as the user types; each result row shows label + a type tag (WEB / WISHLIST). Extend the searched index to cover all entity types once they exist (objects, jobs, clients).

## State Management
No backend currently — everything lives in local component state (equivalent to a single global store). Group by domain when rebuilding:
- `accounts`: { bbva, imagin, revolut, tradeRepublic, myInvestor } balances (numbers)
- `view`/`invTab`/`controlTab`: current navigation selection
- `wishlist[]`: { name, category, price (string, may be non-numeric), priority }, plus a derived `savedAmount` used to compute progress/sort
- `webs[]`: { name, categoria, estado, tareas, url }
- `categories[]`, `locations[]`: user-editable string lists (Configuración)
- `inbox[]`: { text, type }
- `pin`: { enabled, value }
- money-movement form fields: selected account, type (gasto/ingreso), amount

All of this should move to persisted storage (localStorage at minimum, or a real DB) since the current prototype resets on reload — that data-layer decision was explicitly deferred by the user to a later phase; check with them before choosing.

## Real seed data
The reference file's logic class hardcodes the user's actual current data (account balances, investment amounts, 6 real websites with URLs, 11 real wishlist items with real prices/categories/priorities, inventory items from photography/video/drone/tech/3D-printing/software with several "Pendiente" fields still to be filled in). Copy these values as seed/initial records in the real database — the user was explicit that none of this should end up hardcoded in components long-term.

## Files
- `MI-CENTRO-reference.dc.html` — full interactive reference (open only inside the design platform; do not deploy as-is)
