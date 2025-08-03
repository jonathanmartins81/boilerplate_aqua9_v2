import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: './.vitest/setup.ts',
    globals: true,
    css: true,
    include: [
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'tests/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: [
      '**/node_modules/**',
      '**/tests/e2e/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '**/coverage/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '.next/',
        'coverage/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/stories/**',
        '**/*.stories.*',
        '**/__snapshots__/**',
        '**/*.snap',
        '**/setupTests.*',
        '**/.vitest/**',
        '**/generators/**',
        '**/public/**',
        '**/src/types/**',
        '**/src/app/layout.tsx',
        '**/src/app/providers.tsx',
        '**/src/app/robots.ts',
        '**/src/app/sitemap.ts',
        '**/src/app/globals.css',
        '**/src/app/not-found.tsx',
        '**/src/app/error.tsx',
        '**/src/app/global-error.tsx',
        '**/tests/e2e/**',
        '**/playwright-report/**',
        '**/test-results/**',
        '**/docs/**',
        '**/*.md',
        '**/package.json',
        '**/package-lock.json',
        '**/tsconfig.json',
        '**/tsconfig.tsbuildinfo',
        '**/next.config.js',
        '**/tailwind.config.ts',
        '**/postcss.config.js',
        '**/eslint.config.js',
        '**/vitest.config.ts',
        '**/playwright.config.ts',
        '**/lefthook.yml',
        '**/.prettierrc.json',
        '**/.editorconfig',
        '**/.gitignore',
        '**/README.md',
        '**/PACKAGE.md',
      ],
      thresholds: {
        global: {
          branches: 30,
          functions: 30,
          lines: 30,
          statements: 30,
        },
      },
    },
    // Configurações de performance
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    // Timeout para testes
    testTimeout: 10000,
    hookTimeout: 10000,
    // Configurações de relatórios
    reporters: ['default'],
  },
  // Configurações do Vite
  define: {
    'process.env.NODE_ENV': '"test"',
  },
  // Otimizações de build
  build: {
    target: 'esnext',
    minify: false,
    sourcemap: true,
  },
});
