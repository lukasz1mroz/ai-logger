module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
    'import',
    'jest',
    'testing-library',
    '@typescript-eslint',
  ],
  env: {
    'es6': true,
    'browser': true,
    'node': true,
    'jest/globals': true,
  },
  globals: {
    window: true,
    require: true,
    console: true,
  },
  rules: {
    'space-before-function-paren': 'off',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
}
