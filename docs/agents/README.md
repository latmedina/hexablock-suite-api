# Working with AI agents in this repo

Every agent (Claude Code, Codex, Gemini CLI, or any model through OpenRouter) reads the same rules:
the root [`AGENTS.md`](../../AGENTS.md) plus the `AGENTS.md` of the module it works in. The app repo
(`hexablock-suite-app`) uses the same setup; its `docs/agents/README.md` has the full workflow.

## Modules and owners

| Module | Path | Owner | Module rules |
| --- | --- | --- | --- |
| Domain (users, progress, leaderboard, generic levels) | `src/domain` | @luisloaiza2 (architecture review @latmedina) | [`src/domain/AGENTS.md`](../../src/domain/AGENTS.md) |
| Use cases and aspects | `src/application` | @luisloaiza2 (architecture review @latmedina) | [`src/application/AGENTS.md`](../../src/application/AGENTS.md) |
| Controllers, DTOs, mappers, Prisma repositories | `src/adapters` | @luisloaiza2 | [`src/adapters/AGENTS.md`](../../src/adapters/AGENTS.md) |
| Prisma, JWT, config, error filter | `src/infrastructure` | @luisloaiza2 | [`src/infrastructure/AGENTS.md`](../../src/infrastructure/AGENTS.md) |
| Tests (unit, integration, Pact provider) | `test` | @luisloaiza2 | [`test/AGENTS.md`](../../test/AGENTS.md) |

## How each tool picks up the rules

| Tool | What it reads | Setup |
| --- | --- | --- |
| Claude Code | `CLAUDE.md` in the root and in each module folder; each one imports `@AGENTS.md` | nothing extra |
| Codex | `AGENTS.md` natively, root plus the folder it works in | nothing extra |
| Gemini CLI | `AGENTS.md`, set in [`.gemini/settings.json`](../../.gemini/settings.json) | nothing extra |
| OpenRouter models | through **OpenCode** (reads `AGENTS.md`) or **Aider** ([`.aider.conf.yml`](../../.aider.conf.yml)) | `OPENROUTER_API_KEY` in your shell only |

## Suggested use here

- Use cases, aspects and Prisma repositories: Claude Code or Codex, from a spec in `docs/specs/`.
- Review of each PR by a different model family than the one that wrote it, then a human.
- Swagger/OpenAPI vs controllers audit and README vs code audit: Gemini CLI (whole-repo context).
- DTOs, mappers and seed data: a cheap model through OpenRouter, checked by CI and the owner.
- Log every significant use in [`AI_USAGE.md`](../../AI_USAGE.md) with the literal prompt.
