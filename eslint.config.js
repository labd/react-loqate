// ESLint only runs the Storybook plugin rules; everything else is linted by Biome.
import tsParser from '@typescript-eslint/parser';
import storybook from 'eslint-plugin-storybook';

export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: { parser: tsParser },
  },
  ...storybook.configs['flat/recommended'],
];
