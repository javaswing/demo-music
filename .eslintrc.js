module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
      }
    }
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      }
    ],
  },
};
