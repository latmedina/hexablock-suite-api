# HexaBlock Suite API

![CI](https://github.com/latmedina/hexablock-suite-api/actions/workflows/ci.yml/badge.svg)
![Tests](https://img.shields.io/badge/tests-unit%20%7C%20integration%20%7C%20contract-blue)
![License](https://img.shields.io/badge/license-MIT-green)

REST API for [HexaBlock Suite](https://github.com/latmedina/hexablock-suite-app): user registration and
login with JWT, player progress per game variant (`gameId`), global leaderboards and generic level
definitions. Built with TypeScript and NestJS.

> Status: scaffold. Sections marked TODO are filled as the project advances.

## Architecture

Clean Architecture; dependencies only point inwards, enforced in CI with dependency-cruiser
(`npm run lint:arch`).

| Layer | Folder |
| --- | --- |
| Entities | `src/domain` |
| Use cases | `src/application` |
| Interface adapters | `src/adapters` |
| Frameworks & drivers | `src/infrastructure` |
| Composition root | `src/app.module.ts`, `src/main.ts` |

TODO: embed `docs/diagrams/clean-architecture.png`.

## Generic level model

TODO: `LevelDefinition<TSpec>` — common header plus a `spec` section per `gameId`.

## API

TODO: Swagger UI at `/docs`. Endpoints: auth, progress, leaderboard, levels.

## Design Patterns

TODO

## SOLID Principles

TODO

## AOP

TODO: aspects implemented as Decorators over `IUseCase`.

## Getting Started

Prerequisites: Node.js 22, npm 10, PostgreSQL 16.

```bash
cp .env.example .env
npm ci
npm run start:dev
```

## Running Tests

```bash
npm test                 # unit + integration
npm run test:unit
npm run test:integration
npm run test:cov
npm run lint:arch        # Clean Architecture dependency rule
```

## AI Usage Documentation

See [AI_USAGE.md](AI_USAGE.md). Rules for AI agents: [AGENTS.md](AGENTS.md), plus one `AGENTS.md` per module. Module map, owners and supported tools (Claude Code, Codex, Gemini CLI, OpenRouter models): [docs/agents/README.md](docs/agents/README.md).

## Contributing

- Branches: `main` (releases, protected), `develop` (integration, protected), `dev/<member>` (personal work).
- PR from `dev/<member>` to `develop` at least every 2–3 days; one approval from another member and green CI. Squash merge.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org) in English, validated by commitlint.
- Test names follow `should_<expected>_when_<condition>` (`npm run lint:tests`).
- Module owners review changes to their module ([CODEOWNERS](.github/CODEOWNERS)).

## License

[MIT](LICENSE)
