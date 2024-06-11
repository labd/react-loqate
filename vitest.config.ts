import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 5000,
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    },
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      '~src': path.join(__dirname, 'src'),
    },
  },
});
