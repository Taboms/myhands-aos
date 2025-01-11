module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    '@react-native',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  rules: {
    'react-native/no-inline-styles': 'off', // 인라인 스타일 허용
    "import/no-named-as-default": "off",
    // React
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-no-useless-fragment': 'warn', // 불필요한 fragment 제거

    // React Hooks
    'react-hooks/rules-of-hooks': 'error', // React Hooks 규칙 강제
    'react-hooks/exhaustive-deps': 'warn', // React Hooks의 의존성 배열 검증

    // TypeScript
    '@typescript-eslint/explicit-function-return-type': 'off', // 반환 타입 명시를 강제하지 않음
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 모듈 경계 타입 명시를 강제하지 않음
    '@typescript-eslint/no-explicit-any': 'warn', // any 타입 사용을 경고
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {args: 'none', argsIgnorePattern: '^_'}, // `_`로 시작하는 변수는 무시
    ],
    '@typescript-eslint/consistent-type-definitions': 'off', // 타입 정의 시 interface 사용 강제
    '@typescript-eslint/no-non-null-assertion': 'error', // Non-null assertion을 금지
    '@typescript-eslint/no-inferrable-types': 'error', // 명시적으로 타입을 지정하지 않아도 되는 경우 타입 지정 금지

    // 코드 품질 관련 규칙
    'no-console': ['warn', {allow: ['error']}], // console 사용 시 경고, error 허용
    'no-debugger': 'error',
    'no-duplicate-imports': 'error',
    'prefer-const': 'error', // 변경되지 않는 변수는 const로 선언 강제
    eqeqeq: ['error', 'always'], // 동등 비교 시 '===' 사용 강제

    // Import 관련 규칙
    'import/order': [
      'error',
      {
        pathGroups: [
          {pattern: 'react*', group: 'builtin', position: 'before'},
          {pattern: 'react-native', group: 'external', position: 'after'},
          {pattern: '@src/**', group: 'external', position: 'after'},
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {order: 'asc'},
      },
    ],
    // Prettier
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      'babel-module': {
        alias: {
          '@': './src',
        },
      }, // babel-module resolver 추가
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['.eslintrc.js'],
};