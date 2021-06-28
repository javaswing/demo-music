module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    "plugin:@typescript-eslint/eslint-recommended", // eslint 处理typescript格式
    "plugin:@typescript-eslint/recommended",
    'plugin:react/recommended', // eslint处理react代码格式 https://github.com/yannickcr/eslint-plugin-react
    'plugin:import/errors', // https://www.npmjs.com/package/eslint-plugin-import
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint', // 如果eslint和prettier有冲突，以prettier为主
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  settings: { // 自动发现react版本
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
  parserOptions: { // 指定eslint可以解析的jsx语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
   // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
   overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [1, { args: 'none', "argsIgnorePattern": "^_" }],
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['*.ts'],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": 0 // 函数的返回值类型一定要写 only ts
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
        'indent':0,
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
    'react-hooks/exhaustive-deps': [1, { enableDangerousAutofixThisMayCauseInfiniteLoops: true }],
    '@typescript-eslint/no-explicit-any': 0, // close use any typess
    'import/extensions': 0,
    'import/no-cycle': 0,
    'import/order': ['error', { // 排序import引入顺序
      'pathGroups': [
        {
          "pattern": "~/**",
          "group": "external"
        },
        {
          "pattern": "@/**",
          "group": "external",
          "position": "after"
        },
        {
          pattern: '.\/*.scss',
          group: 'object',
        },
      ]
    }],

    "import/no-unresolved": [
      2,
      {
          "ignore": ["^@/"] // @ 是设置的路径别名
      },
    ],

    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': [2, { ignoreTypeValueShadow: true }],
    // https://github.com/typescript-eslint/typescript-eslint/issues/2528#issuecomment-689369395
    'no-undef': 0,
    "@typescript-eslint/explicit-module-boundary-types": "off",
    '@typescript-eslint/no-empty-function': 0, // 关闭ts空方法检测
    'import/order': [
      'warn',
      {
        pathGroups: [
          {
            pattern: '~/**',
            group: 'external',
          },
          {
            pattern: '@/**',
            patternOptions: {
              nocomment: false,
            },
            group: 'external',
            position: 'after',
          },
          {
            pattern: './*.scss',
            group: 'object',
          },
          {
            pattern: './*.less',
            group: 'object',
          },
          {
            pattern: './*.css',
            group: 'object',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ]
  },
};
