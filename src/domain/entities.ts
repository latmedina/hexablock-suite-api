/** Domain entities of the API. Framework-free: no Nest, no Prisma imports. DRAFT (P1). */

/** gameId is a mandatory dimension for progress, leaderboard and levels. */
export type GameId =
  'hexa-lines' | 'hexa-fit' | 'hexa-sort' | 'hexa-merge' | (string & {});

export interface User {
  readonly id: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly createdAt: Date;
}

/** One progress entry per (userId, gameId). */
export interface Progress {
  readonly userId: string;
  readonly gameId: GameId;
  readonly highScore: number;
  readonly levels: readonly LevelProgress[];
  readonly updatedAt: Date;
}

export interface LevelProgress {
  readonly levelId: string;
  readonly stars: number;
  readonly bestScore: number;
}

export interface LeaderboardEntry {
  readonly userId: string;
  readonly gameId: GameId;
  readonly levelId?: string;
  readonly score: number;
  readonly achievedAt: Date;
}

/** Generic level schema: common header + a variant-specific section typed by TSpec. */
export interface LevelDefinition<TSpec = unknown> {
  readonly gameId: GameId;
  readonly levelId: string;
  readonly order: number;
  readonly version: number;
  readonly spec: TSpec;
}
