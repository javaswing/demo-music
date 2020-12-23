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
    react: {
      version: "detect"
    },
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
        '@typescript-eslint/no-unused-vars': [2, { args: 'none', "argsIgnorePattern": "^_" }],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 2,
      },
    },
    {
      files: ['*.md'], // md检测
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
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-indent': 0,
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
    'react/state-in-constructor': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0, // TODO: remove later
    'react/require-default-props': 0,
    'react/sort-comp': 0,
    'react/display-name': 0,
    'react/static-property-placement': 0,
    'react/no-find-dom-node': 0,
    'react/no-unused-prop-types': 0,
    'react/default-props-match-prop-types': 0,
    'react-hooks/rules-of-hooks': 2, // Checks rules of Hooks

    'import/extensions': 0,
    'import/no-cycle': 0,

    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': [2, { ignoreTypeValueShadow: true }],
    // https://github.com/typescript-eslint/typescript-eslint/issues/2528#issuecomment-689369395
    'no-undef': 0,
  },
};
