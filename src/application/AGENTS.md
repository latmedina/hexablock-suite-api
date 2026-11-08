# Module: use cases and aspects — owner @luisloaiza2, architecture review @latmedina

Layer 2. Also read the root `AGENTS.md`.

1. Use cases are plain classes implementing `IUseCase<TIn, TOut>`. **No `@Injectable`, no `@Inject`,
   no import from `@nestjs/*`** (dependency-cruiser fails the build). They are wired in the Nest modules
   with `useFactory`, which keeps this layer framework-free.
2. Use cases depend only on ports in `ports/`. One use case per operation, generic over `gameId`
   (`SyncProgress`, `SubmitScore`, `GetLeaderboard`, `GetLevels`, `UpsertLevel`, `Register`, `Login`).
3. Aspects live in `aspects/` as Decorators over `IUseCase` (logging, profiling, retry, auth check,
   cache for `GetLeaderboard`). Nest interceptors may exist for HTTP concerns, but the course aspects
   are these decorators.
