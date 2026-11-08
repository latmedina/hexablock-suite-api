# Tests

Also read the root `AGENTS.md`.

1. `unit/` (use cases with in-memory fakes), `integration/` (Supertest against the Nest app, in-memory
   or test database, including filtering by `gameId`), `contract/` (Pact provider verification).
2. Names: `should_<expected>_when_<condition>`, lowercase snake_case; `npm run lint:tests` enforces it.
3. Every test has `// Arrange`, `// Act`, `// Assert` comments. No real network, no real secrets.
