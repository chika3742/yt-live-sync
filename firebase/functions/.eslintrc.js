module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'no-extra-parens': 1,
    'no-multi-spaces': 1,
    'no-unreachable': 1,
    'no-multiple-empty-lines': [1, {max: 1}],
    'func-call-spacing': [2, 'never'],
    'no-unneeded-ternary': 2,
    'semi': [2, 'never'],
    'no-var': 1,
    'indent': [2, 2, {'SwitchCase': 1}],
    'space-in-parens': [2, 'never'],
    'no-console': 0,
    'eqeqeq': 0,
    'comma-spacing': 2,
    'computed-property-spacing': 2,
    'key-spacing': 2,
    'keyword-spacing': 2,
    'no-unused-vars': 1,
    '@typescript-eslint/no-unused-vars': 1,
  },
}
