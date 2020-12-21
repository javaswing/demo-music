module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
   'airbnb',
   'prettier',
   'plugin:react/recommended',
   'plugin:import/typescript',
   'prettier/react',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
      }
    }
  },
   // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
   overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 2,
      },
    },
    {
      files: ['*.md'],
      globals: {
        React: true,
        ReactDOM: true,
        mountNode: true,
      },
      rules: {
        indent: 0,
        'no-console': 0,
        'no-plusplus': 0,
        'eol-last': 0,
        'no-script-url': 0,
        'prefer-rest-params': 0,
        'react/no-access-state-in-setstate': 0,
        'react/destructuring-assignment': 0,
        'react/no-multi-comp': 0,
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
  rules: {
    // 关闭对于jsx扩展名的检测
    'react/jsx-filename-extension': 0,
    'import/extensions': 0,
    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
  },
};
