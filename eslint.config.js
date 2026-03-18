import eslintConfig from '@epiijs/eslint-config';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/*.js', '**/dist/**', '**/node_modules/**', '**/*.d.ts'],
  },
  ...eslintConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: '19.0',
      },
    },
    rules: {
      // React 17+ JSX transform 不需要 React in scope
      'react/react-in-jsx-scope': 'off',
    },
  },
];
