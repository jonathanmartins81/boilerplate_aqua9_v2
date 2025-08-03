import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // ===== GLOBAIS DO BROWSER =====
        React: 'readonly',
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        URL: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        navigator: 'readonly',
        performance: 'readonly',
        crypto: 'readonly',

        // ===== ELEMENTOS HTML =====
        HTMLMetaElement: 'readonly',
        HTMLLinkElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLFormElement: 'readonly',
        HTMLImageElement: 'readonly',
        HTMLAnchorElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        HTMLSelectElement: 'readonly',
        HTMLOptionElement: 'readonly',
        HTMLCanvasElement: 'readonly',
        HTMLVideoElement: 'readonly',
        HTMLAudioElement: 'readonly',

        // ===== TIPOS DE ARQUIVO =====
        File: 'readonly',
        FileList: 'readonly',
        FileReader: 'readonly',
        Blob: 'readonly',

        // ===== OBSERVADORES =====
        IntersectionObserver: 'readonly',
        IntersectionObserverInit: 'readonly',
        PerformanceObserver: 'readonly',
        ResizeObserver: 'readonly',
        MutationObserver: 'readonly',

        // ===== ENCODING =====
        TextEncoder: 'readonly',
        TextDecoder: 'readonly',

        // ===== TIMERS =====
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',

        // ===== EVENTOS =====
        Event: 'readonly',
        EventTarget: 'readonly',
        CustomEvent: 'readonly',

        // ===== NODE.JS =====
        NodeJS: 'readonly',
        global: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',

        // ===== URL E PARÂMETROS =====
        URLSearchParams: 'readonly',
        URLPattern: 'readonly',

        // ===== WEB APIs =====
        AbortController: 'readonly',
        AbortSignal: 'readonly',
        Headers: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        FormData: 'readonly',

        // ===== STORAGE =====
        Storage: 'readonly',

        // ===== WEB WORKERS =====
        Worker: 'readonly',
        SharedWorker: 'readonly',

        // ===== WEB SOCKETS =====
        WebSocket: 'readonly',

        // ===== MEDIA =====
        MediaDevices: 'readonly',
        MediaRecorder: 'readonly',

        // ===== NOTIFICATIONS =====
        Notification: 'readonly',

        // ===== GEOLOCATION =====
        Geolocation: 'readonly',
        Position: 'readonly',
        PositionError: 'readonly',

        // ===== VITEST =====
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
    },
    settings: {
      react: {
        version: '19.0.0',
      },
    },
    rules: {
      // ===== CONFIGURAÇÕES BASE =====
      ...typescriptPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

      // ===== TYPESCRIPT =====
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-var-requires': 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // ===== REACT =====
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-danger': 'warn',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-unescaped-entities': 'warn',
      'react/no-unknown-property': 'error',
      'react/no-unsafe': 'error',
      'react/self-closing-comp': 'error',

      // ===== REACT HOOKS =====
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ===== GERAL =====
      'no-console': 'warn',
      'no-var': 'error',
      'no-unused-vars': 'off', // Desabilitado em favor do TypeScript
      'no-undef': 'error',
      'no-redeclare': 'error',
      'no-unreachable': 'error',
      'no-constant-condition': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-else-if': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'warn',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-func-assign': 'error',
      'no-import-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-obj-calls': 'error',
      'no-sparse-arrays': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable-loop': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'test-results/**',
      'playwright-report/**',
      'storybook-static/**',
      '*.config.ts',
      '!.storybook',
      '!.jest',
      'generators/**',
      'scripts/**',
      'docs/**',
      'public/**',
    ],
  },
];
