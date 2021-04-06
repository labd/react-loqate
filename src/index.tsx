import React, {
  ChangeEvent,
  ComponentType,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ClickAwayListener, makeStyles, Portal } from '@material-ui/core';
import clsx from 'clsx';
import DefaultInput from './components/DefaultInput';
import DefaultList from './components/DefaultList';
import DefaultListItem from './components/DefaultListItem';
import Loqate from './utils/Loqate';

export interface Props {
  locale: string;
  apiKey: string;
  countries?: string[];
  limit?: number;
  onSelect: (address: Address) => void;
  components?: Components;
  className?: string;
  inputClassname?: string;
  listClassname?: string;
  listItemClassname?: string;
  inline?: boolean;
}

interface Components {
  Input?: ComponentType;
  List?: ComponentType;
  ListItem?: ComponentType<{ suggestion: Item }>;
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

export interface Item {
  Id: string;
  Description: string;
  Type: 'Address' | 'Postcode' | 'Residential';
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

function AddressSearch(props: Props) {
  const {
    locale,
    countries,
    onSelect,
    limit,
    apiKey,
    className,
    listClassname,
    listItemClassname,
    inputClassname,
    components,
    inline,
  } = props;
  const loqate = useMemo(() => Loqate.create(apiKey), [apiKey]);

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [value, setValue] = useState('');

  const anchorRef = useRef<HTMLDivElement>(null);
  const rect = anchorRef.current?.getBoundingClientRect();

  const classes = useStyles({
    top: rect ? rect.y + rect.height + window.scrollY : 0,
    left: rect?.left || 0,
    width: rect?.width || undefined,
  });

  async function selectSuggestion({ Type, Id }: Item) {
    if (Type === 'Address') {
      const { data } = await loqate.retrieve(Id);
      const { Items = [] } = data;

      if (Items.length) {
        setSuggestions([]);
      }

      onSelect(Items[0]);
      return;
    }

    const items = await find(value, Id);
    setSuggestions(items);
  }

  const find = async (text: string, containerId?: string) => {
    try {
      const { data } = await loqate.find({
        countries,
        limit,
        text,
        containerId,
        language: loqateLanguage(locale),
      });

      if (data?.Items) {
        return data.Items;
      }
    } catch (err) {
      console.error(err);
    }

    return [];
  };

  const handleChange = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value: search } = target;

    setValue(search);

    if (search === '') {
      setSuggestions([]);
      return;
    }

    const suggestions = await find(search);
    setSuggestions(suggestions);
  };

  const Input = components?.Input ?? DefaultInput;
  const List = components?.List ?? DefaultList;
  const ListItem = components?.ListItem ?? DefaultListItem;

  return (
    <div ref={anchorRef} className={className} data-testid="react-loqate">
      <Input
        className={clsx(inputClassname)}
        onChange={handleChange}
        value={value}
        data-testid="react-loqate-input"
      />

      <Portal container={document.body} disablePortal={inline}>
        <ClickAwayListener onClickAway={() => setSuggestions([])}>
          <List
            hidden={!suggestions.length}
            className={clsx(classes.listPosition, listClassname)}
            data-testid="react-loqate-list"
          >
            {suggestions.map((suggestion, i) => (
              <ListItem
                key={suggestion.Id + i}
                onClick={() => selectSuggestion(suggestion)}
                className={listItemClassname}
                data-testid={`react-loqate-list-item-${suggestion.Id}`}
                value={value}
                suggestion={suggestion}
              >
                {suggestion.Text} {suggestion.Description}
              </ListItem>
            ))}
          </List>
        </ClickAwayListener>
      </Portal>
    </div>
  );
}

export default AddressSearch;
