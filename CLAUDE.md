# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `react-loqate`, a React component library for Loqate address search API integration. The main component is `AddressSearch` which provides an input field with dropdown suggestions that integrates with Loqate's address lookup services.

## Development Commands

### Building and Development

- `pnpm build` - Build the library using tsup (ESM, CJS formats with TypeScript declarations)
- `pnpm dev` - Start Storybook development server on port 6006
- `pnpm check` - Run linting and type checking (used by pre-commit hook)

### Testing and Quality Assurance

- `pnpm test` - Run tests with Vitest in watch mode
- `pnpm test:ci` - Run tests once for CI
- `pnpm lint` - Run ESLint and Prettier checks
- `tsc` - Run TypeScript compiler for type checking

### Publishing

- `pnpm changeset` - Create a changeset for version management
- `pnpm publish:ci` - Build and publish to npm (CI only)

## Architecture

### Main Component Structure

- **Main Component**: `src/index.tsx` contains the `AddressSearch` component
- **Default Components**: Located in `src/components/` - `DefaultInput`, `DefaultList`, `DefaultListItem`
- **API Layer**: `src/utils/Loqate.ts` handles all API communication with Loqate services
- **Custom Hooks**: `src/utils/useDebounceEffect.ts` for debouncing user input

### Key Design Patterns

- **Component Composition**: Supports custom components via `components` prop (Input, List, ListItem)
- **Portal Rendering**: Uses MUI Base Portal for dropdown positioning (can be disabled with `inline` prop)
- **Error Handling**: Two error types - `LoqateError` (API errors) and `ReactLoqateError` (client errors)
- **Debouncing**: Built-in debounced API calls (default/configurable timeout)

### API Integration

The component integrates with two Loqate API endpoints:

- **Find API**: Search for address suggestions based on text input
- **Retrieve API**: Get full address details when user selects a suggestion

### Dependencies

- **Core**: React 18+, MUI Base (for Portal/ClickAwayListener), clsx for class management
- **Build**: tsup for bundling, TypeScript for types
- **Testing**: Vitest with jsdom, React Testing Library
- **Development**: Storybook for component development, ESLint + Prettier for code quality

## Testing

Tests use Vitest with React Testing Library and jsdom environment. Test files are located in:

- `src/index.test.tsx` - Main component tests
- `src/utils/__tests__/` - Utility function tests

Coverage is configured to include all TypeScript files in the `src/` directory.

## Configuration Notes

- **TypeScript**: Strict mode enabled with comprehensive type checking
- **ESLint**: Uses recommended rules + TypeScript + Storybook plugins
- **Prettier**: Configured for 80-character lines, semicolons, single quotes
- **Husky**: Pre-commit hook runs `pnpm check`
- **Package Manager**: Uses pnpm with lockfile

## Release Management

Uses Changesets for version management:

1. Create feature branch with changes
2. Add changeset with `pnpm changeset`
3. Create PR to main
4. GitHub Actions creates/updates release PR
5. Merge release PR triggers automated publishing
