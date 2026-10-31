/** Single-method contract so aspects (logging, retry, auth, cache) wrap any use case as a Decorator. */
export interface IUseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
