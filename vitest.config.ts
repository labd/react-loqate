import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  logLevel: 'warn',
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
    resolveSnapshotPath: (testPath: string, snapExtension: string) => {
      return path.join(
        __dirname,
        'src',
        'testing',
        'snapshots',
        path.basename(testPath) + snapExtension
      );
    },
  },
  resolve: {
    alias: {
      '~src': path.join(__dirname, 'src'),
    },
  },
});
