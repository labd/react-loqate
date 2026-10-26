import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  // Keep the file names referenced by package.json:
  // dist/index.js (esm), dist/index.cjs (cjs), dist/index.d.ts, dist/index.d.cts
  // and dist/index.css
  fixedExtension: false,
  platform: 'neutral',
  // Keep `require('react-loqate').default` working like the tsup build did
  cjsDefault: false,
  target: 'es2020',
  css: { fileName: 'index.css', transformer: 'postcss' },
});
