import type {
  GameId,
  LeaderboardEntry,
  LevelDefinition,
  Progress,
  User,
} from '../../domain/entities';

/** Ports owned by the application layer; adapters/infrastructure implement them (DIP). DRAFT (P1). */

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(email: string, passwordHash: string): Promise<User>;
}

export interface IProgressRepository {
  get(userId: string, gameId: GameId): Promise<Progress | undefined>;
  upsert(progress: Progress): Promise<Progress>;
}

export interface ILeaderboardRepository {
  top(
    gameId: GameId,
    limit: number,
    levelId?: string,
  ): Promise<readonly LeaderboardEntry[]>;
  submit(entry: LeaderboardEntry): Promise<void>;
}

export interface ILevelRepository {
  list(gameId: GameId): Promise<readonly LevelDefinition[]>;
  get(gameId: GameId, levelId: string): Promise<LevelDefinition | undefined>;
  save(level: LevelDefinition): Promise<LevelDefinition>;
}

export interface IPasswordHasher {
  hash(plain: string): Promise<string>;
  verify(plain: string, hash: string): Promise<boolean>;
}

export interface ITokenService {
  sign(userId: string): Promise<string>;
  verify(token: string): Promise<{ userId: string } | undefined>;
}
