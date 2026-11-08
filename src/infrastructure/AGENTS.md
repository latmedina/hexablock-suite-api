# Module: infrastructure — owner @luisloaiza2

Layer 4. Also read the root `AGENTS.md`.

1. `persistence/` (Prisma client), `auth/` (JWT, password hashing), `config/` (env validation),
   `filters/` (global `application/problem+json` exception filter, RFC 7807).
2. Secrets come from environment variables listed in `.env.example`; never commit real values.
3. Replacing Prisma or the JWT library must not touch `src/domain` or `src/application`.
