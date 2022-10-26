# Change log

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
