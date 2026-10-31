/** Enforces the Clean Architecture dependency rule: dependencies only point inwards. */
module.exports = {
  forbidden: [
    {
      name: 'domain-is-pure',
      comment: 'Domain must not import other layers or npm packages (no Nest, no Prisma).',
      severity: 'error',
      from: { path: '^src/domain' },
      to: { pathNot: '^src/domain' },
    },
    {
      name: 'application-depends-only-on-domain',
      comment: 'Use cases depend on ports, never on Nest, Prisma or concrete adapters.',
      severity: 'error',
      from: { path: '^src/application' },
      to: { pathNot: '^src/(domain|application)' },
    },
    {
      name: 'adapters-do-not-know-infrastructure',
      severity: 'error',
      from: { path: '^src/adapters' },
      to: { path: '^src/infrastructure' },
    },
    { name: 'no-circular', severity: 'error', from: {}, to: { circular: true } },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' },
  },
};
