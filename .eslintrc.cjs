module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    'semi-spacing': ['warn', { before: false, after: true }],
    quotes: ['warn', 'single', { avoidEscape: true }],
    'no-multi-spaces': ['warn', { ignoreEOLComments: true }],
    'no-trailing-spaces': ['warn', { skipBlankLines: true }],
    'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
    'no-whitespace-before-property': 'warn',
    'no-console': ['warn'],
    'no-unused-vars': ['warn', { args: 'none' }],
    'prettier/prettier': 'warn',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
};
