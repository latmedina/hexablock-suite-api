# Agent instructions — hexablock-suite-api

Read this before writing any code. CI enforces most of these rules.

## What this project is

NestJS REST API for HexaBlock Suite: JWT auth, player progress per `gameId`, global leaderboards per
`gameId` (and per level), and generic level definitions for Hexa Fit and Hexa Sort. Documented with
Swagger/OpenAPI.

## Architecture (Clean Architecture, dependency rule points inwards)

| Folder | Layer | May import |
| --- | --- | --- |
| `src/domain` | 1. Entities | only `src/domain` — no Nest, no Prisma, no npm packages |
| `src/application` | 2. Use cases, ports, aspects | `src/domain`, `src/application` |
| `src/adapters` | 3. Controllers, DTOs, mappers, repository adapters | layers 1–3 and Nest |
| `src/infrastructure` | 4. Prisma, JWT, config, exception filters | anything |
| `src/app.module.ts`, `src/main.ts` | Composition root | anything |

`npm run lint:arch` (dependency-cruiser) fails the build on any violation, including any `@nestjs/*`
import from `src/domain` or `src/application`.

## Modules and module rules

Each module folder has its own `AGENTS.md` (and a `CLAUDE.md` that imports it). Read the one of the
folder you are working in. Module map, owners and AI tools: [`docs/agents/README.md`](docs/agents/README.md).

## API contract (draft — source of truth until `docs/openapi.yaml` exists)

Only `GET /health` is implemented today. Everything else below is planned and must not be assumed to
exist by the app. Paths are relative to the base URL; `gameId` is one of `hexa-lines`, `hexa-fit`,
`hexa-sort`, `hexa-merge`.

| Method | Path | Auth | Purpose | Status |
| --- | --- | --- | --- | --- |
| GET | `/health` | no | Liveness | done |
| POST | `/auth/register` | no | Create user, returns JWT | planned |
| POST | `/auth/login` | no | Returns JWT | planned |
| GET | `/progress/:gameId` | JWT | Progress of the current user for one game | planned |
| PUT | `/progress/:gameId` | JWT | Sync progress (one row per user and game) | planned |
| POST | `/leaderboard/:gameId/scores` | JWT | Submit a score (optional `levelId`) | planned |
| GET | `/leaderboard/:gameId?levelId=&limit=` | no | Top scores per game, and per level for level games | planned |
| GET | `/levels/:gameId` | no | Level definitions (generic header + `spec`) | planned |
| PUT | `/levels/:gameId/:levelId` | JWT (admin) | Create or update a level without shipping a new app | planned |

Changing a row of this table is a contract change: update the Pact tests and tell the app owner.

## Rules

1. `gameId` is a mandatory dimension: one progress row per (userId, gameId); leaderboards filter by `gameId`.
2. Level format is generic: common header + a `spec` section specific to each `gameId`. No endpoint per variant.
3. Use cases implement `IUseCase<TIn, TOut>` and depend only on ports. Nest decorators never appear in
   `src/domain` or `src/application`.
4. Cross-cutting concerns (logging, retry, auth checks, cache) are Decorators over `IUseCase` in
   `src/application/aspects`.
5. Errors: consistent `application/problem+json` (RFC 7807) through a global exception filter.
6. Every endpoint is documented in Swagger and has an integration test (Supertest).
7. Tests named `should_<expected>_when_<condition>`, AAA blocks with comments.
8. Commits: Conventional Commits in English with an allowed scope (see `commitlint.config.js`).
9. Never commit secrets. Configuration comes from environment variables (`.env.example` lists them).
10. Work only on `dev/<name>` branches and open a PR to `develop`; never commit to `main` or `develop`.
11. Never invent endpoints, classes or methods. If it is not in the code, the contract table or a spec, ask.
12. Do not commit agent reports or scratch files (`*_SUMMARY.md`, `*_IMPLEMENTATION.md`, notes).

## Before finishing

Run `npm run lint:check && npm run typecheck && npm run lint:tests && npm run lint:arch && npm test`. Tell the human which
parts you generated so they can log it in `AI_USAGE.md`.
