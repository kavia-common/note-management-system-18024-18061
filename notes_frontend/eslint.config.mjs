/* eslint.config.mjs */
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,

  // TypeScript support
  ...tseslint.configs.recommended,

  // Ignore Astro's generated type folders and build output
  {
    ignores: [
      '.astro/**',
      'dist/**',
      'node_modules/**',
    ],
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Don't use project-based rules to avoid requiring full TS project type info on generated files
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Allow "any" in UI scripts where necessary
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      // Astro generated d.ts uses triple-slash; disable this rule globally
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  // JS files config
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'eqeqeq': ['error', 'always'],
    },
  },
];
