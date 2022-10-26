import { ClickAwayListener, Portal } from '@mui/base';
import clsx from 'clsx';
import React, {
  ChangeEvent,
  ComponentType,
  useMemo,
  useRef,
  useState,
} from 'react';
import DefaultInput from './components/DefaultInput';
import DefaultList from './components/DefaultList';
import DefaultListItem from './components/DefaultListItem';
import Loqate from './utils/Loqate';
import useDebounceEffect from './utils/useDebounceEffect';

export interface Props {
  locale: string;
  apiKey: string;
  countries?: string[];
  limit?: number;
  onSelect: (address: Address) => void;
  components?: Components;
  className?: string;
  classes?: {
    input?: string;
    list?: string;
    listItem?: string;
  };
  inline?: boolean;
  debounce?: number;
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
  const [languageCode] = language.replace('_', '-').split('-');
  return languageCode;
};

export interface Item {
  Id: string;
  Description: string;
  Type: 'Address' | 'Postcode' | 'Residential' | 'Street';
  Text: string;
  Highlight: string;
}

function AddressSearch(props: Props) {
  const {
    locale,
    countries,
    onSelect,
    limit,
    apiKey,
    className,
    classes,
    components,
    inline,
    debounce,
  } = props;
  const loqate = useMemo(() => Loqate.create(apiKey), [apiKey]);

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [value, setValue] = useState('');

  const anchorRef = useRef<HTMLDivElement>(null);
  const rect = anchorRef.current?.getBoundingClientRect();

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

  async function find(text: string, containerId?: string) {
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

    return [];
  }

  async function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    const { value: search } = target;

    setValue(search);
  }

  useDebounceEffect(
    () => {
      if (value === '') {
        setSuggestions([]);
        return;
      }

      find(value).then(setSuggestions);
    },
    debounce,
    [value]
  );

  const Input = components?.Input ?? DefaultInput;
  const List = components?.List ?? DefaultList;
  const ListItem = components?.ListItem ?? DefaultListItem;

  return (
    <div ref={anchorRef} className={className} data-testid="react-loqate">
      <Input
        className={clsx(classes?.input)}
        onChange={handleChange}
        value={value}
        data-testid="react-loqate-input"
      />

      <Portal container={document.body} disablePortal={inline}>
        <ClickAwayListener onClickAway={() => setSuggestions([])}>
          <List
            style={{
              position: 'absolute',
              top: rect ? (rect.y ?? 0) + rect.height + window.scrollY : 0,
              left: rect?.left ?? 0,
              width: rect?.width ?? undefined,
            }}
            hidden={!suggestions.length}
            className={classes?.list}
            data-testid="react-loqate-list"
          >
            {suggestions.map((suggestion, i) => (
              <ListItem
                key={suggestion.Id + i}
                onClick={() => selectSuggestion(suggestion)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    selectSuggestion(suggestion);
                  }
                }}
                className={classes?.listItem}
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
