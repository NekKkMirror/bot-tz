module.exports = {
  root: true,
  env: {
    node: true,
    es2023: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2023,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'plugin:n/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'n/no-process-exit': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
      },
    ],
    'n/no-missing-import': 'off',
    'n/no-unsupported-features/es-syntax': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
