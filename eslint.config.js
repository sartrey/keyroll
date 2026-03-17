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
    rules: {
      // 关闭 React 命名空间检查（React 17+ JSX transform 不需要）
      'react/react-in-jsx-scope': 'off',
      // 关闭常量命名规则，允许 API_VERSION 这样的常量
      '@typescript-eslint/naming-convention': 'off',
      // 关闭不必要的条件检查
      '@typescript-eslint/no-unnecessary-condition': 'off',
      // 关闭 explicit-function-return-type
      '@typescript-eslint/explicit-function-return-type': 'off',
      // 关闭 curly 规则
      curly: 'off',
      // 关闭 trailing comma 和 member-delimiter-style 等风格规则
      '@stylistic/comma-dangle': 'off',
      '@stylistic/member-delimiter-style': 'off',
      // 关闭 import/order
      'import/order': 'off',
      // 关闭 indent
      '@stylistic/indent': 'off',
      // 关闭 extra-parens
      '@stylistic/no-extra-parens': 'off',
      // 关闭 floating-promises
      '@typescript-eslint/no-floating-promises': 'off',
      // 关闭 no-explicit-any
      '@typescript-eslint/no-explicit-any': 'off',
      // 关闭 no-unsafe-member-access
      '@typescript-eslint/no-unsafe-member-access': 'off',
      // 关闭 no-non-null-assertion
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
    settings: {
      react: {
        version: '19.0',
      },
    },
  },
];
