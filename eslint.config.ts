import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/**
 * O que sobrou de código executável no projeto é a função de contato em `api/`
 * e os utilitários de build em `scripts/`. Não há mais React, JSX nem
 * importação automática, então as regras e os globais daquele mundo saíram
 * junto — configuração que descreve um projeto que não existe mais atrapalha
 * mais do que ajuda.
 */
export default [
  { ignores: ['node_modules', 'out', 'public'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['api/**/*.ts', 'scripts/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-undef': 'error',
    },
  },
]
