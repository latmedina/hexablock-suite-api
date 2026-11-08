# Module: adapters — owner @luisloaiza2

Layer 3. Also read the root `AGENTS.md`.

1. Controllers translate HTTP to use case input and back; no business rules in controllers.
2. Every endpoint has Swagger decorators, request/response DTOs with validation, and an integration
   test in `test/integration/` (Supertest).
3. Repositories implement ports from `src/application/ports` (Adapter over Prisma). Mappers convert
   Prisma rows to domain objects; Prisma types never leave this folder or `src/infrastructure`.
4. Only implement endpoints listed in the API contract of the root `AGENTS.md`. A new endpoint is added
   to that table and to the OpenAPI document in the same PR, and the app owner is told.
