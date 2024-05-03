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

| name       | type                                                  | required | example                                                             | description                              |
| ---------- | ----------------------------------------------------- | -------- | ------------------------------------------------------------------- | ---------------------------------------- |
| apiKey     | string                                                | yes      | "AA11-AA11-AA11-AA11"                                               | Loqate API key                           |
| locale     | string                                                | yes      | "en-GB"                                                             | Language to be used                      |
| onSelect   | (address) => void                                     | yes      | address => console.log(address)                                     | Callback with for Loqate response        |
| countries  | string[]                                              | no       | ["GB", "NL"]                                                        | Countries to search in                   |
| limit      | number                                                | no       | 10                                                                  | Number of options to show                |
| classes    | `{ input?: string, list?: string, listItem?: string}` | no       | { list: 'list' }                                                    | Classnames for the components            |
| components | see [Customization](#Customization)                   | no       | { Input: CustomInput, List: CustomList, ListItem: CustomListItem, } | Components to overwrite the default ones |
| inline     | boolean                                               | no       | true                                                                | Render results inline with the input     |
| debounce   | number                                                | no       | 100                                                                 | Debounce the calls to the Loqate API     |

### Customization

You can either style the default input, list and listitem with their respective classes or replace them completely by passing in your own components in the components prop.

**Input and List components must be able to accept a ref, either through using forwardRef or being a base html element**

**All custom components must pass down their props!**

```javascript
import React from 'react';
import AddressSearch from 'react-loqate';

<AddressSearch
  // ...
  components={{
    Input: (props) => <input {...props} />,
    List: forwardRef((props, ref) => {
      const { className, ...rest } = props;
      // ..
      return (
        <ul
          className={clsx('react-loqate-default-list', className)}
          ref={ref}
          {...rest}
        />
      );
    }),
  }}
  classes={{ listItem: 'styled-list-item' }}
/>;
```

### Contributing

This codebases use [@changesets](https://github.com/changesets/changesets) for release and version management

- Create a feature branch with new features / fixes
- When your code changes are complete, add a changeset file to your feature branch using `pnpm changeset`
- Create a PR to request your changes to be merged to main
- After your PR is merged, GitHub actions will create a release PR or add your changeset to an existing release PR
- When the release is ready merge the release branch. A new version will automatically be released.
