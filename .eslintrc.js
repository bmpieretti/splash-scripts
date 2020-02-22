module.exports = {
  extends: ['airbnb-base', 'plugin:node/recommended', 'prettier'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': 'error',
    'import/named': 0,
    'comma-dangle': ['error', 'never'],
    'import/prefer-default-export': ['off'],
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