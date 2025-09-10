import clsx from 'clsx';
import React, {
  type ChangeEvent,
  type ComponentType,
  useMemo,
  useState,
} from 'react';
import DefaultInput from './components/DefaultInput';
import DefaultList from './components/DefaultList';
import DefaultListItem from './components/DefaultListItem';
import ClickAwayListener from './utils/ClickAwayListener';
import Loqate from './utils/Loqate';
import Portal from './utils/Portal';
import useDebounceEffect from './utils/useDebounceEffect';
import usePreserveFocus from './utils/usePreserveFocus';

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
  apiUrl?: string;
  bias?: boolean;
  origin?: string;
  disableBrowserAutocomplete?: boolean;
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

export interface LoqateErrorItem {
  Error: string;
  Description: string;
  Cause: string;
  Resolution: string;
}

function AddressSearch(props: Props): JSX.Element {
  const {
    locale,
    countries,
    onSelect,
    limit,
    apiKey,
    classes,
    components,
    inline,
    debounce,
    apiUrl,
    bias,
    origin,
    disableBrowserAutocomplete = true,
  } = props;
  const loqate = useMemo(() => Loqate.create(apiKey, apiUrl), [apiKey]);

  const [suggestions, setSuggestions] = useState<Item[]>([]);
  const [value, setValue] = useState('');
  const [, setError] = useState(null);

  const { elementRef: anchorRef, preserveFocus } =
    usePreserveFocus<HTMLInputElement>();

  const rect = anchorRef.current?.getBoundingClientRect();

  async function find(text: string, containerId?: string): Promise<Item[]> {
    let Items: Item[] = [];
    try {
      const res = await loqate.find({
        countries,
        limit,
        text,
        containerId,
        language: loqateLanguage(locale),
        origin,
        bias,
      });

      if (res.Items) {
        Items = res.Items;
      }
    } catch (e) {
      // error needs to be thrown in the render in order to be caught by the ErrorBoundary
      setError(() => {
        throw e;
      });
    }

    return Items;
  }

  async function selectSuggestion({ Type, Id }: Item): Promise<void> {
    if (Type === 'Address') {
      let Items: Item[] = [];
      try {
        const res = await loqate.retrieve(Id);
        if (res.Items) {
          Items = res.Items;
        }
      } catch (e) {
        setSuggestions([]);
        // error needs to be thrown in the render in order to be caught by the ErrorBoundary
        setError(() => {
          throw e;
        });
      }

      onSelect(Items[0] as unknown as Address);
      setSuggestions([]);
      return;
    }

    const items = await find(value, Id);
    setSuggestions(items);
  }

  async function handleChange({
    target,
  }: ChangeEvent<HTMLInputElement>): Promise<void> {
    const { value: search } = target;

    // Custom Input components with external state management can cause DOM reconciliation issues that lose focus
    preserveFocus();
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
    <>
      <Input
        ref={anchorRef}
        className={clsx(classes?.input)}
        onChange={handleChange}
        value={value}
        // disabling autocomplete in order to avoid conflict with loqate suggestions
        autoComplete={
          disableBrowserAutocomplete ? 'react-loqate-address-search' : undefined
        }
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setSuggestions([]);
          }
        }}
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
          >
            {suggestions.map((suggestion, i) => (
              <ListItem
                key={suggestion.Id + i}
                onClick={() => selectSuggestion(suggestion)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    selectSuggestion(suggestion);
                  }
                  if (e.key === 'Escape') {
                    setSuggestions([]);
                  }
                }}
                className={classes?.listItem}
                value={value}
                suggestion={suggestion}
                tabIndex={i === 0 ? 0 : -1}
              >
                {suggestion.Text} {suggestion.Description}
              </ListItem>
            ))}
          </List>
        </ClickAwayListener>
      </Portal>
    </>
  );
}

export default AddressSearch;
