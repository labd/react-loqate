# React-Locate

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

// ...

<AddressSearch
  locale="en-GB"
  apiKey="AA11-AA11-AA11-AA11"
  onSelect={(address) => console.log(address)}
/>;
```

### Props

| name       | type                                                  | required | example                             | description                              |
| ---------- | ----------------------------------------------------- | -------- | ----------------------------------- | ---------------------------------------- |
| apiKey     | string                                                | yes      | "AA11-AA11-AA11-AA11"               | Loqate API key                           |
| locale     | string                                                | yes      | "en-GB"                             | Language to be used                      |
| onSelect   | (address) => void                                     | yes      | address => console.log(address)     | Callback with for Loqate response        |
| countries  | string[]                                              | no       | ["GB", "NL"]                        | Countries to search in                   |
| limit      | number                                                | no       | 10                                  | Number of options to show                |
| className  | string                                                | no       | "address-search-box"                | Classname for the component wrapper      |
| classes    | `{ input?: string, list?: string, listItem?: string}` | no       | { list: 'list' }                    | Classnames for the components            |
| components | see [Customization](#Customization)                   | no       | see [Customization](#Customization) | Components to overwrite the default ones |
| inline     | boolean                                               | no       | true                                | Render results inline with the input     |
| debounce   | number                                                | no       | 100                                 | Debounce the calls to the Loqate API     |

### Customization

You can either style the default input, list and listItem with their respective classes or replace them completely by passing in your own components in the components prop.

List component must be able to accept a ref!
All components must pass down their props!

```javascript
import React from 'react';
import AddressSearch from 'react-loqate';
// to use the default styles for the default components
import 'react-loqate/dist/react-loqate.cjs.development.css';

const AddressSearchInput = (props): JSX.Element => {
  return (
    <input
      placeholder={'start typing your address or postcode'}
      autocomplete="chrome-off"
      {...props}
    />
  );
};

<AddressSearch
  locale="en-GB"
  apiKey="AA11-AA11-AA11-AA11"
  countries={['GB']}
  components={{ Input: AddressSearchInput }}
  className="address-search-box"
  classes={{ list: 'styled-list' }}
  onSelect={(address) => console.log(address)}
  inline
  debounce={100}
/>;
```
