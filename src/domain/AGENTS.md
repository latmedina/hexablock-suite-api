# Module: domain — owner @luisloaiza2, architecture review @latmedina

Layer 1. Also read the root `AGENTS.md`.

1. Plain TypeScript: no Nest, no Prisma, no npm packages, no `Date.now()` (inject a clock).
2. `gameId` is part of every progress, leaderboard and level concept. It is a value, never a branch:
   no `if (gameId === ...)` in business rules.
3. `LevelDefinition<TSpec>` is generic: a common header plus a `spec` owned by each game. The API
   validates the header; the `spec` schema is registered per game id, not hard-coded in a switch.
4. Validation of invariants lives here (in factories / value objects), not in controllers.
