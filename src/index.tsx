import React, { ChangeEvent, ComponentType, useRef, useState } from 'react';
import { ClickAwayListener, makeStyles, Portal } from '@material-ui/core';
import clsx from 'clsx';

interface Props {
  locale: string;
  apiKey: string;
  countries?: string[];
  limit?: number;
  onSelect: (address: any) => void;
  inputComponent?: ComponentType;
  listClassname?: string;
  listItemClassname?: string;
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
  root: (props: any) => ({
    backgroundColor: 'white',
    boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.08)',
    position: 'absolute',
    top: props.top,
    left: props.left,
    width: props.width,
    listStyleType: 'none',
  }),
  option: {
    cursor: 'pointer',
    marginTop: 4,
    marginBottom: 4,
  },
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
    inputComponent,
  } = props;
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const rect = inputRef?.current?.getBoundingClientRect();

  const classes = useStyles({
    top: rect?.bottom || 0,
    left: rect?.left || 0,
    width: rect?.width || undefined,
  });

  const selectSuggestion = async (sug: Item) => {
    if (sug.Type === 'Address') {
      const url = `https://api.addressy.com/Capture/Interactive/Retrieve/v1/json3.ws?Key=${apiKey}&Id=${sug.Id}`;
      const res = await fetch(url).then((response: Response) =>
        response.json()
      );
      if (res.Items.length) setSuggestions([]);
      onSelect(res.Items[0]);
    } else {
      const value = inputRef.current?.value || '';
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
      const res = await fetch(url).then((response: Response) =>
        response.json()
      );
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

  const InputComponent = inputComponent || 'input';

  return (
    <>
      <InputComponent onChange={handleChange} ref={inputRef} />
      <Portal container={document.body}>
        <ClickAwayListener onClickAway={() => setSuggestions([])}>
          <ul
            hidden={!suggestions.length}
            className={clsx(classes.root, listClassname)}
          >
            {suggestions.map(sug => (
              <li
                key={sug.Id}
                onClick={() => selectSuggestion(sug)}
                className={clsx(classes.option, listItemClassname)}
              >
                {sug.Text} {sug.Description}
              </li>
            ))}
          </ul>
        </ClickAwayListener>
      </Portal>
    </>
  );
};

export default AddressSearch;
