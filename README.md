# React-Locate

This is a React implementation of the loqate APIs. It features an input, typing in which will result in a list of address options. Clicking an option will trigger your callback with that option

## Usage

### Notes

You must [polyfill fetch](https://www.npmjs.com/package/whatwg-fetch).

### Props

| name              | type                                | required | example                             | description                              |
| ----------------- | ----------------------------------- | -------- | ----------------------------------- | ---------------------------------------- |
| apiKey            | string                              | yes      | "AA11-AA11-AA11-AA11"               | Loqate API key                           |
| locale            | string                              | yes      | "en_GB"                             | Language to be used                      |
| onSelect          | (address) => void                   | yes      | address => console.log(address)     | Callback with for Loqate response        |
| countries         | string[]                            | no       | ["GB", "NL"]                        | Countries to search in                   |
| limit             | number                              | no       | 10                                  | Number of options to show                |
| inputClassname    | string                              | no       | "address-input"                     | Classname for the input                  |
| listClassname     | string                              | no       | "address-options"                   | Classname for the list                   |
| listItemClassname | string                              | no       | "address-option"                    | Classname for the list items             |
| components        | see [Customization](#Customization) | no       | see [Customization](#Customization) | Components to overwrite the default ones |

### Customization

You can either style the existing input, list and listItem with their respective classes or replace them completely by passing in your own components in the components prop.

List component must be able to accept a ref!
All components must pass down their props!

```javascript
import React from 'react';

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
  locale="en_GB"
  apiKey="AA11-AA11-AA11-AA11"
  countries={['GB']}
  components={{ Input: AddressSearchInput }}
  listItemClassname="list-item"
  onSelect={address => console.log(address)}
/>;
```
