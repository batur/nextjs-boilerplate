/* eslint-disable @typescript-eslint/naming-convention */
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import globals from 'globals';
import react from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ['**/node_modules', '**/.next', '**/out']
  },
  ...fixupConfigRules(
    compat.extends(
      'next',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'next/core-web-vitals',
      'plugin:compat/recommended',
      'prettier'
    )
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      '@typescript-eslint': fixupPluginRules(typescriptEslint)
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        tsconfigRootDir: '.',
        project: './tsconfig.json'
      }
    },
    settings: {
      next: {
        rootDir: '.'
      }
    },
    rules: {
      'no-console': 'error',
      'import/prefer-default-export': 'off',
      'react/require-default-props': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function'
        }
      ],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase']
        },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE']
        },
        {
          selector: 'typeLike',
          format: ['PascalCase']
        },
        {
          selector: 'objectLiteralProperty',
          format: null
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        }
      ],
      'consistent-return': 'warn',
      'react/no-unstable-nested-components': 'warn',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ],

      '@typescript-eslint/explicit-function-return-type': 'off',
      'import/no-anonymous-default-export': [
        'error',
        {
          allowArray: true,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowCallExpression: true,
          allowNew: false,
          allowLiteral: false,
          allowObject: true
        }
      ],
      'import/order': [
        'error',
        {
          alphabetize: { order: 'desc', caseInsensitive: true, orderImportKind: 'desc' },
          groups: ['builtin', 'external', 'internal', 'parent', ['index', 'sibling'], 'object'],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@**',
              group: 'internal'
            },
            {
              pattern: '@env',
              group: 'internal'
            },
            {
              pattern: 'react',
              group: 'builtin'
            },
            {
              pattern: 'next',
              group: 'builtin'
            },
            {
              pattern: 'next/**',
              group: 'builtin'
            }
          ],
          distinctGroup: false,
          pathGroupsExcludedImportTypes: []
        }
      ]
    }
  }
];
