# Change log

## 3.1.0

### Minor Changes

- d9b43f7: Add disableBrowserAutocomplete prop to prevent browser autocomplete interference with address suggestions. This prop defaults to true, disabling browser autocomplete by setting autoComplete="react-loqate-address-search" on the input field.
- 2c987f0: Implement Bias and Origin parameters for use with capture v4 key
- 9724fa7: Replace @mui/base with native React implementations

  Removes the @mui/base dependency by implementing native React versions of Portal and ClickAwayListener components. This reduces bundle size and eliminates external dependencies while maintaining full functionality and compatibility.
  - Created native Portal component using React's createPortal
  - Created native ClickAwayListener component using DOM event listeners
  - Added comprehensive test coverage for both new utility components
  - All existing functionality preserved with no breaking changes

### Patch Changes

- a132960: - Fix focus being lost when input value is set from external state
- 6bbbfb3: Reorganize test file structure for improved maintainability. Move test files from nested `__tests__` directories to cleaner locations, consolidate fixtures and snapshots in dedicated testing folders, and update import paths accordingly.
- e9a11d3: Update test dependencies and fix all test warnings

## 3.0.1

### Patch Changes

- 13efaee: fix: empty the suggestions list when a selection is made

## 3.0.0

### Major Changes

- 5fa9eec: Breaking: implement LoqateError and ReactLoqateError

### Minor Changes

- 229fd80: chore: move to loqate retrieve api v1.2

## 2.0.2

### Patch Changes

- 5b06f7c: update readme

## 2.0.1

### Patch Changes

- 1bfd4d0: Add access: public to publishConfig

## 2.0.0

### Major Changes

- 67a16bd:
  - BREAKING: default styling in 'react-loqate/dist/react-loqate.cjs.development.css' was moved to 'react-loqate/dist/index.css'
  - BREAKING: now returns full error object from Loqate API instead of just the error code
  - updated all tooling & CI/CD
- db44798:
  - BREAKING: remove wrapping div and the corresponding `className` input
  - BREAKING: custom input components now need to accept a forwarded ref
  - updated and expanded tests
  - updated readme

### Minor Changes

- 8714357: Allow for async loqate errors to be caught by error boundaries
- 93ce941: Tab now targets the first element in the suggestion list. User can then use arrow keys to navigate through list.

### Patch Changes

- 4ffb977: Aria label of default list item component now contains full address rather than just the search term

## [1.3.0]

- replace axios dependency with native fetch

## [1.2.0]

- clear suggestions list when pressing 'Escape' on input or list item

## [1.1.0]

- make DefaultListItem tab selectable
- trigger Item select onKeyDown 'Enter'

## [1.0.2]

- accept locale formatted as both `en_GB` and `en-gb`. Including the iso standard of `en-GB` in readme.
- update readme

## [1.0.1]

### Breaking

- Moved from material ui styling to css files. In order to use the default styles, you will need to import the css file from `'react-loqate/dist/react-loqate.cjs.development.css'`.
- Moved the individual className props to a shared `classes` prop

### Other

- Moved from @material-ui to @mui/base for utilities
