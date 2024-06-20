# React-Loqate

This is a React implementation of the loqate APIs. It features an input, typing in which will result in a list of address options. Clicking an option will trigger your callback with that option.

## Usage

### Notes

You must [polyfill fetch](https://www.npmjs.com/package/whatwg-fetch).

### Installation

```bash
npm install react-loqate
```

### Example

```javascript
import AddressSearch from 'react-loqate';
// to use the default styles for the default components
import 'react-loqate/dist/index.css';

// ...
<AddressSearch
  locale="en-GB"
  apiKey="AA11-AA11-AA11-AA11"
  onSelect={(address) => console.log(address)}
/>;
// ...
```

### Props

| name       | type                                                  | required | example                                                             | description                                                                                       |
| ---------- | ----------------------------------------------------- | -------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| apiKey     | string                                                | yes      | "AA11-AA11-AA11-AA11"                                               | Loqate API key                                                                                    |
| locale     | string                                                | yes      | "en-GB"                                                             | Language to be used                                                                               |
| onSelect   | (address) => void                                     | yes      | address => console.log(address)                                     | Callback with for Loqate response                                                                 |
| countries  | string[]                                              | no       | ["GB", "NL"]                                                        | Countries to search in                                                                            |
| limit      | number                                                | no       | 10                                                                  | Number of options to show                                                                         |
| classes    | `{ input?: string, list?: string, listItem?: string}` | no       | { list: 'list' }                                                    | Classnames for the components                                                                     |
| components | see [Customization](#Customization)                   | no       | { Input: CustomInput, List: CustomList, ListItem: CustomListItem, } | Components to overwrite the default ones                                                          |
| inline     | boolean                                               | no       | true                                                                | Render results inline with the input                                                              |
| debounce   | number                                                | no       | 100                                                                 | Debounce the calls to the Loqate API                                                              |
| bias       | boolean                                               | no       | true                                                                | Bias feature when using capture v4 enabled key.<br>Requires origin to be set.                     |
| origin     | string                                                | no       | "93.184.216.34"                                                     | Name or ISO 2 or 3 character code of a country, WGS84 coordinates (comma separated) or IP address |

### Customization

You can either style the default input, list and listitem with their respective classes or replace them completely by passing in your own components in the components prop.

**Custom Input and List components must forward a ref!**

**All custom components must pass down their props!**

```javascript
import React from 'react';
import AddressSearch from 'react-loqate';

<AddressSearch
  // ...
  components={{
    List: forwardRef(({ className, ...rest }, ref) => (
      <ul
        className={clsx('react-loqate-default-list', className)}
        ref={ref}
        // ...
        {...rest}
      />
    )),
    ListItem: ({ suggestion, ...rest }) => (
      <li
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = e.target.nextSibling;
            if (next) {
              next.focus();
            }
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            const previous = e.taget.previousSibling;
            if (previous) {
              previous.focus();
            }
          }
        }}
        {...rest}
      >
        `${suggestion.Text} ${suggestion.Description}`
      </li>
    ),
  }}
  classes={{ Input: classes.input }}
/>;
```

### Errors

Two types of errors can be thrown, LoqateError and ReactLoqateError.
Loqate Errors are errors from the Loqate API. Their structure, causes and resolutions can be [found in the loqate docs](https://www.loqate.com/developers/api/generic-errors/).

Currently only one ReactLoqateError can be thrown. This error occurs when the Retrieve API returns an empty Items array after querying it with an existing ID.

It is on you as the implementing party to catch and handle these errors.

### Contributing

This codebases use [@changesets](https://github.com/changesets/changesets) for release and version management

- Create a feature branch with new features / fixes
- When your code changes are complete, add a changeset file to your feature branch using `pnpm changeset`
- Create a PR to request your changes to be merged to main
- After your PR is merged, GitHub actions will create a release PR or add your changeset to an existing release PR
- When the release is ready merge the release branch. A new version will automatically be released.
