import React, { ChangeEvent, ComponentType, useRef, useState } from 'react';
import { ClickAwayListener, makeStyles, Portal } from '@material-ui/core';
import clsx from 'clsx';
import DefaultInput from './components/DefaultInput';
import DefaultList from './components/DefaultList';
import DefaultListItem from './components/DefaultListItem';
import axios, { AxiosResponse } from 'axios';

interface Props {
  locale: string;
  apiKey: string;
  countries?: string[];
  limit?: number;
  onSelect: (address: Address) => void;
  components?: Components;
  inputClassname?: string;
  listClassname?: string;
  listItemClassname?: string;
}

interface Components {
  Input?: ComponentType;
  List?: ComponentType;
  ListItem?: ComponentType;
}

export interface Address {
  AdminAreaCode: string;
  AdminAreaName: string;
  Barcode: string;
  Block: string;
  BuildingName: string;
  BuildingNumber: string;
  City: string;
  Company: string;
  CountryIso2: string;
  CountryIso3: string;
  CountryIsoNumber: number;
  CountryName: string;
  DataLevel: string;
  Department: string;
  District: string;
  DomesticId: string;
  Field1: string;
  Field2: string;
  Field3: string;
  Field4: string;
  Field5: string;
  Field6: string;
  Field7: string;
  Field8: string;
  Field9: string;
  Field10: string;
  Field11: string;
  Field12: string;
  Field13: string;
  Field14: string;
  Field15: string;
  Field16: string;
  Field17: string;
  Field18: string;
  Field19: string;
  Field20: string;
  Id: string;
  Label: string;
  Language: string;
  LanguageAlternatives: string;
  Line1: string;
  Line2: string;
  Line3: string;
  Line4: string;
  Line5: string;
  Neighbourhood: string;
  POBoxNumber: string;
  PostalCode: string;
  Province: string;
  ProvinceCode: string;
  ProvinceName: string;
  SecondaryStreet: string;
  SortingNumber1: string;
  SortingNumber2: string;
  Street: string;
  SubBuilding: string;
  Type: string;
}

const loqateLanguage = (language: string): string => {
  const [languageCode] = language.split('_');
  return languageCode;
};

interface Item {
  Id: string;
  Description: string;
  Type: string;
  Text: string;
  Highlight: string;
}

const useStyles = makeStyles({
  listPosition: (props: any) => ({
    position: 'absolute',
    top: props.top,
    left: props.left,
    width: props.width,
  }),
});

const AddressSearch = (props: Props): JSX.Element => {
  const {
    locale,
    countries,
    onSelect,
    limit,
    apiKey,
    listClassname,
    listItemClassname,
    inputClassname,
    components,
  } = props;
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const anchorRef = useRef<HTMLInputElement>(null);
  const rect = document.body
    .getElementsByClassName('react-loqate-list-anchor')[0]
    ?.getBoundingClientRect();

  const classes = useStyles({
    top: rect?.y + rect?.height + window.scrollY || 0,
    left: rect?.left || 0,
    width: rect?.width || undefined,
  });

  const selectSuggestion = async (sug: Item) => {
    if (sug.Type === 'Address') {
      const url = `https://api.addressy.com/Capture/Interactive/Retrieve/v1/json3.ws?Key=${apiKey}&Id=${sug.Id}`;
      const res = await axios
        .get(url)
        .then((response: AxiosResponse) => response.data);
      if (res.Items.length) setSuggestions([]);
      onSelect(res.Items[0]);
    } else {
      const value = anchorRef.current?.value || ''; 
      const sugs = await find(value, sug.Id);
      setSuggestions(sugs);
    }
  };

  const find = async (text: string, containerId?: string) => {
    const baseUrl = `https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws`;
    const countriesString = countries?.length
      ? `&Countries=${countries.join(',')}`
      : '';
    const limitString = limit ? `&limit=${limit}` : '';
    const keyString = `?Key=${apiKey}`;
    const textString = `&Text=${text}`;
    const containerString = containerId ? `&Container=${containerId}` : '';
    const languageString = `&Language=${loqateLanguage(locale)}`;

    const url =
      baseUrl +
      keyString +
      limitString +
      countriesString +
      languageString +
      containerString +
      textString;

    try {
      const res = await axios
        .get(url)
        .then((response: AxiosResponse) => response.data);
      if (res?.Items) return res.Items;
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const addressSearch = e.target.value;

    if (addressSearch === '') {
      setSuggestions([]);
    } else {
      const sugs = await find(addressSearch);
      setSuggestions(sugs);
    }
  };

  const Input = components?.Input || DefaultInput;
  const List = components?.List || DefaultList;
  const ListItem = components?.ListItem || DefaultListItem;

  return (
    <>
      <Input
        className={clsx(inputClassname, 'react-loqate-list-anchor')}
        onChange={handleChange}
      />
      <Portal container={document.body}>
        <ClickAwayListener onClickAway={() => setSuggestions([])}>
          <List
            hidden={!suggestions.length}
            className={clsx(classes.listPosition, listClassname)}
          >
            {suggestions.map(sug => (
              <ListItem
                key={sug.Id}
                onClick={() => selectSuggestion(sug)}
                className={listItemClassname}
                data-testid={`default-list-item-${sug.Id}`}
              >
                {sug.Text} {sug.Description}
              </ListItem>
            ))}
          </List>
        </ClickAwayListener>
      </Portal>
    </>
  );
};

export default AddressSearch;
