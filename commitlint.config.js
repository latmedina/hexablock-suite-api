module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['auth', 'users', 'progress', 'leaderboard', 'levels', 'use-cases', 'aop', 'persistence',
       'api', 'swagger', 'contract', 'ci', 'docs', 'readme', 'deps'],
    ],
  },
};
