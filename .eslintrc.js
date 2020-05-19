module.exports = {
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/strict',
    'airbnb-base',
    'plugin:node/recommended',
    'prettier'
  ],
  plugins: ['jest', 'jest-formatting', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': 'error',
    'import/named': 0,
    'comma-dangle': 0,
    'import/prefer-default-export': 0,
    'node/no-unsupported-features/es-syntax': 0
  },
  env: {
    jest: true,
    node: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
}