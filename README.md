# React-Locate

## Introduction

This is a React implementation of the loqate APIs.

## Usage

### Notes

You must [polyfill fetch](https://www.npmjs.com/package/whatwg-fetch).

### Props

| name              | type                | required | example                         | description                                                              |
| ----------------- | ------------------- | -------- | ------------------------------- | ------------------------------------------------------------------------ |
| apiKey            | string              | yes      | "AA11-AA11-AA11-AA11"           | Loqate API key                                                           |
| locale            | string              | yes      | "en_GB"                         | Language to be used                                                      |
| onSelect          | (address) => void   | yes      | address => console.log(address) | Callback with for Loqate response                                        |
| countries         | string[]            | no       | ["GB", "NL"]                    | Countries to search in                                                   |
| inputComponent    | React.ComponentType | no       | MyInputComponent                | Your own input component if you dont want to use the standard html input |
| limit             | number              | no       | 10                              | Number of options to show                                                |
| listClassName     | string              | no       | "address-options"               | Classname for the list                                                   |
| listItemClassName | string              | no       | "address-option"                | Classname for the list items                                             |
