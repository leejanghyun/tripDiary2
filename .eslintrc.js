/* eslint-env node */
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    'jest/globals': true,
  },
  // ts/tsx 파일 설정 별도 묶음 처리
  "overrides": [
    {
      "files": "**/*.+(ts|tsx)",
      "parser": "@typescript-eslint/parser",
      extends: [
        'airbnb-typescript',
      ],
      "plugins": ["@typescript-eslint"],
      parserOptions: {
        project: ['./tsconfig.json']
      },
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': OFF,
        '@typescript-eslint/no-empty-interface': OFF,
        '@typescript-eslint/no-var-requires': OFF,
        '@typescript-eslint/semi': [ERROR, 'never'],
        '@typescript-eslint/no-use-before-define': OFF,
        '@typescript-eslint/no-shadow': OFF,
        '@typescript-eslint/naming-convention': OFF,
        '@typescript-eslint/type-annotation-spacing': [WARN],
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: [ 'simple-import-sort', '@emotion', 'jest', 'jest-dom'],
  extends: ['airbnb', 'airbnb/hooks', 'next/core-web-vitals', 'plugin:storybook/recommended','plugin:jest/recommended'],
  rules: {
    semi: [ERROR, 'never'],
    quotes: [WARN, 'single'],
    'jest/no-mocks-import': OFF,
    'arrow-body-style': OFF,
    'no-restricted-exports': OFF,
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true
    }],
    'no-debugger': OFF,
    'import/export': OFF,
    "import/order": OFF,
    'import/extensions': OFF,
    'import/prefer-default-export': OFF,
    'no-nested-ternary': OFF,
    'no-underscore-dangle': OFF,
    'react/require-default-props': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/jsx-uses-react': OFF,
    'react/react-in-jsx-scope': OFF,
    'react/prop-types': OFF,
    'react/jsx-wrap-multilines': [WARN, {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line'
    }],
    'react/jsx-max-props-per-line': [WARN, {
      maximum: 1
    }],
    'react/no-array-index-key': OFF,
    "react/no-unknown-property": [ERROR, { "ignore": ["css"] }],
    'react/jsx-closing-bracket-location': WARN,
    'react/jsx-closing-tag-location': WARN,
    'react/jsx-first-prop-new-line': WARN,
    'react/self-closing-comp': [WARN, {
      component: true,
      html: true
    }],
    'react/jsx-indent': [WARN, 2],
    'react/jsx-one-expression-per-line': OFF,
    'jsx-a11y/anchor-is-valid': [ERROR, {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['invalidHref', 'preferButton']
    }],
    'jsx-a11y/label-has-associated-control': [ERROR, {
      "labelComponents": ["CustomLabel"],
      "labelAttributes": ["inputLabel"],
      "controlComponents": ["CustomInput"],
      "assert": "nesting",
      "depth": 3
    }],
    'simple-import-sort/imports': WARN,
    'simple-import-sort/exports': WARN,
    '@next/next/no-img-element': OFF,
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.tsx',
          '**/*.@(spec|test).@(js|ts)?(x)',
          '**/jest.setup.ts',
          '**/.storybook/*.@(js|ts)?(x)',
          '**/webpack.*.js',
        ],
      },
    ],
  }
};
