import { ComponentType } from 'react';
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
    debounce?: number;
}
interface Components {
    Input?: ComponentType;
    List?: ComponentType;
    ListItem?: ComponentType<{
        suggestion: Item;
    }>;
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
export interface Item {
    Id: string;
    Description: string;
    Type: 'Address' | 'Postcode' | 'Residential' | 'Street';
    Text: string;
    Highlight: string;
}
declare function AddressSearch(props: Props): JSX.Element;
export default AddressSearch;
